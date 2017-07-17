import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import articles from './reducers/articles'
import PublishingApp from './layouts/PublishingApp'

const store = createStore(articles)

render(
    <Provider store={store}>
        <PublishingApp />
    </Provider>,
    document.getElementById('publishingAppRoot')
)
