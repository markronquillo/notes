## Mapping and Indexing Data

#### Movielens dataset

grouplens.com

#### Create a mapping for MovieLens

What is a mapping?
-- a mapping is a schema definition
elasticsearch has reasonable defaults, but sometimes you need to customize thems.

```sh
curl -XPUT localhost:9200/movies -d'
{
	"mappings": {
		"movie": {
			"_all": {"enabled": false},
			"properties": {
				"year": {"type": "date"}
			}
		}
	}
}'
```

__all: {"enabled": false} -- means not to enable the _all field, in ES, when we index data, it automatically creates a new __all field that combines all the data. This is useful if you are searching across all fields but if it comes with a storage cost. So it is best to just use it when you are going to need it.



##### common mappings

1. field types: string, byte, short, integer, long, float, double, boolean, date.

```json
"properties": {
	"user_id": {
		"type": "long"
	}
}
```

2. field index: do you want this field indexed for FTS? analyzed / not_analyzed / no

```
"properties": {
	"genre": {
		"index": "not_analyzed"
	}
}
```

3. field analyzer: define your tokenizer and token filter. standard / whitespace / simple / english etc.

```
"properties": {
	"description": {
		"analyzer": "english"
	}
}
```

 ##### More about analyzers

 *character filters* - remove HTML encoding, convert & to a nd

 *tokenizer* - split strings on whitespace / punctuations / non-letters

 *token-filter* - lowercasing, stemming, synonyms, stopwords

 ##### Choice for analyzers

 *standard* - splits on word boundaries, removes punctuation, lowercases. good choices if language is unknown

 *simple* - splits on anything that isn't a letter, and lowercases

 *whitespace* - splits on whitespace but doesn't lowercase

 *language* (i.e. english) - accounts for language-specific stopwords and stemming.


 ##### Create a mapping

 ```sh
curl -XPUT -H 'Content-Type: application/json' localhost:9200/movies -d'
{
	"mappings": {
		"movie": {
			"_all": {"enabled": false},
			"properties": {
				"year": {
					"type": "date"
				}
			}
		}
	}
}'
```

##### Get the current mapping

```sh
curl -XGET localhost:9200/movies/_mapping/movie?pretty
```


## Import a Single Movie via JSON

```sh
curl -XPUT -H 'Content-Type: application/json' localhost:9200/movies/movie/109487 -d'{
	"genre": ["IMAX", "Sci-Fi"],
	"title": "Interstellar",
	"year": 2014
}'
```

`curl -XGET localhost:9200/movies/movie/_search?pretty`

## Import many documents

```curl -XPUT localhost:9200/_bulk -d'
{ "create" : { "_index" : "movies", "_type" : "movie", "_id" : "135569" } }
{ "id": "135569", "title" : "Star Trek Beyond", "year":2016 , "genre":["Action", "Adventure", "Sci-Fi"] }
{ "create" : { "_index" : "movies", "_type" : "movie", "_id" : "122886" } }
{ "id": "122886", "title" : "Star Wars: Episode VII - The Force Awakens", "year":2015 , "genre":["Action", "Adventure", "Fantasy", "Sci-Fi", "IMAX"] }
{ "create" : { "_index" : "movies", "_type" : "movie", "_id" : "109487" } }
{ "id": "109487", "title" : "Interstellar", "year":2014 , "genre":["Sci-Fi", "IMAX"] }
{ "create" : { "_index" : "movies", "_type" : "movie", "_id" : "58559" } }
{ "id": "58559", "title" : "Dark Knight, The", "year":2008 , "genre":["Action", "Crime", "Drama", "IMAX"] }
{ "create" : { "_index" : "movies", "_type" : "movie", "_id" : "1924" } }
{ "id": "1924", "title" : "Plan 9 from Outer Space", "year":1959 , "genre":["Horror", "Sci-Fi"] }
'
```

`curl -XPUT localhost:9200/_bulk?pretty --data-binary @movies.json`

## Updating documents

Every document has a _version field
Elasticsearch documents are immutable
When you update an existing documents:
	a new document is created with an incremented _version
	the old document is marked for deletion

```
curl -XPOST localhost:9200/movies/movie/109487/_update -d'{
	"doc": {
		"title": "Interstellar"
	}
}'
```

We can also use PUT to update it directly.

```
curl -XPUT -H 'Content-Type: application/json' localhost:9200/movies/movie/109487?pretty -d'
{
	"genres": ["IMAX", "Sci-Fi"],
	"title": "Interstellar",
	"year": 2014
}'
```

## Deleting a document

`curl -XDELETE localhost:9200/movies/movie/58559`


## Exercise 

: insert, update and tehn delete a movie of your choice into the movies index

```
curl -XPOST -H 'Content-Type: application/json' localhost:9200/movies/movie/100000?pretty -d'
{
	"genre": ["Action", "Comedy"],
	"title": "Mark jo",
	"year": 2020,
	"sample": "none"
}'
```

## Dealing with concurrency

The problem is that if we are trying to update a page view count, for example, and there are high possibility that multiple requests try to increment that value, race condition may happen.

Solution: optimistic concurrency control. specify the version of the document when you update. if the current version is different, ES will throw an error

Use retry_on_conflicts=N to automatically retry, this will update the version until the there is no conflict with the update.

`curl -XPOST localhost:9200/movies/movie/109487/_update?retry_on_conflict=5 -d'{...}'`


## Controlling Full-Text Search

sometimes text fields should be exact-match
	- use no_analyzer mapping

search on analyzed fields will return anything remotely relevant
	- depending on the analyzer, results will be case-insensitive, stemmed, stopwords removed, synonyms applied etc
	- searches with multiple terms need not match them all.

An issue with too many shards and not much documents. 

If you want to have an exact match on a field, you need to disable analyzers for that fields. 

## Data modeling

Create a mapping for our series index.

```
curl -XPUT -H 'Content-Type: application/json' localhost:9200/series?pretty -d'
{
	"mappings": {
		"franchise": {},
		"film": {
			"_parent": {
				"type": "franchise"
			}
		}
	}
}'
```

Bulk upload

`curl -XPUT -H 'Content-Type: application/json' localhost:9200/_bulk?pretty --data-binary @series.json`

https://www.elastic.co/blog/index-type-parent-child-join-now-future-in-elasticsearch

https://www.elastic.co/blog/index-vs-type

https://www.elastic.co/guide/en/elasticsearch/reference/6.0/parent-join.html















