import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';


import Home from '../pages/Home';
import Layout from './Layout';
// import NotFound from './NotFound';

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Layout>
  </BrowserRouter>
  );
}

export default App;
