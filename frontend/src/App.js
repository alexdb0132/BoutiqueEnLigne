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
<<<<<<< HEAD
import PageAchatsAdmin from './Pages/PageAchatsAdmin';
=======
import PageCreationCompte from './Pages/CreationCompte/PageCreationCompte';
>>>>>>> 735b605b96869c6eb050bd2796312065add400b2

function App() {
  return (
    <Router>
      <Container>
        <BarreNavigation/>
        <Route path="/" component={PageAccueil} exact/>
        <Route path="/Panier" component={PagePanier} exact/>
<<<<<<< HEAD
        <Route path="/AchatsAdmin" component={PageAchatsAdmin} exact/>
=======
        <Route path="/CreationCompte" component={PageCreationCompte}/>
>>>>>>> 735b605b96869c6eb050bd2796312065add400b2
      </Container>
    </Router>
  );
}

export default App;
