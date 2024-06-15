import React from 'react';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DrugPage from './pages/DrugPage';

function App (){
  return (
    <Router>
      <Switch>
        <Route exact path="/drugs/search" component = {SearchPage} />
        <Route path="/drugs/:drugName" component={DrugPage} />
      </Switch>
    </Router>
  );
}

export default App;
