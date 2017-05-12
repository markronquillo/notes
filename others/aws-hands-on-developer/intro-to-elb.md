- Download Sample Application

### Deploy Application

Make sure you have set the instance profile and service role

### Add Custom Policy to IAM Role

The application we’ve deployed allows a visitor to sign up for news and announcements from our ‘new startup’.
To do this it needs to have the permissiosn to write to our DynamoDB table (Push an Item) and to add an entry to our SNS queue (‘Publish’).
To enable these specific permissions we need to add a custom IAM policy to the IAM role created by AWS Elastic Beanstalk.

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action":   [ "dynamodb:PutItem" ],
      "Resource": [ "*" ]
    },
    {
      "Effect": "Allow",
      "Action":   [ "sns:Publish" ],
      "Resource": [ "*" ]
    }
  ]
}
```

Under IAM, Roles, select the aws-e..ec2-role, 
Under permissions tab, click Attach Policy within Managed Policies
Click dropdown, and attached the (created policy using the json above) to the ec2-role
This will allow the elb instance to access DynamoDB and SNS.


