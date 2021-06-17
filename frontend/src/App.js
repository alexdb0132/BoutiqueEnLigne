import React, { useState } from 'react';
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
<<<<<<< HEAD
import PageGestionProduitAdmin from './Pages/PageGestionProduitAdmin'
import PageModifierProduit from './Pages/PagesModifierProduit'
import PageSupprimerProduit from './Pages/PageSupprimerProduit' 
import PageAjouterProduit from './Pages/PageAjouterProduit' 


=======
import PageProduits from './Pages/PageProduits';
import PageConnexion from './Pages/Connection/PageConnexion';
import { ContexteAuth } from './Context/Auth';
import PageAdmin from './Pages/PageAdmin';
import RouteClient from './Routes/RouteClient';
import RouteAdmin from './Routes/RouteAdmin';

let model = {
  "nomUtilisateur": "",
  "typeCompte": "", // client ou administrateur
  "estAuthentifie": false
};
>>>>>>> 54e61b2bbdca72dd858300bbf98e9f89042e5422

function App() {
  const [informationsCompte, setInformationsCompte] = useState(model);

  return (
<<<<<<< HEAD
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
=======
    <ContexteAuth.Provider value={{informationsCompte, setInformationsCompte}}>
      <Router>
        <Container>
          <BarreNavigation/>
          <Route path="/" component={PageAccueil} exact/>
          <RouteClient path="/Panier" component={PagePanier}/>
          <Route path="/CreationCompte" component={PageCreationCompte}/>
          <Route path="/Connexion" component={PageConnexion}/>
          <RouteAdmin path="/AchatsAdmin" component={PageAchatsAdmin} exact/>
          <Route path="/Produits" component={PageProduits} />
          <RouteAdmin path="/admin" component={PageAdmin}/>
        </Container>
      </Router>
    </ContexteAuth.Provider>
>>>>>>> 54e61b2bbdca72dd858300bbf98e9f89042e5422
  );
}

export default App;
