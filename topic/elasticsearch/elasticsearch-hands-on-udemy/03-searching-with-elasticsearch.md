## Searching with Elasticsearch

### Using Query-String Search

/movies/movie/_search?q=title:star

/movies/movie/_search?q=+year:>2010+title:trek

Note: you need to url encode this.

Although this is quick for experimenting, these are the problems that you may encounter if you'll use query lite.

- cryptic and tough to debug
- can be security issue if exposed to end users
- fragile - one wrong character and you're hosed.


### Using JSON Search

```bash
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"match": {
			"title": "star"
		}
	}
}'
```

##### queries and filter

filters asks a yes/no question of your data
queries return data in terms of relevance

use filters when you can - they are faster and cacheable.

```
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"bool": {
			"must": {"term", {"title": "trek"}},
			"filter": {"range": {"year": {"gte": 2010}}}
		}
	}
}'
```

##### Some types of filters

*term*: filter by exact values `{"term": {"year": 2014}}`

*terms*: match if any exact values in a list 
`{"terms": {"genre": ["Sci-Fi", "Adventure"]}}`

*range*: Find numbers or date in a given range (gt, gte, lt, lte)
`{"range": {"year": {"gte": 2010}}}`

*exists*: Find documents where a field exists
`{"exists": {"field": "tags"}}`

*missing*: Find document where a field is missing
`{"missing": {"field": "tags"}}`

*bool*: Combine filters with Boolean logic (must, must_not, should)
must=AND, should=OR

##### Some types of queries

*match_all*: returns all documents and is the default. Normally used with a filter. `{"match_all", {}}`

*match*: searches analyzed results, such as full text search.
`{"match": {"title": "star"}}`

*multi_match*: run the same query on multiple fields.
`{"multi_match": {"query": "star", "fields": ["title", "synopsis"]}}

*bool*: Works like a bool filter, but results are scored by relevance.
 
##### Syntax reminder

queries are wrapped in a "query": {} block,
filters are wrapped in a "filter": {} block.

you can combine filters inside queries, or queries inside filter too.

```
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"bool": {
			"must": {"term": {"title": "trek"}},
			"filter": {"range": {"year": {"gte": 2010}}}
		}
	}
}'
```
{
	"query": {
		"match": {
			"title": "star"
		}
	}
}
```





