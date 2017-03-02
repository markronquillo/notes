link: https://www.youtube.com/watch?v=iVWmbStE1MM


`ansible -i ec2.py -u ubuntu tag_Environment_staging -m ping`

ansible -i ec2.py -u ubuntu tag_Name_webinar -m ping

upload_to_s3.yaml
```yaml 
---
- hosts: 127.0.0.1
  connection: local

  tasks:
    - name: Upload file to S3
      s3: bucket=ansible-webinar object=index.html src=./index.html mode=put permission=public-read

```
ansible-playbook upload_to_s3.yaml

25:16
