import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

export function configureStore() {
    return createStore(reducer, {});
}
