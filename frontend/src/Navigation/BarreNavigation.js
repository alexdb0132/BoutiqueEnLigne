import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { UtiliseAuth } from '../Context/Auth';

function BarreNavigation()
{
    const { informationsCompte } = UtiliseAuth();

    return(
        <Navbar bg="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to='/' exact>
                        <Nav.Link>Accueil</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/Produits'>
                        <Nav.Link>Produits</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/Panier'>
                        <Nav.Link>Panier</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/AchatsAdmin'>
                        <Nav.Link>Achats admin</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
                <AfficherNavBarConnexion informationsCompte={informationsCompte}/>
            </Navbar.Collapse>

        </Navbar>
    )
}

function AfficherNavBarConnexion({ informationsCompte }){
    const AfficherBonjour = <Navbar.Text>Bonjour {informationsCompte["nomUtilisateur"]}</Navbar.Text>
    const AfficherBoutonConnexion = <LinkContainer to='/Connexion'>
                                        <Nav.Link>Connexion</Nav.Link>
                                    </LinkContainer>
    return (
        <>
            {
                (informationsCompte["estAuthentifie"])?  AfficherBonjour : AfficherBoutonConnexion 
            }
        </>
    );
}

export default BarreNavigation;