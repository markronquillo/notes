## Basic Data binding

```javascript
<body>
<div id="root">
    <input type="text" id="input" v-model="message" />

    <p>The value of the input is {{ message }}</p>
</div>
<script>
    let data = {
        message: 'Hello World'
    };

    new Vue({
        el: '#root',
        data: data
    });
</script>
</body>
```

## Lists
```html
<div id="root">
    <input type="text" id="input" v-model="message" />

    <p>The value of the input is {{ message }}</p>
</div>
<script>
    let data = {
        message: 'Hello World'
    };

    new Vue({
        el: '#root',
        data: data
    });
</script>
```

## Vue Event Listeners

## Attribute and Class Binding

## The need for computed properties

## Components 101

## Components within components

## Practical Component Ex #1: Message

## Practical Componetn Ex #2: Modal

