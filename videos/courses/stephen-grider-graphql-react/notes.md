 # Course Overview

Why does GraphQL exist?

What is GraphQL?

How do we use GraphQL?

# REST-ful Routing Primer (2)

REST-ful Routing: Given a collection of records on a server, there should be a uniform URL and HTTP request method used to utilize that colleciton of records.


# On To GraphQL (12)

Problems on REST-ful API

- Complicated RESTful endpoints, when heavily nested relationship
- Sometimes we may exp too many HTTP requests to get what we want
- Vulnerable to overfetching data

```graphql
query {
	user(id: "23") {
		friends {
			company {
				name
			}
		}
	}
}
```

> Schema is what tells GraphQL how our data looks like

> Root Query is like an entry point to our data
> 	The resolve function in our RootQuery is the actual code
>	where we get the value for our query


_GraphQLSchema_ takes in a RootQuery and returns GraphQLSchema instance.

`json-server`

`nodemon` - restarts our server whenever there are changes

You can name your GraphQL query.

```graphql
query MyQuery {
	user(id: "1") {
		name
	}
}
```

```graphql
{
	apple: company(id: "1") {	
		...companyDetails
	}
	google: company(id: "2") {
		...companyDetails
	}
}
```

```graphql
fragment companyDetails on Company {
	id
	name
	description
}
```

Mutation is used to change our underlying data in some fashion.
```graphql
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				companyId: { type: GraphQLString}
			},
			resolve(parentValue, { firstName, age }) {
				 return axios.post('http://localhost:3000/users', {
				 	firstName,
					age
				 }) 
				 .then(resp => resp.data);
			}
		}
	}
})

...

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
});
```


```graphql
mutation {
	addUser(firstName: "Stephen", age: 26)  {
		id
		firstName
		age
	}
}
```

# Fetching Data with Queries (12)

# The GraphQL Ecosystem (2)

# Clientside GraphQL (8)

# Gotchas with Queries in React (5)