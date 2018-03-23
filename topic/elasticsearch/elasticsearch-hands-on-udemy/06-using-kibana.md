## Using Kibana

Kibana is a web UI that sits on top of aggregation framework of ES.


##### Installing Kibana

- sudo apt-get install kibana
- sudo vi /etc/kibana/kibana.yml:
	change server.host to 0.0.0.0
	add xpack.security.enabled: false
- sudo /bin/systemctl daemon-reload
- sudo /bin/systemctl enable kibana.service
- sudo /bin/systemctl start kibana.service

kibana is available on port 5601

