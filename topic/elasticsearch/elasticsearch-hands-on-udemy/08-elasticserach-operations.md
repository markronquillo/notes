# Elasticsearch operations

## How many shards should I use?

- you can't add more shards later without re-indexing
- but shards aren't free- you can just make 1000 of them and stick them on one node at first
- you want to overallocate, but not too much
- consider scaling out in phases, so you have time to re-index before you higt hte next phase

- the right number of shards depends on your data and your application ther's no secret formula
- start with a single server using the same hardware you use in prod, with one shard and no replication.
- fill it with real documents and hit it with real queries.
- push it until it breaks - now you know the capacity of a single shard.

- Remember replica shards can be added
- read-heavy applications can add more replica shards without re-indexing
- note this only helps if you put the new replicas on extra hardware!



 ## Scaling with new indices

 ```
 PUT /new_index
 {
 	"settings" :{
 		"number_of_shards": 10,
 		"number_of_replicas": 1
 	}
 }
 ```

 You can use *index templates* to automatically apply mappings, analyzers and aliases etc.

`GET /index/_settings` to see the number of shards and replicas.

Multiple indices as a scaling strategy

- make a new index to hold new data
- search both indices
- use index aliases to make this easy to do.

- with time-based data, you can have one index per time frame
- common strategy for log data where you usually just want current data, but don't want to delete old data eithr
- again you can use index aliases i.e. 'logs_current', 'last_3_montjs', to point to specific indices as they rotate.

```
POST /_aliases
{
	"actions": [
		{"add": {"alias": "logs_current": "index": "logs_2017_06"}},
		{"remove": {"alias": "logs_current": "index": "logs_2017_05"}},
		{"add": {"alias": "logs_last_3_months": "index": "logs_2017_06"}},
		{"remove": {"alias": "logs_last_3_months": "index": "logs_2017_03"}},
	]
}
```

In this part, we create an index aliases of logs_current that points to an index name `logs_2017_06` and we removed the alias for the previous month.

Using index aliases, we can query into specific indices only, those indices we defined where the aliases point to. This is a performance strategy.

## Choosing your hardware

RAM is likely your bottleneck

64GB per machine is the sweetspot (32 gb to ES and 32 to the OS/Disk cache for lucene)

Under 8Gb not recommended.

fast disks are better - SSD if possible (with deadline or noop i/o scheduler)

user RAID0 - your cluster is already redundant

cpu not that important

need a fast network

don't use NAS

use medium to large configurations; too big is bad and too many small boxes is bad too.

## Heap sizing

the default heap size is only 1GB!

half or less of your physical memory should be allocated to elasticsearch
- the other half can be used by lucene for caching
- if you're not aggregating on analyzed sstring fields, consider using less than half for elasticsearch
- smaller heaps result in faster garbage collection and more memory for caching

export ES_HEAP_SIZE=10g

don't cross 32GB! pointers will blow up then.

## Monitoring X-Pack

What is x-pack?

- an elastic stack extension
- security, monitoring, alerting, reporting, graph, machine learning
- formerly shield / wathcer / marvel
- only parts can be had for free - requires a paid license or trial otherwise

```
cd /usr/share/elasticsearch
sudo bin/elasticsearch-plugin install x-pack

sudo vi /etc/elasticsearch/elasticsearch.yml
(Add xpack.security.enabled:false)

sudo /bin/systemctl stop elasticsearch.service
sudo /bin/systemctl start  elasticsearch.service
cd /usr/share/kibana
sudo -u kibana bin/kibana-plugin install x-pack
sudo /bin/systemctl stop kibana.service

sudo /bin/systemctl start kibana.service
```

In kibana devtools 
```
GET .watcher-history*/_search?pretty
{
	"sort": [{
		"result.execution_time": "desc"
	}]
}
```

## Failover in action

- setup a second elasticsearch node on our virtual machine
- observe how elasticsearch automatically expands across this new node
- stop our original node, and observer everything move to the new one.
- restart our original node, and observe everything going back to normal... automatically.


## Using snapshots

Snapshots let you back up your indices

Store backups to NAS, Amazon S3, HDFS, Azure

Smart enough to only store changes since last snapshot

```
// add it into elasticsearch.yml
// path.repo: ["/home/<user>/backups"]

PUT snapshots/backup-repo
{
	"type": "fs",
	"settings" :{
		"location": "/home/<user>/backups/backup-repo"
	}
}
```

Cheatsheet
```
// snapshot all open indices
PUT _snapshot/backup-repo/snapshot-1

// get information about a snapshot
GET _snapshot/backup-repo/snapshot-1

// monitor snapshot progress
GET _snapshot/backup-repo/snapshot-1/_status

// restore a snapshot of all indices
POST /_all/_close
POST _snapshot/backup-repo/snapshot-1/_restore
```

## Rolling Restarts

Restarting your cluster

Sometimes you have to... OS updates, elasticsearch version updates etc.

to make this go quickly and smoothly, you want to disable index reallocation whle doing this.

Rolling start procedure:

- stop indexing new data if possible
- disable shard allocation
- shutdown one node
- perform your maintenance on it and restart, confirm it joins the cluster
- re-enable shard allocation
- wait for the cluster to return to green status
- repeat steps 2-6 for all other nodes
- resume indexing new data






