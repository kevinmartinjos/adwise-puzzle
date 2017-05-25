import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {asyncLocalStorage} from 'redux-persist/storages';
import logger from 'redux-logger';
import App from './components/App';
import {AppState} from './state/reducers';

const store = createStore(
  AppState,
  undefined,
  compose(
  )
)
// persistStore(store, {storage: asyncLocalStorage});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('app')
);
