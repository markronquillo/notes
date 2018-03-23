# 4. Importing Data Into Your Index - Big or Small

## Importing data from scripts

You can import from just about anything

stand-alone scripts can submit bulk documents via REST API

logstash and beast can stream data from logs, S3, databases, and more

AWS systems can stream in data via lambda or kinesis firehose

kafka, spart and more have ES integration add-ons.

#### hack together a script

- read in data from distributed filesystem
- transform it into JSON bulk inserts
- submit via HTTP/REST for your ES cluster

## Exercise

Write a script to import the tags.csv from ml-latest-small into tags index.


## Logstash Overview


What is logstash for

files - s3 - beats - kafka
	     |
	  logstash
	  	 |
ES - AWS - Hadoop - Spark

Input -> Logstash -> output

#### it's more than plumbing

- logstash parses, transforms, and filters data as it passes through.
- it can derive structure from unstructured data
- it can anonymize personal data or exclude it entirely
- it can do geo-location lookups
- it can scale across many nodes
- it guarantees at-least-once delivery
- it absorbs throughput from load spikes

The typical usage:

beats or files -> logstash -> elasticsearch
(web logs) -> parse into structured fields, geolocate 

## Importing Apache Access Logs with logstash

1. setup the logstash conf file
2. .../logstash -f /path/to/config/file

```
input {}
filter {}
output {}
```

## Importing data from MySQL using Logstash

- get a mysql connector from https://dev.mysql.com/downloads/connector/j/
- wget https;//dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.42.zip
- unzip mysql-connector-java-5.1.42.zip

#### Configure logstash

Set connection and statement (select query to a table); If we have a big table and we want to index it using ES, we can go this approach.


## Importing Data from AWS S3 using Logstash

```
input {
	s3 {
		bucket => "",
		access_key_id => "",
		secret_access_key => "",
	}
}
filter {
	grok {
		match => { "message" => "%{COMBINDEDAPACHELOG"}}
	}
	date {
		match => { "timestamp" => "dd/MMM/yyyy:HH:mm:ss Z"}}
	}
}
output {
	elasticsearch {
		hosts => [ "localhost:9200" ]
	},
	stdout {
		codec => rubydebug
	}
}
```

## Integrating Kafka with ES

- apache kafka
- open-source stream processing platform
- high throughput, low latency
- pub/sub
- process streams
- store streams

has a lot in common with logstash, really

```
input {
	kafka {
		bootstrap_servers => "localhost:9092"
		topic => ["kafka-logs"]
	}
}
```

## Integrating Spark and Hadoop with ES

Apache Spark

- a fast and general engine for large-scale data processing
- faster alternative to mapreduce
- supports sql, streaming, ML and graph processing
















