React Composition
-----------------

Our focus: Composition

Controller views
Prop validation via PropTypes
Mixins

## Controller Views

Controller views are react components that contains other react components.

Top level component | set props on children | interacts with stores

It is not recommended to make a nested Controller Views


## Prop Validation

propTypes: {
	author: React.PropTypes.object.isRequired,
	onSave: React.PropTypes.func.isRequired,
	validate: React.PropTypes.func.isRequired,
	errors: React.PropTypes.object,
	hasErrors: React.PropTypes.func.isRequired,
}

__Prop Validation isn't run in the production (minified) version of React__


Our goal is to make the authorList component to require the authors props everytime.

## Mixinx

For cross-cutting concerns
Share code between multiple components

```javascript
var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation,
		Router.State,
	]
});
```


## Params and QueryStrings

<route path='/course/:courseId' handler={Course} />

// /course/clean-code?module=3

```
var Course = React.createClass({
	render: function() {
		this.props.params.courseId; // clean-code
		this.props.query.module; // 3
		this.props.path; // /course/clean-code?module=3
	}
})

```
