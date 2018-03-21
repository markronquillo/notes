# Udemy: Elasticsearch 5 and stack hands on 
#### Elasticsearch Overview

- Started off as scalable lucene
- Horizontally scalable search engine
- Each 'shard' is an inverted index of documents
- but not just for full text search
- can handle structured data, and can aggregate data quickly


*Kibana* 
- Web ui for searching and visualizing
- complex aggregations, graphs and charts
- often used for log analysis


*Logstash/Beats*

- Ways to feed data into Elasticsearch
- FileBeat can monitor log files, parse them and import into Elasticserach in near-real-time
- Logstash also pushes data into ES from many machines
- Not just log files

*X-Pack*

- Security
- Alerting
- Monitoring
- Reporting
- Machine Learning
- Graph Exploration

#### Using Elasticsearch

##### Logical concepts of elasticsearch

*Documents*: are the things you're searching for. They can be more than text- any structured JSON data works. every document has a unique ID and a type.

*Types*: a type defines the schema and mapping shared by documents that represetn that same sort of thing.

*Indices*: an index powers search into all documents withing a collection of types. They contain inverted indices that let you search across everything within them at once.

###### What is an inverted index

*Sample*

**Document 1:**
Spcae: The final frontier. These are the voyages...

**Document 2:**
He's bad, he's number one. He's the space cowboy with the laser gun!

```python
inverted_index = {
	'space': [1, 2],
	'the': [1, 2],
	'final': [1],
	'frontier': [1],
	'he': [2],
	'bad': [2]
}
```

*TF-IDF* means Term Frequency * Inverse Document Frequency
*Term Frequency* is how often a term appears in a given document
*Document Frequency* is how often a term appears in all documents
*Term Frequency / Document Frequency* measures the relevance of a term in a document

###### Using indices

RESTful API
client API's


#### Elasticsearch Architecture


##### How ES scales?

An index is split into *shards*.

Documents are hashed to a particular shard.

Each shard may be on a different node in a cluster.

Every shard is a self-contained Lucene index of its own.

TODO: research on index -> shard -> computers relationship

##### Primary and replica shards

This index has two primary shards and two replicas.
Your application should round-robin request amongst nodes.

*Write* requests are routed to the primary shard, then replicated
*Read* requests are routed to the primary or any replica.

*The number of primary shards cannot be changed later*

Not as bad as it sounds - you can add more replica shards for more read throughput.

Worst case you can re-index your data.

The number of shards can be set up front via a PUT command via REST / HTTP

```
PUT /testindex
{
	"settings": {
		"number_of_shards": 3,
		"number_of_replicas": 1
	}
}
```

The 3 + 1 each = 6 shards. 

#### Quiz time

1. The schema for your documents are defined by: -- *Types*

2. What purpose do inverted indices serve? -- *They quickly map search terms to documents*.

3. An index configured for 5 primary shards and 3 replicas would have how many shards in total? 
-- for each primary shard you add 3, =20 shards

4. ES is built only for FTS of documents -- false

















