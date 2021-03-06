import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-circular-progressbar/dist/styles.css';
import '@progress/kendo-theme-material/dist/all.css';
import 'bootstrap-4-grid/css/grid.min.css';
import * as serviceWorker from './serviceWorker';
import "video-react/dist/video-react.css";
import {LOCAL_STORAGE_KEY} from "./common/urlconstants";
import Dashboard from './components/Dashboard';
import LiveYoga from "./components/LiveYoga";
import Rewards from "./components/Rewards";
import OnBoarding from "./components/OnBoarding";
import MyStats from "./components/MyStats";
import App from './App';


function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        (props) => {
          console.log('>>> in route', localStorage.getItem(LOCAL_STORAGE_KEY));
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
    <Route path='/' render={() => (<Redirect to="/dashboard"/>)}/>
    <Route path='/login' exact component={App}/>
    <Route path='/onboard' component={OnBoarding}/>
    <PrivateRoute path='/dashboard' component={Dashboard}/>
    <PrivateRoute path='/live' component={LiveYoga}/>
    <PrivateRoute path='/rewards' component={Rewards}/>
    <PrivateRoute path='/mystats' component={MyStats}/>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
