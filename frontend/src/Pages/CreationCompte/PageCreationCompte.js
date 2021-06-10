import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

const model = {
    nom: "",
    premierMotDePasse: "",
    deuxiemeMotDePasse: ""
};

function PageCreationCompte(){
    const [informations, setInformations] = useState(model);
    const [composantAlert, setAlert] = useState(AfficherComposantAlert(false, "danger", ""));

    let message = "";

    function ModifierInformations(p_propriete, p_valeur){
        const nouveauModel = Object.assign({}, informations);
        nouveauModel[p_propriete] = p_valeur;
        setInformations(nouveauModel);
    }

    async function VerifierInformationsFormulaire(){
        if(EstFormulaireValide(informations)){
            const informationsAEnvoyer = {};
            informationsAEnvoyer.nom = informations.nom;
            informationsAEnvoyer.motDePasse = informations.premierMotDePasse;

            const code = await EnvoyerInformations(informationsAEnvoyer);

            if(code === 200){
                message = "Vos informations ont été enregistrées avec succès!"
                setAlert(AfficherComposantAlert(true,"success",message));
            }
            else if(code === 400){
                message = "Le nom d'utilisateur ou le mot de passe existe déjà!"
                setAlert(AfficherComposantAlert(true,"danger",message));
            }
        }
        else{
            AfficherErreurFormulaire();
        } 
    }

    function AfficherErreurFormulaire(){
        if(!EstInformationValide(informations.nom)){
            message = "Le champ nom ne peut pas être vide!";
            setAlert(AfficherComposantAlert(true, "danger", message));
        }
        else if(informations.premierMotDePasse !== informations.deuxiemeMotDePasse 
            || (informations.premierMotDePasse.length === 0 
            || informations.deuxiemeMotDePasse.length === 0)){
                message = "Les champs mot de passe doivent être non vide et identiques!";
                setAlert(AfficherComposantAlert(true, "danger", message));
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

function AfficherComposantAlert(p_show,p_variant,p_message){
    return (
        <>
            <Alert show={p_show} variant={p_variant} id="messagerAlert">{p_message}</Alert>
        </>
    );
}

export function EstFormulaireValide(p_informations){
    const { nom, premierMotDePasse, deuxiemeMotDePasse } = p_informations;
    let estFormulaireValide = false;

    if(EstInformationValide(nom) && EstInformationValide(premierMotDePasse) 
    && EstInformationValide(deuxiemeMotDePasse) ){
        
        if(premierMotDePasse === deuxiemeMotDePasse){
            estFormulaireValide = true;
        }
    }

    return estFormulaireValide;
}

export function EstInformationValide(p_information){
    let estValide = false;

    if(p_information !== null && p_information !== undefined){

        if(p_information.length !== 0){

            const informationSansEspaces = p_information.trim();
            if(informationSansEspaces.length !== 0){
    
                estValide = true;
            }
        }
    }

    return estValide;
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