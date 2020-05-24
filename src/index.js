import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import App from './App';
import './Estilos/App.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import OpinionesReducer from '../src/Redux/OpinionesReducer/OpinionesReducer';
import AsistentesReducer from '../src/Redux/AsistentesReducer/AsistentesReducer';
import { Provider } from 'react-redux';

const reducer = combineReducers({
  opiniones: OpinionesReducer, 
  asistentes: AsistentesReducer
})
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);

