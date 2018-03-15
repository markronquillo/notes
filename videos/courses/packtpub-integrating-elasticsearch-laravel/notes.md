### Elasticsearch Basics and Tools

- Basic Elasticserach concepts
- Manipulating Elasticsearch by means of the command line
- Intermediate Elasticsearch concepts
- Elasticsearch query DSL

##### Basic Elasticsearch concepts
- What is elasticsearch, how does it operate
- How data is structured in Elasticsearch
- Constructing a basic Elasticsearch query and interpreting the results.

- Distributed near realt time full text search engine
- Schemaless JSON datastore
- JSON based REST API
- Clusters and nodes

##### Data organization

Index -> Type -> Document

Index - collection of data with same characteristics
Type 
Document - basic unit, must be assigned to type, and immutable

### Manipulating Elasticsearch via Command Line

`curl --user elastic:password 'localhost:9200/?pretty'`
`curl --user elastic:password http://localhost:9200/_cat/indices\?v`


