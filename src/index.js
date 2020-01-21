import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';
import "video-react/dist/video-react.css";
import {LOCAL_STORAGE_KEY} from "./common/urlconstants";
import LiveYoga from "./components/LiveYoga";


function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        (props) => {
          console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
          return localStorage.getItem(LOCAL_STORAGE_KEY) !== ''
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }
      }
    />
  )
}

const routing = (
  <Router>
    <Route path='/' exact component={App}/>
    <Route path='/login' exact component={App}/>
    <PrivateRoute path='/dashboard' component={Dashboard}/>
    <PrivateRoute path='/live' component={LiveYoga}/>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
