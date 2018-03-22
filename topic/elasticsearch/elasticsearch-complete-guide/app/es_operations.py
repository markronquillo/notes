from elasticsearch import Elasticsearch
from time import time, sleep
from config import index_settings, doc_mapping

es = Elasticsearch('localhost:9200')

index_name='books'
doc_type='search'
body = {}
mapping = {}
mapping[doc_type] = doc_mapping
body['settings'] = index_settings
body['mappings'] = mapping

if not es.indices.exists(index = index_name):
	print('index does not exist, creating the index')
	es.indices.create(index = index_name, body = body)
	sleep(2)
else:
	print('An index with this name already exists')

doc1 = {
	'name': 'Elasticsearch Essentials',
	'category': ['Big Data', 'search engine', 'Analytics'],
	'Publication': 'Packt-Pub',
	'Publishing Date': '2015-31-12'
}

# es.index(index = index_name, doc_type = doc_type, body = doc1, id = '123')

# retrieving a document
response = es.get(index=index_name, doc_type=doc_type, id='123', ignore=404)
print(response)

script = {"script": "ctx._source.category= \"data_analytics\""}
response = es.update(index=index_name, doc_type=doc_type, body=script, id='123', ignore=404)
print(response)

# response = es.get(index=index_name, doc_type=doc_type, id='123', ignore=404)
# print(response)

# append
script = {"script": "ctx._source.category += tag",
			"params": {
				"tag": "Python"
			}}
# response = es.update(index=index_name, doc_type=doc_type, body=script, id='123', ignore=404)
# print(response)

# Partial updates using doc
# es.update(index=index_name, 
# 		  doc_type=doc_type, 
# 		  doc = {'new_field': 'doing partial update with new field'}, 
# 		  id='123', 
# 		  ignore=404)





