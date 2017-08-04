What is GraphQL?

- enables declarative data fetching
- GraphQL server exposes single endpoint and responds to queries

A Query Language for APIs

A More efficient alternative to REST

1. Increased mobile usage creates need for efficient data loading.
2. Variety of different frontend frameworks and platforms on the client-side.
3. Fast development speed and expectation for rapid feature development.


GraphQL is a query language for APIs not databases


## GraphQL is the better REST

GraphQL was developed to cope with the need for more flexibility and efficiency in the client-server communication.

- No more over and underfetching


Benefits of Schema & Types

- GraphQL uses strong type system to define capabilities of an API
- Schema serves as contract between client and server
- Frontend and backend teams cna work completely independent from each other.

## Core Concepts

The Schema Definision Language (SDL)


Defining simple types

```graphql
type Person {
	name: String!
	age: Int!
}

type Post {
	title: String!
}
```

Adding a relation : 1 to many relationship

```graphql
type Person {
	name: String!
	age: Int!
	posts: [Post!]!
}

type Post {
	title: String!
	author: Person!
}
```

Fetching Data with Queries

_GraphQL api typically exposes only one endpoint since it is flexible anyway_

```json
{
	allPersons(last: 2) {
		name
		age
			posts {
				title
			}
	}
}
```

Writing Data with Mutations

- creating new data
- updating data
- deleting data

```json
mutation {
	createPerson(name: 'Bob', age: 36) {
		name
		age
	}
}
```

```json
subscription {
	newPerson {
		name
		age
	}
}
```

#### The GraphQL Schema

- defines capabilities of the API by specifying how a client and fetch and update data
- represents contract between client and server
- collection of GraphQL types with specifial root types.

### Root Types

Query Type
```json
type Query {
	allPersons(last: Int) {

	}
}
```

Mutation Type
```json
mutation {
	createPerson(name: 'Bob', age: 36) {
		id
	}
}
type Mutation {
	createPerson(name: String!, age: String!): Person!
}
```

Subscription Type
```json
type Subscription {
	newPerson: Person!
}
```

```json
type Person {
	id: ID!
	name: String!
	age: Int!
	posts: [Post!]!
}
type Post {
	title: String!
	author: Person!
}
```

# Big Picture

Architectural Use Cases

1. GraphQL server with a connected database
2. GraphQL server to integrate existing system
3. A hybrid approach with a connected database and integration of existing system.
    
#### Resolver functions

GraphQL queries/ mutations consist of set of fields
GraphQL server has one resolver function per field
The purpose of each resolver is to retrieve the data for its corresponding field
