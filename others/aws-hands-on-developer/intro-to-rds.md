Intro to AWS RDS
----------------

### What is Amazon RDS?

Amazon Relational Database Service is a webservice that makes it easy to setup, operate and scale relational databases in the cloud.
It allows you to create and use MySQL, PostgreSQL, Oracle or Microsoft SQL Server databases.
This means the code, applications, and tools you already use today with your existing databases, can be used with Amazon RDS.

### Topics covered

- Creating an Amazon RDS instance
- Connecting to the RDS Instance with Client Software

### Creating a Relational Database (RDS) Instance


- In the AWS Management Console, on the Services click RDS

- Launch a DB Instance
- Select Engine -> Select MySQL
- On the Specify DB Details:
    - db.t2.micro
    - Multi-AZ Deployment: No
    - Storage Type: General Purpose (SSD)
    - Allocated Storage: 5
    - DB Instance Identifier: RDSLab
    - Master Username: AWSMaster
    - Password: AWS12345
- On Configure Advanced Settings
    - Publically Accessible: No
    - VPC Security Grlups - Create a new security group
    - DB Name: RDSLab
    - Backup Retention Period: 0 days to disable
- Launch DB Instance
- EC2 -> Security Groups
- select `rds-launch-wizard` choose Actions -> Edit Inbound Rules
- Set Source to Anywhere 


### Create an Amazon Linux Instance from Amazon Machine Image (AMI)

- EC2
- Launch Instance
- Find the Amazon Linux AMI
- Select for this AMI
- Leave the instance type to t2.micro
- Click Next: Configure Instance Details
- Click Next: Add Storage
- Click Next: Tag Instance
    - Tip: When launching multiple instances, having your instances tagged makes it much easier to keep track of them.
- Value field of Name to `RDS Free Lab`
- Click Next: Configure Security Group

SSH to the new EC2 instance, install mysql then connect to rds by mysql --host hostname --password -u AWSMaster
