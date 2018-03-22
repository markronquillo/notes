### Elasticsearch in an hour

Search engines are goot at:

- finding documents that contain specific terms and phrases.
- scoring and sorting documents according to relevants
- filtering/grouping docs and aggregating data.

```python
from elasticsearch import Elasticsearch
client = Elasticsearch('localhost')

mappings = {
	'mappings': {
		'event': {
			'properties': {
				'id': {'type': 'string', 'index': 'not_analyzed'},

				# lowercases
				# splits on white space and punctuation
				# stems: e.g. farm farming farmed => farm
				'name': {'type': 'string', 'analyzer': 'english'},

				'description': {'type': 'string', 'analyzer': 'english'},
				'city': {'type': 'string', 'index': 'not_analyzed'},
				'start_data': {'type': 'date'},
				'price': {'type': 'float'}
			}
		}
	}
}
client.indices.create(index='eventbrite', body=mappings)
```

##### Index (insert) events

```python
from datetime import datetime
docs = [
	{
		'id': '0',
		'name': 'Filbert Sorting for Fun and Profit',
		'description': 'Did you know Nutella is made from Filberts?',
		'city': 'Nashville',
		'start_date': datetime(2016, 2, 15),
		'price': 15.99
	}
]
for doc in docs:
	client.create(index='eventbrite', doc_type='event', body=doc)
```

##### Query Events: `match_all`

```python
query = {
	'query': {
		'match_all': {}
	}
}
client.search(index='eventbrite', body=query)
```


##### Query Events: `term`

```python
"""data
{  # indexed document
    u'city': u'Nashville',
    u'description': u'Did you know Nutella is made from Filberts? ...',
    u'id': u'0',
    u'name': u'Filbert Sorting for Fun and Profit',
    u'price': 15.99,
    u'start_date': u'2016-02-15T00:00:00'},
    u'_type': u'event'
}
"""
query = {
	'query': {
		'term': {
			'city': 'Nashville'
		}
	}
}
client.search(index='eventbrite', body=query)
```

##### Query Events: match

```python
"""
{...  # indexed document
    u'name': u'Filbert Sorting for Fun and Profit',
...}
"""

{'query': {
    'match': {
        'name': 'sort filbert'
    }
}}
```

##### Query Events: match_phrase

```python
"""
{...  # indexed document
    u'name': u'Filbert Sorting for Fun and Profit',
...}
"""

# will not match
{'query': {
    'match_phrase': {
        'name': 'sorting filbert'
    }}}

# will match
{'query': {
    'match_phrase': {
        'name': 'filberts sort'  # note spelling changes
    }}}

# will not match
{'query': {
    'match_phrase': {
        'name': 'filbert fun'
    }}}

# will match
{'query': {
    'match_phrase': {
        'name': 'filbert fun', 'slop': 2  # loose phrase
    }}}
```

##### Query Events: Complex queries with `bool`

```python
{
	'query' : {
		'bool" {
			'must': [{
				'term': {
					'city': 'Nashville'
				}
			}],
			'should': [{
				'match_phrase': {
					'name': {
						'query': 'filbert fun',
						'slop': 2,
						'boost': 2 # you control how important each clause
					}
				} # ... other clauses
			}]
		}
	}
}
```

- Artibrary nesting
- Complex score control - RELEVANCE

##### Scoring

Each documenet is scored based on TF*IDF

- Term Frequency: the number of occurrence of the word in the document
- Inverse Document Frequency: 1 / the number of document the word is present

score = TF(the) * IDF(the) + TF(diddle) * IDF(diddle)


### Search Engine Internals

Two things:
- Getting data in
- Getting data out

##### Getting Data In: Analysis

*The conspirators conspire conspicously!*

- Tokenization [The][conspirators][conspire][conspicuously]
- Lowercasing [the][conspirators][conspire][conspicuosly]
- stop wording __[conspirators][conspire][conspicuosly]
- stemming __[conspir][conspir][conspicu]


##### Getting Data In: Indexing

Doc #1 -> __[conspir][conspir][conspicu]

'conspir' : [1, 47, 72]
'conspicu': [1, 55, 92, 107]


##### Getting Data Out: Boolean Query

```python
inverted_index = {
	'aardvark': [34, 92, 119],
	'conspir' : [1, 47, 72],
	'conspicu': [1, 55, 92, 107],
	'malific' : [34, 72, 103],
	'zebra'   : [15, 34, 55, 107],
}
```

conspicuous AND aardvarks -> [92]
conspicuos OR aardvarks -> [1, 34, 55, 92, 107, 119]


##### Getting Data out: sorting by relevance

conspicuous OR aardvarks -> [1, 34, 55, 92, 107, 119]

- Initialize Priority Queue
- For each matching doc
	- calculate TF*IDF score
	- add to Priority Queue
	- pop off lowest scoring doc
- Returns contents of Priority


##### Getting Data out: aggregation

conspicuous OR aardvarks -> [1, 34, 55, 92, 107, 119]

- Initialize Aggregator (sum, average, count )
- for each matching doc
	- retrieve interesting information
	- add to aggregator
- return results from aggregator

Filter | Group | Aggregate

```python
"""will output
{
  ...

  "aggregations": {
    "by_city": {
      "buckets": [
        {"key": "Nashville", "doc_count": 2311},
        {"key": "Dallas", "doc_count": 3743},
        {"key": "BFE", "doc_count": 7},
      ], 
      "doc_count_error_upper_bound": 0, 
      "sum_other_doc_count": 0
    }, 
    "by_price": {
      "buckets": [
        {"key": 10, "doc_count": 4263},
        {"key": 20, "doc_count": 1293},
        {"key": 30, "doc_count": 43},
      ]
    }
  }

  ...
}
"""
query = {
    'query': {
        'match_all': {}
    },
    'aggs': {
        'by_city': {
            'terms': {
                'field': 'city'
            }
        },
        'by_price': {
            'histogram': {
                'field': 'price',
                'interval': 10,
            }
        }
    }
}

client.search(
    index='eventbrite',
    body=query,
)
```

```python
"""nested: will output
"aggregations": {
  "by_city": {
    "buckets": [
      { "by_price": {
          "buckets": [
            {"key": 10, "doc_count": 232}
            {"key": 20, "doc_count": 1414}
            {"key": 30, "doc_count": 332}
          ]
        }, 
        "key": "Nashville", 
        "doc_count": 2143},
      { "by_price": {
          "buckets": [
            {"key": 10, "doc_count": 512}
            {"key": 10, "doc_count": 743}
            {"key": 10, "doc_count": 2023}
          ]
        }, 
        "key": "Dallas", 
        "doc_count": 4315}
    ], 
    "doc_count_error_upper_bound": 0, 
    "sum_other_doc_count": 0}}
"""

query = {
    'query': {
        'match_all': {}
    },
    'aggs': {
        'by_city': {
            'terms': {
                'field': 'city'
            },
            'aggs': {
                'by_price': {
                    'histogram': {
                        'field': 'price',
                        'interval': 10,
                    }
                }       
            }
        }
    }
}

client.search(
    index='eventbrite',
    body=query,
)
```

### Summary: 
- more than words, you can index and search fingerprints, whistled songs, locations, genomes and images.

- content based recommendations are easy to build

- elasticsearch is mostly write only and that makes it faster and more scalable

- KNN classification is trivially easy

- ocassinally search engines are also bad at stuff


