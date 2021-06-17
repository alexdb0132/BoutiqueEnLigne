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
import PageCreationCompte from './Pages/CreationCompte/PageCreationCompte';
import PageAchatsAdmin from './Pages/PageAchatsAdmin';
import PageGestionProduitAdmin from './Pages/PageGestionProduitAdmin'
import PageModifierProduit from './Pages/PagesModifierProduit'
import PageSupprimerProduit from './Pages/PageSupprimerProduit' 
import PageAjouterProduit from './Pages/PageAjouterProduit' 



function App() {
  return (
    <Router>
      <Container>
        <BarreNavigation/>
        <Route path="/" component={PageAccueil} exact/>
        <Route path="/Panier" component={PagePanier} exact/>
        <Route path="/CreationCompte" component={PageCreationCompte}/>
        <Route path="/AchatsAdmin" component={PageAchatsAdmin} exact/>
        <Route path="/GestionProduit" component={PageGestionProduitAdmin} exact/>
        <Route path="/modifier/:id" component={PageModifierProduit} />
        <Route path="/supprimer/:id" component={PageSupprimerProduit} />
        <Route path="/ajouterProduit" component={PageAjouterProduit} />



      </Container>
    </Router>
  );
}

export default App;
