import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import ProductReducer from './reducers/ProductReducer';

const reducers = combineReducers({
  product: ProductReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
