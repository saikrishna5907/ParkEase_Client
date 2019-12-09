import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//redux setup
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//redux saga
import createSagaMiddleWare from 'redux-saga';
//reducers
import parkingAreaReducer from './store/reducers/parkingArea';
import parkingSpotReducer from './store/reducers/parkingSpots';
//sagas import
import { watchParkingAreas, watchParkingSpots } from './store/sagas/index';
// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
    parkingArea: parkingAreaReducer,
    parkingSpot: parkingSpotReducer
});
const sagaMiddleware = createSagaMiddleWare();
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchParkingAreas);
sagaMiddleware.run(watchParkingSpots);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));