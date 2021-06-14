import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import { EstInformationValide } from '../../FonctionsGeneriques/EstInformationValide';
import { EstFormulaireValide } from '../../FonctionsGeneriques/EstFormulaireValide';
import { AfficherMessageReussiteErreur } from '../../FonctionsGeneriques/AfficherMessageReussiteErreur';

const model = {
    nom: "",
    premierMotDePasse: "",
    deuxiemeMotDePasse: ""
};

function PageCreationCompte(){
    const [informations, setInformations] = useState(model);
    const [composantAlert, setAlert] = useState(AfficherMessageReussiteErreur(false, "danger", ""));

    let message = "";

    function ModifierInformations(p_propriete, p_valeur){
        const nouveauModel = Object.assign({}, informations);
        nouveauModel[p_propriete] = p_valeur;
        setInformations(nouveauModel);
    }

    async function VerifierInformationsFormulaire(){
        if(EstFormulaireCreationCompteValide(informations)){
            const informationsAEnvoyer = {};
            informationsAEnvoyer.nom = informations.nom;
            informationsAEnvoyer.motDePasse = informations.premierMotDePasse;

            const code = await EnvoyerInformations(informationsAEnvoyer);

            if(code === 200){
                message = "Vos informations ont été enregistrées avec succès!"
                setAlert(AfficherMessageReussiteErreur(true,"success",message));
            }
            else if(code === 400){
                message = "Le nom d'utilisateur ou le mot de passe existe déjà!"
                setAlert(AfficherMessageReussiteErreur(true,"danger",message));
            }
        }
        else{
            AfficherErreurFormulaire();
        } 
    }

    function AfficherErreurFormulaire(){
        if(!EstInformationValide(informations.nom)){
            message = "Le champ nom ne peut pas être vide!";
            setAlert(AfficherMessageReussiteErreur(true, "danger", message));
        }
        else if(informations.premierMotDePasse !== informations.deuxiemeMotDePasse 
            || (informations.premierMotDePasse.length === 0 
            || informations.deuxiemeMotDePasse.length === 0)){
                message = "Les champs mot de passe doivent être non vide et identiques!";
                setAlert(AfficherMessageReussiteErreur(true, "danger", message));
        }
        else if(informations.nom === "admin"){
            message = "Le nom d'utilisateur de peut pas être admin!";
            setAlert(AfficherMessageReussiteErreur(true, "danger", message));
        }
    }

    return (
        <>
            <Row>
                <Col></Col>
                <Col>
                    <AfficherChamps ModifierInformations={ModifierInformations} />
                    {composantAlert}
                    <AfficherBouton VerifierInformationsFormulaire={VerifierInformationsFormulaire} />
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

function AfficherChamps({ ModifierInformations }){
    return (
        <>
            <br/>
            <h2>Création d'un compte</h2>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="nom" >Nom utilisateur</Form.Label>
                    <Form.Control type="text" onChange={e => ModifierInformations("nom", e.target.value)} id="nom"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="premierMotDePasse" >Mot de passe</Form.Label>
                    <Form.Control type="password" onChange={e => ModifierInformations("premierMotDePasse", e.target.value)} id="premierMotDePasse"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="deuxiemeMotDePasse" >Confirmer mot de passe</Form.Label>
                    <Form.Control type="password" onChange={e => ModifierInformations("deuxiemeMotDePasse", e.target.value)} id="deuxiemeMotDePasse"/>
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
                Créer
            </Button> 
        </>
    );
}

export function EstFormulaireCreationCompteValide(p_informations){
    const { nom, premierMotDePasse, deuxiemeMotDePasse } = p_informations;
    let estFormulaireValide = false;
    
    if(EstFormulaireValide(p_informations) && nom !== "admin"){
        if(premierMotDePasse === deuxiemeMotDePasse){
            estFormulaireValide = true;
        }
    }

    return estFormulaireValide;
}

async function EnvoyerInformations(p_informations){
    const donnees = p_informations;
    const options = {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(donnees)
    };

    const resultat = await fetch('/api/creationCompte', options);
    
    return resultat.status;
}

export default PageCreationCompte;