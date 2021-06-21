// Auteur: Philippe-Anthony Daumas
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import { UtiliseAuth } from '../Context/Auth';
import { SeDeconnecter } from './SeDeconnecter';

function BarreConnexionDeconnexion(){
    const { informationsCompte, setInformationsCompte } = UtiliseAuth();

    function DeconnecterCompte(){
        let nouveauContext = SeDeconnecter(informationsCompte);
        setInformationsCompte(nouveauContext);
    }

    return (
        <>
            <Navbar.Collapse className="justify-content-end">
                {
                    (informationsCompte["estAuthentifie"])?  <AfficherBarreConnecter nomUtilisateur={informationsCompte["nomUtilisateur"]} 
                                                                                     DeconnecterCompte={DeconnecterCompte}/> 
                                                           : <AfficherBarreNonConnecter/> 
                }
            </Navbar.Collapse>
        </>
    );
}

function AfficherBarreConnecter({nomUtilisateur, DeconnecterCompte}){

    return (
        <>
            <AfficherBonjour nomUtilisateur={nomUtilisateur}/>
            <AfficherBoutonDeconnexion SeDeconnecter={DeconnecterCompte}/>
        </>
    );
}

function AfficherBonjour({nomUtilisateur}){
    return (
        <>
            <Navbar.Text>Bonjour {nomUtilisateur}</Navbar.Text>
        </>
    );
}

function AfficherBoutonDeconnexion({ DeconnecterCompte }){
    return (
        <>
            <LinkContainer to='/'>
                <Button onClick={() => DeconnecterCompte()}>
                    Déconnexion
                </Button>
            </LinkContainer>
        </>
    );
}

function AfficherBarreNonConnecter(){
    return (
        <>
            <LinkContainer to='/Connexion'>
                <Button>Connexion</Button>
            </LinkContainer>
        </>
    );
}

export default BarreConnexionDeconnexion;