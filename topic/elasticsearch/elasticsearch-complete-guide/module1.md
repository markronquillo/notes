# Module 1

### Chapter 1: Getting started with elasticserach

- Concepts and terminologies related to Elasticsearch
- Rest API and the JSON data structure
- Installing and configuring Elasticsearch
- Installing the Elasticsearch plugins
- Basic oprations with Elasticsearch

##### Elasticsearch common terms

- Node: A single instacne of Elasticserach running on a machine
- Cluster: a cluster is a single name under which one or more nodes/instances of Elasticsearch are connected to each other.
- Document; A document is a JSON object that contains the actual data in the key value pairs.
- Index: A logical namespace under which Elasticsearch stores data in key value pairs.
- Doc types: A doctype in ES represents a class of similar documents: A type consists of a name, such as a user or a blog post, and a mapping, including data types and the Lucene configurations for each field 
- Shard: Shards are containers that can be stored on a single node or multiple nodes and are composed of Lucene segments. An index is divided into one or more shards to make the data distributable.


Relational DB 			-			Elasticsearch
Databases				- 			Indices
Tables					-			Types
Rows					-			Documents
Columns					- 			Fields

##### Basic operations with Elasticserach

Creating an Index

`curl -XPUT 'localhost:9200/books/'`

**Uppercase letters and blank spaces are not allowed in index names**

**PUT**

`curl --user elastic:password -H 'Content-Type: application/json' -XPUT 'localhost:9200/books/elasticsearch/1' -d'{
"name": "Elasticsearhc Essentials",
"author": "Bharvi Dixit",
"tags": ["Data Analytics", "Text Search", "Elasticsearch"],
"content": "Added with PUT request"
}'`

We have to include the id by `/:id` which is `/1` in this case since we are using PUT, if we want to generate an ID we should use POST

**POST**

`curl --user elastic:password -H 'Content-Type: application/json' -XPOST 'localhost:9200/books/elasticsearch/' -d'{
"name": "Elasticsearhc Essentials",
"author": "Bharvi Dixit",
"tags": ["Data Analytics", "Text Search", "Elasticsearch"],
"content": "Added with POST request"
}'`


**Cluster states in Elasticsearch**

An ES cluster can be in one of hte 3 states, GREEN, YELLOW, RED. If all the shards, meaning primary as well as replicas, are assigned in the cluster, it will be in the GREEN state. If any one of the replica shards is not assigned becase of any problem, then the cluster will be in the YELLOW state. If any one of the primary shards is not assigned on a node, then the cluster will be in the RED state. 


**Fetching Documents**
`curl --user elastic:password http://localhost:9200/books/elasticsearch/1\?pretty`

**Getting a part of a document**

`curl --user elastic:password http://localhost:9200/books/elasticsearch/1\?_source=name,author&pretty`

**Updating documents**

We can update a document partially of completely.

*Complete update*

`curl --user elastic:password -H 'Content-Type: application/json' -XPUT 'localhost:9200/books/elasticsearch/1' -d'{
"name": "Elasticsearch Essentials",
"author": "Bharvi Dixit",
"tags": ["Data Analytics", "Text Search", "Elasticsearch"],
"content": "Updated document",
"publisher": "packt-pub"
}'`

*Partial update*

`curl --user elastic:password -H 'Content-Type: application/json' -XPOST 'localhost:9200/books/elasticsearch/1/_update' -d'{
	"script": "ctx._source.updated_time=\"2015-09-09T00:00:00\""
}'`


Elasticsearch stores data in indexes taht are composed of Lucene segments. These segments are immutable in nature, meaning that, once created, they can't be changes. So the update that we did (partial update), actually deletes the old object and creates a new object.

- Fetches the JSON data from _source field for that document
- Makes changes in the _source field
- Deletes old documents
- Creates a new document

The benefit in partial update is that all operations done within a single shard, which avoids network overhead.

**Deleting documents**

`curl --user elastic:password -XDELETE http://localhost:9200/books/elasticsearch/1`


Segment merging. Whenever we delete a document from ES, it does not get deleted form the file system right away. Rather, ES just marks that document as deleted, and when you index more data, segment merge is done. At the same time, the documents that are marked as deleted are indeed deleted based on merge policy, This process is also applied while the document is updated.

The space from deleted documents can be reclaimed with `_optimize` API by executing the command: `curl -XPOST http://localhost:9200/_optimize?only_expunge_deltes=true`

**Checking documents' existence**

We can use HEAD http request method to check the existence of a document.

`curl -i XHEAD 'localhost:9200/books/elasticsearch/1'`


### Chapter 2: Understanding Document Analysis and Creating Mappings

- Full text search and inverted indices
- Document analysis
- Introducing Lucene analyzers
- Creating custom analyzers
- Elasticsearch mappings

Searching is broadly divided into two types:

- exact term search: we look for exact terms, for example, any named entity suce as name of a person, location or date.

- full text search: refers to the search within text fields, where teh text can be unstructured as well as structured. The text data can be in the form of any human language and based on the natural languages, which are very hard for a machine to understand and give relevant results. 
	
Some exampls of full text searches:

- Find all documents with searchi n the title or content fields, and return the results with matches in titles with the higher score.

- Find all the tweets in which people are talking about terrorism and killing and return the results sorted by the tweet creation time.

While doing these kinds of seraches, we not only want relevant results but also expect that the search for a keyword matches all of its synonyms, root words and spelling mistakes.

##### TF_IDF

Term frequencies-inverse document frequencies - TF-IDF - is the statistical measure to evaluate how important a word is to a document in a collection of documents.

TF (term): (The number of times a term appears in a document) / The total number of terms in the document

IDF (term): log_e (The total number of documents / The number of documents with the t term in it)

The weight of TF-IDF is a product of TF * IDF 

##### Inverted indexes

Inverted index is the heart of search engines. The primary goal of a search engine is to provide speedy searches while finding the documents in which our search terms occur. Relevancy comes second.

*Term X Document:Position*

The texts are tokenized into separate teerms and all the unique terms are stored inside the index with information such as in which document this term appears and what is the term position in that document.

##### Document analysis

Analysis Phase

```			 ________________________________________
Document -> | Char filters, Tokenizer, Token Filters | -> Document Writer -> Inverted Index
```

The analysis phase is performed by analyzers that are composed of one or more char filters, a single tokenizer and one or more token filters.

You can declare separate analyzers for each field in your document depending on the need.

- Character Filters: The job of character filters is to do cleanup tasks such as stripping out HTML tags.

- Tokenizers: The next step is to split the text into terms that are called tokens.

- Token filters: Once the tokens are created, they are passed to token filters that normalize the tokens. Token filters can change the tokens, remove the terms or add terms to new tokens. The most used token filters are: `lowercase` token filter, which converts a token into lowercase: the `stop` token filter which removes the stop word tokens such as to, be, a, an, the and so on: and the `ASCII folding` token filter, which converts Unicode characters to their ASCII equivalent.

##### Lucene analyzers

- Standard analyzer: The default analyzer used by Elasticsearch. composed of standard tokenizer, standard token filter and a lowercase and stop token filter

- Simple ahalyzer: splites token wherever it finds a non-letter character and lowercases all the terms using the lowercase token filter

- whitespace analyzer: splits the text at whitespaces, does not lowercase tokens

- keyword analyzer: create a single token of the entire stream. does not lowercase, This analyzer is good for fields such as zip codes and phone numbers, it is mainly used for either exact term matching or while doing aggregations.

- Language analyzer; 


To test analyzers, we can use the `_analyze` REST endpoint.

First create a test index, `curl --user elastic:password -XPUT 'localhost:9200/test'`

Then, to analyze it `curl --user elastic:password http://localhost:9200/test/_analyze?analyzer=white-space&text=testing, Analyzer&pretty`

v6.0
`curl --user elastic:password -H 'Content-Type: application/json' -XPOST 'localhost:9200/test/_analyze?pretty' -d'{
	"analyzer": "whitespace",
	"text": "testing, Analyzer"
}'`


##### Custom analyzers

```
{
	"analysis": {
		"analyzer": {}, // where we put our custom analyzers
		"filters": {} // where we put our custom filters
	}
}
```

```
"keyword_tokenizer": {
	"type": "custom",
		"filter"": [
			"lowercase",
			"asciifolder"
		],
		"tokenizer": "keyword"
}
```

```
"url_analyzer": {
	"type": "custom",
	"filter": [
		"lowercase",
		"stop"
	],
	"tokenizer": "uax_url_email"
}
```

##### Elasticsearch mapping

Mappings are like **database schemas** that describe the fields or properties that the documents of that type may have. 

Note, you cannot have a field with the same name with different types in the same index; otherwise you'll break `doc_values` and the sorting/searching.

###### Document metadata fields

When a document is indexed in to ES, there are several metadata fields maintaind by ES for taht document.

- _id: _id is a unique identifier fo the document and can be either auto-generated or can be set while indexing or can be configured in the mapping to be parsed automatically from a field.

- _source: This is a special field generated by ES taht contains the actual JSON data in it. Whenever we execute a search, reques,t the _source field is returned by default.

- _all: when a document is indexed, values form all the fields are indexed separtely as well as in a special field called _all. This is done by ES by default to make a search request on the content of the document without specifying the field name. It comes with an extra storage cost and should be disabled if searches need to be made against field names.

- _ttl: There are some cases when you want the documents to be automatically delted from the index. time to live. will be deprecated.

- dynamic: there are some scenarios in which you want to restrict the dynamic fields to be indexed. You only allow the fields that are defined by you in the mapping.

##### Data types and index analysis options

Configuring data types: datatypes in ES are segregated in two forms:

- Core types: string, number, date, boolean, binary
- Complex data types: arrays, objects, multi fields, geo points, geo shapes, nexted, attachment and IP


##### Putting mappings in an index

There are two ways of putting mappings inside an index:

1. Using a post request at the time of index creation:

`curl --user elastic:password -XPOST 'localhost:9200/index_name' -d'{
	"settings": {
		"number_of_shards": 1,
		"number_of_replicas": 0,
	},
	"mappings": {
		"type1": {
			"_all": {
				"enabled": false
			},
			"properties": {
				"field1": {
					"type": "string",
					"index": "not_analyzed"
				}
			}
		},
		"type2": {
			"properties": {
				"field2": {
					"type": "string",
					"index": "analyzed",
					"analyzer": "keyword"
				}
			}
		}
	}
}'`


2. Using a PUT request using the _mapping API. the index must exist before createing a mapping in this way.

`curl -XPUT 'localhost:9200/index_name/index_type/_mapping' -d'{
	"_all": {
		"enabled" false
	},
	"properties": {
		"field1": {
			"type": "integer"
		}
	}
}'`


## Chapter 3: Putting Elasticsearch into Action

- CRUD operations using Elasticsearch Python client
- creating a search database
- introducing query-DSL
- search requests using python
- sorting data
- document routing


http://elasticsearch-py.readthedocs.io/en/master/

##### Elasticsearch Query-DSL

Query-DSL is a JSON interface provided by Elasticsearch to write queries in the JSON format.

```json
{
	"query": {},
	"from": 0,
	"size": 20,
	"_source": ["field1", "field2"]
}
```

##### Understanding Query-DSL parameters

`query` contains all the queries that need to be passed to Elasticsearch

```json
{
	"query": {
		"query_string": {
			"default_field": "category",
			"query": "search"
		}
	}
}
```

`from` and `size` controls the pagination and teh result size to be returned after querying.

`_source`: (optional) takes field names in an array format, which are to be returend in the query results.

Elastic search queries categories:

- *Basic Queries* include normal keyword searching inside indexes
- *Compound Queries* combine multiple basic queries together with Boolean clauses.


Two major categories of queries 

*Full-Text Search Queries*: usually run over text fields like a tweet text.

*Term-based search queries* this do not go through an analysis process. These queries are used to match exact terms stored inside an inverted index.

##### Full-text search queries

- `match-all`: this matches all documents, it gives generous _score of 1.0 to each document in the index

```json
{ 
	"query": {
		"match_all": {}
	}
}
```

- `match`:the text passed inside a match query goes through the analysis phase and depending on the operator (which defaults to OR), coduments are matched

```json
{
	"query": {
		"match": {
			"text": "Build Great Web Apps",
			"operator": 'and'
		}
	}
}
```

The preceding query will match the documents taht contain the `Build`, `Great`, `Web` and `Apps` terms in the text field. If we had used the OR operator it would have matched the documents containing *any* of these terms.

if we want the exact matches, in the same order

```json
{
	"query": {
		"match": {
			"text": "\"Build Great Web Apps\""
		}
	}
}
```

- `multi_match`: similar to match query but provides options to search the same terms in *more than one field at one go*.

```json
{
	"query": {
		"multi_match": {
			"query": "Build Great Web Apps",
			"fields": ["text", "retweeted_status.text"]
		}
	}
}
```

The preceding query will search the words inside the two fields `text and `retweeted_status.text`

- `query_string` this provides a full Lucene syntax to be used in it. It uses a query parser to construct an actual query out of the provided text.

```json
{
	"query": {
		"query_string": {
			"default_field": "text",
			"query": "text:analytics^2 +text:data -user.anem:d_bharvi"
		}
	}
}
```














