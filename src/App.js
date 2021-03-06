import React from 'react';
import './App.less';
import {Provider} from 'react-redux';
import store from './store';
import {HashRouter as Router} from 'react-router-dom';
import AppContent from './components/AppContent';

const App = function () {
    return (<Provider store={store}>
        <Router>
            <AppContent/>
        </Router>
    </Provider>);
};
export default App;
