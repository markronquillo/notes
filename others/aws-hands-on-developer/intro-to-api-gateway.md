Intro to API Gateway
--------------------

## Overview

This guid provides the step-by-step instructions for completing the Introduction to Amazon API Gateway 

In this lab, you will create a simple FAQ micro-service. 
The microservice will return a JSON object containing a random question and answer pair using an API Gateway endpoint that invokes a Lambda function.

## Topics covered

- Create Lambda functions
- Create API Gateway endpoints
- Debug API Gateway and Lambda with CloudWatch

## Microservice Architecture

The microservice architectural style is an approach to developing a single application
as a suite of small services, each running in its own process and communicating with lightweight mechanisms,
often an HTTP resource API. These services are built around business capabilities and independently deployable
by fully automated deployment machinery. There is a bare minimum of centralized management of these services,
which may be writen in diff programming languages and use different data storage technologies - Fowler and Lewis

## RESTful API

Representational state transfer (REST) refers to architectures that follow six constraints:

1. Separation of concerns via a client-server model.
2. State is stored entirely on the client and the communication between the client and server is stateless.
3. The client will cache data to improve network efficiency.
4. There is a uniform interface between the server and client.
5. As complexity is added into the system, layers are introduced. There may be multiple layers of RESTful compnents.
6. Follows a code-on-demand pattern, where you can be downloaded on the fly and changed without having to update clients.


## Amazon API Gateway Introduction

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor
and secure APIs at any scale.

API Gateway is a managed service provided by AWS that makes creating,
deploying and maintaning API’s easy. API Gateway includes features to:

- Transform the body and headers of incoming API request to match backend systems
- Transform the body and headers of the outgoing API responses to match API requirements.
- Control API access via Amazon Identity and Access Management
- Enable Amazon CloudWatch integration for API monitoring
- Cache API responses via Amazon CloudFront for faster response times
- Deploy an API to multiple stages, allowing easy differentiation between development, test,
production as well as versioning
- Connect custom domains to an API
- Define models to help standardize your API request and response transformations.
- https://aws.amazon.com/api-gateway/details/

## Amazon API Gateway and AWS Lambda Terminology

####  Resource

A resource is represented as a URL endpoint and path. For example, api.mysite.com/questions. You can associate HTTP methods
with resources and define different backend targets for each method. In a microservices architecture, a resource would represent a single
microservice within your system

#### Method
In API Gateway, a method is identified by the combination of a resource path and an HTTP verb,
such as GET, POST and DELETE.

#### Method Request
The method request settings in API gateway store the method’s authorization settings 
and define the URL Query String parameteres and HTTP Request Headers that are received from the client.

#### Integration Request
The integration request settings define the backend target used with the method.
It is also where you can define mapping templates, to transform the incoming request match what the backend target is expecting

#### Integration Response
The integration response settings is where the mappings are defined between the response from the backend target and the method 
response in API Gateway. You can also transform the data that is returned form your backend target to fit what your end users are expecting

#### Model
In API Gateway, a model defines the format, also known as the schema or shape of some data. You create and use models to make it easier to
create mapping templates. Because API Gateway is designed to work primarily with JSON-formatted data, API Gateway uses JSON Schema to define the expected
schema of the data.

#### Stage
In API Gateway, a stage defines the path through which an API deployment is accessible. This is commonly used to deviate between versions, 
as well as development vs production endpoints

#### Blueprint
A Lambda blueprint is an examle lambda function that can be used as a base to build out new Lambda functions.


## Build Your Microservice

- Services -> Lambda
- Click Blank Functionj
- Set name, deployment state, security=Open
- On the Configure function, use Node.js
- Paste the code
- Select the role
    - The pre-created role has one attached, AWSLambdaBasicExecutionRole
- Configure and test
- You can debug the Lambda call in CloudWatch

## Troubleshooting

- When you are testing the URL and you see the following message
{‘message’: ‘Missing Authentication Token’}. This means either a resource and associated
method has not been setup, or the security on the API endpoint has been set to AWS IAM and the credentials
have not been included with the API call. 

    - Ensure that the security dropdown is set to Open when creating your api endpoint
    - Ensure that the URL path is complete and points to your resource


## Resources
https://github.com/apex/apex
http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
http://docs.aws.amazon.com/lambda/latest/dg/welcome.html
http://microservices.io/index.html
https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm


