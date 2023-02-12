import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ConfigContainer from './component/ConfigContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/config">
        <ConfigContainer />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);