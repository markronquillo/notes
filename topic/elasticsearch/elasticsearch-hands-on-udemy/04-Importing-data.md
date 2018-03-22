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







