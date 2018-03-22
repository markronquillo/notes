index_settings = {
	"number_of_shards": 1,
	"number_of_replicas": 1,
	"index": {
		"analysis": {
			"analyzer": {
				"keyword_analyzed": {
					"type": "custom",
					"filter": [
						"lowercase",
						"asciifolding"
					],
					"tokenizer": "keyword"
				}
			}
		}
	}
}

doc_mapping = {
	"_all": {
		"enabled": False
	},
	"properties": {
        "skills": {
            "type": "text",
            "index": True,
            "analyzer": "standard"
        }
    }
}