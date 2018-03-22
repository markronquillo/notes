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
 
```
{
	"query": {
		"match": {
			"title": "star"
		}
	}
}
```


## Phrase search

*Phrase matching* - must find all terms in the right order.

```
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"match_phrase": {
			"title": "star wars"
		}
	}
}'
```

The previous curl will search the exact `star wars` term in the field title.
It will match `The star wars`, `Star wars 1` but not `Star not wars`

If we want to allow words in between, we can use `slop`.

*slop* - order matters, but you're OK with some words being in between the terms.

```
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"match_phrase": {
			"title": { "query": "star beyond", "slop": 1}
		}
	}
}'
```

The slop represents how far you're willing to let a term move to satisfy a phrase (in either direction)

another example: 'quick brown fox' would match 'quick fox' with a slop of 1.

*proximity queries*
 
Remember this is a query - results are sorted by relevance.

Just use a really high slop if you want to get any documents that contains the words in your phrase, but want documents that have the words closer together scored higher.

```
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"match_phrase": {
			"title": { "query": "star beyond", "slop": 100}
		}
	}
}'
```

## Exercise

`http://localhost:9200/movies/movie/_search?q=+year:%3E1980+title=trek`

```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"bool": {
			"must": {"match_phrase": {"title": "star wars"}},
			"filter": {"range": {"year": {"gte": 1980}}}
		}
	}
}'
```

## Pagination

To do pagination, specify `from` and `size.

Approach: if we have 10 items per page, to get the from and size value.

formula:
	size=10
	from=(page-1)*10

```
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"from": 2,
	"size": 2,
	"query": {"match": {"genre": "Sci-Fi"}}
}'
```

Caveat:

- deep pagination can kill performance
- every result must be retrieved, collected and sorted.
- enforce an upper bound on how many results you'll return to users.


## Sorting 

Sorting your results is usually quite simple.

`curl -XGET localhost:9200/movies/movie/_search?sort=year&pretty`

Unless you're dealing with strings.

A string field that is analyzed for full-text search can't be used to sort documents.

This is because it exists in the inverted index as individual terms, not as the entire thing.

If you need to sort on an analyzed field, map a `not_analyzed` copy.
```
{
	"mappings": {
		"movie": {
			"_all": {"enabled": false},
			"properties": {
				"title": {
					"type": "string",
					"fields": {
						"raw": {
							"type": "string",
							"index": "not_analyzed"
						}
					}
				}
			}
		}
	}
}
```

Now you can sort on the `not_analyzed` raw field.

`curl -XGET localhost:9200/movies/movie/_search?sort=title.raw&pretty' 

sadly, you cannot change the mapping on an existing index.

you'd have to delete it, set up a new mapping and re-index it.

like the number of shards, this is something you should think about before importing data into your index.

Delete and create new mapping
 ```sh
curl -XPUT -H 'Content-Type: application/json' localhost:9200/movies?pretty -d'
{
	"mappings": {
		"movie": {
			"_all": {"enabled": false},
			"properties": {
				"year": {
					"type": "date"
				},
				"title": {
					"type": "text",
					"fields": {
						"raw": {
							"type": "keyword"
						}
					}
				}
			}
		}
	}
}'
```

Now you can sort using title.raw

`curl -XGET localhost:9200/movies/movie/_search?sort=title.raw`

## Using Filters

Another filtered query

```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/_search?pretty -d'
{
	"query": {
		"bool": {
			"must": {"match": {"genre": "Sci-Fi"}},
			"must_not": {"match": {"title": "trek"}},
			"filter": {"range": {"year": {"gte": 2010, "lt": 2015}}}
		}
	}
}'
```

## Exercise

Search for science fictions movies before 1960, sorted by title

```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/_search?sort=title.raw&pretty -d'
{
	"query": {
		"bool": {
			"must": {"match": {"genre": "Sci-Fi"}},
			"filter": {"range": {"year": {"lt": 1960} }}
		}
	},
	"sort": {
		"title.raw": "asc"
	}
}'
```

## Fuzzy matches

a way to account for typos and misspellings

the levenshtein edit distance accoutns for
- substitutions of characters (interstellar -> intersteller)
- insertions of characters (interstellar -> insterstellar)
- deletion of characters (interstellar -> interstelar)

all of the above has edit distance of 1


```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
			"fuzzy": {
				"title": {"value": "intersteller", "fuzziness": 1}
			}
	}
}'
```


## Partial Matching

Prefix queries on strings

If we remapped year to be a string

```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/movie/?_search?pretty -d'
{
	"query": {
		"prefix": {
			"year": "201"
		}
	}
}'
```

*Wildcard queries*
```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/movie/?_search?pretty -d'
{
	"query": {
		"wildcard": {
			"year": "10*"
		}
	}
}'
```

## Search as you type - NGrams

Query-time search-as-you-type

```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"match_phrase_prefix": {
			"title": {
				"query": "star trek",
				"slop": 10
			}
		}
	}
}'
```

*index-time* with N-grams

example: star
unigram = [s, t, a, r]
bigram = [st, ta, ar]
trigram = [sta, tar]
4-gram = [star]

edge n-grams are built only on the beginning of each term.


1. Create an `autocomplete` analyzer.

```
curl -XPUT -H 'Content-Type: application/json' localhost:9200/movies?pretty -d'
{
	"settings": {
		"analysis": {
			"filter": {
				"autocomplete_filter": {
					"type": "edge_ngram",
					"min_gram": 1,
					"max_gram": 20
				}
			},
			"analyzer": {
				"autocomplete": {
					"type": "custom",
					"tokenizer": "standard",
					"filter": [
						"lowercase",
						"autocomplete_filter"
					]
				}
			}
		}
	}
}'
```

2. Now map your field with it

```
curl -XPUT -H 'Content-Type: application/json' localhost:9200/movies/_mapping/movie?pretty -d'
{
	"movie": {
		"properties": {
			"title": {
				"type": "text",
				"analyzer": "autocomplete"
			}
		}
	}
}'
```

But, only use n-grams on the index side!

```
curl -XGET localhost:9200/movies/movie/_search?pretty -d'
{
	"query": {
		"match": {
			"title": {
				"query": "sta",
				"analyzer": "standard"
			}
		}
	}
}'
```

`curl -XGET localhost:9200/movies/_analyze?pretty&analyzer=autocomplete -d 'Sta'`

othwerwise our query will also get split into n-grams, and we'll get results for everything that matches s t a st etc.

##### Completion suggesters

You can also upload a list of possible completions ahead of time using completion suggesters.


```
curl -XGET -H 'Content-Type: application/json' localhost:9200/movies/movie/_search?pretty -d '
{
	"query": {
		"match": {
			"title": {"query": "sta", "analyzer": "standard"}
		}
	}
}'
```






