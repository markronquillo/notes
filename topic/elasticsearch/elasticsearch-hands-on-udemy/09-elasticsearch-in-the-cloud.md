# Elasticsearch in the Cloud

## Using Amazon ES service

Amazon ES lets you rent and configure an ES cluster

The main thing that's different with Amazon ES is security.

## Integrating Amazon ES with Logstash

- setup a secure access to your cluster from kibana and from logstash
- need to create an IAM and its credentials
- simultaneously allow access to the IP you'reconnecting to kibana and this user
- configure logstash with that user's credentials for secure communication to the ES cluster.

Access policy
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"AWS": [
					"arn:aws:iam::....:user/estest",
					"arn:aws:iam::....:user/estest:root",
				]
			},
			"Action": "es:*",
			"Resource": "arn:aws ..."
		},
		{
			"Effect": "Allow",
			"Principal": {
				"AWS": "*"
			},
			"Action": [
				"es:ESHttpGet",
				"es:ESHttpPut",
				"es:ESHttpPost",
				"es:ESHttpHead",
			],
			"Resource": "arn:aws:es:us-east-1:",
			"Condition": {
				"IpAddress": {
					"aws:SourceIp": [
						"192.168.0.1"
					]
				}
			}
		}
	]
}
```

Logstash configuration

```
input {
	file {
		path => '/home/....'
	}
}

output {
	amazon_es {
		hosts => ["url"],
		region => "us-east-1",
		aws_access_key_id =>
		aws_secret_access_key =>
		index =>
	}
}
```

In this video's example, he tried to connect the logstash running in his local machine to his Amazon ES.




