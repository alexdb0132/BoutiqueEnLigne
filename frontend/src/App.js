import React from 'react';
import {
  BrowserRouter as Router,
  Route 
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import BarreNavigation from './Navigation/BarreNavigation';
import PagePanier from './Pages/PagePanier';
import PageAccueil from './Pages/PageAcceuil';
import PageAchatsAdmin from './Pages/PageAchatsAdmin';

function App() {
  return (
    <Router>
      <Container>
        <BarreNavigation/>
        <Route path="/" component={PageAccueil} exact/>
        <Route path="/Panier" component={PagePanier} exact/>
        <Route path="/AchatsAdmin" component={PageAchatsAdmin} exact/>
      </Container>
    </Router>
  );
}

export default App;
