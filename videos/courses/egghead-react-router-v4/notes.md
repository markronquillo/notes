# React Router v4 

`create-react-app`
`yarn add react-router-dom@next -D`

```javascript
import { BrowserRouter as Router } from 'react-router-dom';
```

# BrowserRouter

```javascript
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={Home} />
        </div>
    </Router>
)
```

If we do not include the `exact` in the `path="/"` route, it will be included in all of the route.


The qualifier `strict` in `/about/`, is only accessible to `/about/` url.

```javascript
<Route path="/about" children={() => <h1>About</h1>}
```

`children` will always include the component it is given unless specified not to just like in the example below.

```javascript
<Route
    path="/about"
    children={({match}) => match && <h1>About</h1>}
/>
```

In the example given, we are checking if the given match is equal to our path, if yes we render the component. _Remember that `React Router` passes numerous properties and values to the components, best if you explore it_.

# Link component for navigation between routes


```javascript
import { Link } from 'react-router-dom';

// insider render()
<Link to="/">Home</Link>
<Link to={{pathname: '/about'}}>Home</Link>
<Link replace to="/contact">Home</Link>
```

The `replace` qualifier, replaces the current history in the stack, so basically if you have a history stack of 1 -> 2 -> 3,
when you clicked a `replace` link, instead of 1 -> 2 -> 3 -> 4, it will be 1 -> 2 -> 4.


# Styling a link that is active with navlink

```javascript
<NavLink exact activeClassName="active" to="/">Home</NavLink>
<NavLink activeClassName="active" to={{pathname: '/about'}}>Home</NavLink>
<NavLink activeClassName="active" replace to="/contact">Home</NavLink>
```

# React use url parameters with react router



