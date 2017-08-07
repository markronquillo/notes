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



# Fetching Data with Queries (12)

# The GraphQL Ecosystem (2)

# Clientside GraphQL (8)

# Gotchas with Queries in React (5)