## Set up your AWS Account

#### Create an IAM User

Amazon IAM enables you to manage users and user permissions in AWS.

1. Go to AWS Console.
2. Go to Users Tab
3. Click Add User
	3.1 Enter username
	3.2 Check programmatic access
4. Attach Existing policies directly
5. Search for AdministrationAccess and select the policy
6. Create user
7. Take note of secret access key

#### What is IAM

An IAM policy is a rule or set of rules defining the operatiosn allowed/denied to be performed on an AWS resource.

Policies can be granted in a number of ways:

- Attaching a managed policy. AWS provides a list of pre-defined policies such as AmazonS3ReadOnlyAccess.
- Attaching an inline policy. An inline policy is a custom policy created by hand.
- Adding the user to a group that has appropriate permission policies attached. We’ll look at groups in detail below.
- Cloning the permission of an existing IAM user.

Here is a policy that grants all operatiosn to all S3 buckets.
```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": "*"
  }
}
```

Here is a policy that grants more granular access, only allowing retrieval of files prefixed by the string Bobs- in the bucket called Hello-bucket.
```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::Hello-bucket/*",
    "Condition": {"StringEquals": {"s3:prefix": "Bobs-"}}
}
```

`http://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html`


#### What is an IAM Role

an identity with permission policies that determine what thte identity can/cannot do in AWS.


#### What is an IAM Group

An IAM group is simply a collection of IAM users.


#### What is ARN

Amazon Resource Names uniquely identify AWS resources. We require an ARN when you need to specify a resource unambiguosly across all AWS, such as in IAM policies, RDS tags and API calls.

ARN is just a globally unique identifier for an individual AWS resource and be in the ff format:

```
arn:partition:service:region:account-id:resource
arn:partition:service:region:account-id:resourcetype/resource
arn:partition:service:region:account-id:resourcetype:resource
```

Common use cases for ARN:

1. Communication

ARN is used to reference a specific resource when you orchestrate a system involving multiple AWS resources. 

2. IAM Policy

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::Hello-bucket/*"
}
```


#### Configure the AWS CLI

`aws configure` enter your user key and secret


## Setting up the Backend


#### Create a DynamoDB Table

We are using DynamoDB to store our notes data for our app.

Amazon DynamoDB is a fully managed NoSQL database that provides fast and predictable performance with seamless scalability.

`http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html`

1. Go to DynamoDB
2. Create Table
	2.1 Table name `notes`
	2.2 Primary Key - `userId`
	2.3 Sort Key - `noteId`
	2.4 Ensure `Use default settings`


#### Create an S3 bucket for file uploads.

We need a place to store our file uploads and this will be S3.

1. Go to S3.
2. Create a bucket
3. Enter name 
4. Enter region

Enable CORS by

In the notes app we'll be building, users will be uplaoding files to the bucket we just created. S3 does not allow its resources to be accessed from a different domain. We can fix this by enabling CORS for our S3 bucket.

```xml
<CORSConfiguration>
	<CORSRule>
		<AllowedOrigin>*</AllowedOrigin>
		<AllowedMethod>GET</AllowedMethod>
		<AllowedMethod>PUT</AllowedMethod>
		<AllowedMethod>POST</AllowedMethod>
		<AllowedMethod>HEAD</AllowedMethod>
		<MaxAgeSeconds>3000</MaxAgeSeconds>
		<AllowedHeader>*</AllowedHeader>
	</CORSRule>
</CORSConfiguration>
```

Paste the configuration above in created s3 bucket -> permissions -> CORS configuration.

#### Create a Cognito User Pool

Our notes app needs to handle user accounts and authentication in a secure and reliable way. To do this we are going to use Amazon Cognito.

1. Create User Pool
2. Enter notes-user-pool -> Review defaults
3. Create pool
4. Go to Apps Tab
	4.1 Add App
	4.2 Enter App name
	4.3 Unselect `Generate client secret`
	4.4 Select Enable sign-in API for server-based authentication
	4.5 finally Create app.

#### Create a Cognito Test User

We will use AWS CLi to interact with Cognito.


Create User
```
 aws cognito-idp sign-up \
  --region us-east-1 \
  --client-id 56mhb72fet3aeab3pfuce4jg49 \
  --username admin@example.com \
  --password Passw0rd! \
  --user-attributes Name=email,Value=admin@example.com
```

Verify a User
```
aws cognito-idp admin-confirm-sign-up \
 --region us-east-1 \
 --user-pool-id us-east-1_72X5RNuLb \
 --username admin@example.com
```

#### Create a Cognito Identity Pool

Now that we have our Cognito User Pool setup to handle authentication, we can use that to secure other AWS resources. 

Amazon Cognito Federated Identities enables develoeprs to create unique identities for your users and authenticate them with federated identity providers. With a federated identity, you can obtain temporary, limited-privilege AWS credentials to securely access other AWS services such as Amazon DynamoDB AmazonS2 and Amazon API Gateway.

1. Go to Cognito
2. Manage Federated Identities
3. Select Authentication providers:
	3.1. Under Cognito tab, Enter User Pool ID
	3.2. Enter App Client ID
	3.3. Create Pool


```json
	{
	  "Version": "2012-10-17",
	  "Statement": [
	    {
	      "Effect": "Allow",
	      "Action": [
	        "mobileanalytics:PutEvents",
	        "cognito-sync:*",
	        "cognito-identity:*"
	      ],
	      "Resource": [
	        "*"
	      ]
	    },
	    {
	      "Effect": "Allow",
	      "Action": [
	        "s3:*"
	      ],
	      "Resource": [
	        "arn:aws:s3:::markronquillo-notes-app/${cognito-identity.amazonaws.com:sub}*"
	      ]
	    }
	  ]
	}
```

#### Cognito User Pool vs Identity Pool

Amazon Cognito User Pool makes it easy for developers to add sign-up and sign-in functionality to web and mobile applications. It serves as your own identity provider to maintain a user directory. It supports user registration and sign-in, as well as provisioning identity tokens for signed-in users.


Amazon Cognito Federated Identities enables developers to create unique identities for your users and authenticate them with federated identity providers. With a federated identity, you can obtain temporary, limited-privilege AWS credentials to securely access other AWS services such as Dynamo DB, S3, API Gateway.


User Pool - handles store user, registration and authentication.

Identity Pool - is a way to authorize your users to use the various AWS services. Say you wanted to allow a user to have access to your S3 buket so that they could upload a file; you could specify that while creating an Identity Pool.


#### Set up the Serverless Framework

`serverless create --template aws-nodejs`

The command above will generate two files

1. handler.js: file contains actual code for hte services/functions that will be deployed to AWS Lambda.

2. serverless.yml file contains the configuration on what AWS services Serverless will provision and how to configure them.

RUN `npm init -y`

RUN `npm install aws-sdk --save-dev`
RUN `npm install uuid --save`


#### Add Support for ES6/ES7 JavaScript

Install Babel and Webpack

RUN `npm install --save-dev \
    babel-core \
    babel-loader \
    babel-plugin-transform-runtime \
    babel-preset-es2015 \
    babel-preset-stage-3 \
    serverless-webpack \
    glob \
    webpack \
    webpack-node-externals`

RUN `npm install --save babel-runtime`


##  Building the Backend

#### Add a create note API

The create note endpoint will take the note object as the input and store it in the database with a new id. The note object will contain the `content` field and `attachment` field (url).

CREATE `create.js` file

CONFIGURE api endpoint.

REMEMBER that create.js (and other endpoint js) are server functions.

REFACTOR our code

RUN `serverless webpack invoke --function create --path tests/create.json`

RUN `serverless webpack invoke --function get --path tests/get.json`

RUN `$ serverless webpack invoke --function list --path tests/list.json`

RUN `serverless webpack invoke --function update --path tests/update.json`

RUN `serverless webpack invoke --function delete --path tests/delete.json`


#### Deploy (to AWS Lambda)

RUN `serverless deploy`

After that you will be provided a series of endpoints for each handler

https://jxczb5zwna.execute-api.us-east-1.amazonaws.com/prod/

We then authenticate using created admin user earlier

```
aws cognito-idp admin-initiate-auth \
  --region us-east-1 \
  --user-pool-id us-east-1_72X5RNuLb \
  --client-id 56mhb72fet3aeab3pfuce4jg49 \
  --auth-flow ADMIN_NO_SRP_AUTH \
  --auth-parameters USERNAME=admin@example.com,PASSWORD=Passw0rd!
```

This will return an array of tokens, get the IdToken.

```
eyJraWQiOiJjY2lqNjlSUmxGSmJqMHVDVVFFaitJVnFjck9NcmdyelNNTlJLUkVsWnNjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMzIzZGNkZC1iZDg1LTRmYjItYjY1OC1hZGM5Yjc2YjM0MmQiLCJhdWQiOiI1Nm1oYjcyZmV0M2FlYWIzcGZ1Y2U0amc0OSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE0OTYzMDAxNzYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzcyWDVSTnVMYiIsImNvZ25pdG86dXNlcm5hbWUiOiJhZG1pbkBleGFtcGxlLmNvbSIsImV4cCI6MTQ5NjMwMzc3NiwiaWF0IjoxNDk2MzAwMTc2LCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0.K3cHWFgqnyFzBBc4LXkN7VVHNU36o3u8Gu0JXtoeeXyVhEZIdUUfg00NvHYyXF3FA4C5vSBTIuBh8qXeeu_r5jG6jMR1Ssvb8wFCfDGKskzTfnMLSWXBI9oFz2Vp-m6PGKT85PYCnyaaOYDs_z5Nbg-cUKgUmIp0hnarGPuemPZ6MpdsP5VCZeo8ZKmdUCbQajs_ip1njSv8ijI4Ya3V2cu7iTQhakwm7eduRfLeXKD2x_WPtn2s-17kDQDH5xG20br1vytBT3VTqknZ9PqKESvcy-W6NGU8pJU9HBQnP_yggG-pdDT0YR8q0VFvSPcJJMhk_inVw8_3d8etAYIKEg
```

```
curl https://jxczb5zwna.execute-api.us-east-1.amazonaws.com/prod/notes \
  -H "Authorization:eyJraWQiOiJjY2lqNjlSUmxGSmJqMHVDVVFFaitJVnFjck9NcmdyelNNTlJLUkVsWnNjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMzIzZGNkZC1iZDg1LTRmYjItYjY1OC1hZGM5Yjc2YjM0MmQiLCJhdWQiOiI1Nm1oYjcyZmV0M2FlYWIzcGZ1Y2U0amc0OSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE0OTYzMDAxNzYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzcyWDVSTnVMYiIsImNvZ25pdG86dXNlcm5hbWUiOiJhZG1pbkBleGFtcGxlLmNvbSIsImV4cCI6MTQ5NjMwMzc3NiwiaWF0IjoxNDk2MzAwMTc2LCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0.K3cHWFgqnyFzBBc4LXkN7VVHNU36o3u8Gu0JXtoeeXyVhEZIdUUfg00NvHYyXF3FA4C5vSBTIuBh8qXeeu_r5jG6jMR1Ssvb8wFCfDGKskzTfnMLSWXBI9oFz2Vp-m6PGKT85PYCnyaaOYDs_z5Nbg-cUKgUmIp0hnarGPuemPZ6MpdsP5VCZeo8ZKmdUCbQajs_ip1njSv8ijI4Ya3V2cu7iTQhakwm7eduRfLeXKD2x_WPtn2s-17kDQDH5xG20br1vytBT3VTqknZ9PqKESvcy-W6NGU8pJU9HBQnP_yggG-pdDT0YR8q0VFvSPcJJMhk_inVw8_3d8etAYIKEg" \
  -d "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"
```
