// Auteur: Philippe-Anthony Daumas
import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import { EstFormulaireValide } from '../../FonctionsGeneriques/EstFormulaireValide'
import { AfficherMessageReussiteErreur } from '../../FonctionsGeneriques/AfficherMessageReussiteErreur'
import { UtiliseAuth } from '../../Context/Auth'
import { EstAdministrateur } from '../../Administrateur/InformationsAdministrateur';
import { DonnerDroitsAcces } from './DonnerDroitsAcces';

const model = {
    nomUtilisateur: "",
    motDePasse: ""
};

function PageConnexion(){
    const [informations, setInformations] = useState(model);
    const { informationsCompte, setInformationsCompte } = UtiliseAuth();
    const [composantAlert, setAlert] = useState(AfficherMessageReussiteErreur(false, "danger", ""));

    let message = "";

    function ModifierInformations(p_propriete, p_valeur){
        const nouveauModel = Object.assign({}, informations);
        nouveauModel[p_propriete] = p_valeur;
        setInformations(nouveauModel);
    }

    async function VerifierInformationsFormulaire(){
        if(EstFormulaireValide(informations)){

            if(EstAdministrateur(informations.nomUtilisateur, informations.motDePasse)){
                ModifierInformationsContext();
                setAlert(AfficherMessageReussiteErreur(false, "", message));
            }
            else{
                const informationsAEnvoyer = {};
                informationsAEnvoyer.nomUtilisateur = informations.nomUtilisateur;
                informationsAEnvoyer.motDePasse = informations.motDePasse;

                const code = await EnvoyerInformations(informationsAEnvoyer);

                if(code === 200){
                    ModifierInformationsContext();
                    setAlert(AfficherMessageReussiteErreur(false, "", message));
                }
                else if(code === 400){
                    message = "Le nom d'utilisateur ou le mot de passe n'existe pas";
                    setAlert(AfficherMessageReussiteErreur(true, "danger", message));
                }
            }
        }
        else{
            message = "Le nom d'utilisateur ou le mot de passe est invalide!";
            setAlert(AfficherMessageReussiteErreur(true, "danger", message));
        }
    }

    function ModifierInformationsContext(){
        let nouvelleInformations = {};
        
        nouvelleInformations = DonnerDroitsAcces(informations);
        setInformationsCompte(nouvelleInformations);
    }

    return (
        <>
            {
                (!informationsCompte["estAuthentifie"]) ? <AfficherPageConnexion ModifierInformations={ModifierInformations} 
                                                                                composantAlert={composantAlert} 
                                                                                VerifierInformationsFormulaire={VerifierInformationsFormulaire}/>
                                                        : <AfficherComposantApresConnexion nomUtilisateur={informationsCompte["nomUtilisateur"]} />
            } 
        </>
    );
}

function AfficherComposantApresConnexion({ nomUtilisateur }){
    return (
        <>
            <Row>
                <Col></Col>
                <Col>
                    <h2>Bienvenue {nomUtilisateur}</h2>
                    <h3>Vous vous être connecté avec succès!</h3>
                    <br/>
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

function AfficherPageConnexion({ ModifierInformations, composantAlert, VerifierInformationsFormulaire }){
    return (
        <>
            <Row>
                <Col></Col>
                <Col>
                    <AfficherFormulaireConnection ModifierInformations={ModifierInformations} />
                    {composantAlert}
                    <AfficherBouton VerifierInformationsFormulaire={VerifierInformationsFormulaire} />
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

function AfficherFormulaireConnection({ ModifierInformations }){
    return (
        <>
            <br/>
            <h2>Connexion</h2>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="nom" >Nom utilisateur</Form.Label>
                    <Form.Control type="text" onChange={e => ModifierInformations("nomUtilisateur", e.target.value)} id="nom"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="motDePasse" >Mot de passe</Form.Label>
                    <Form.Control type="password" onChange={e => ModifierInformations("motDePasse", e.target.value)} id="motDePasse"/>
                </Form.Group>
            </Form>
            <br/>
        </>
    );
}

function AfficherBouton({ VerifierInformationsFormulaire }){
    return (
        <>
            <Button onClick={() => VerifierInformationsFormulaire()} >
                Se connecter
            </Button> 
        </>
    );
}

async function EnvoyerInformations(p_informations){
    const nomUtilisateur = p_informations.nomUtilisateur;
    const motDePasse = p_informations.motDePasse;
    
    const resultat = await fetch(`/api/connexion/${nomUtilisateur}/${motDePasse}`);
    
    return resultat.status;
}

export default PageConnexion;