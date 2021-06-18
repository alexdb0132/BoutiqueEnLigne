import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from 'bootstrap';

function PageAjouterProduit(){  
    
    
    async function AjouterProduit(p_produit)
    {
            let data = p_produit;
            let options = {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(data)

            }        
            await fetch(`/api/inventaire/ajouter`,options);   
    }
    var produitAAjouter=new Object();

    function ValiderChampStringSeulmentEspace(p_produit)
    {
        if(p_produit.nom.trim().length>0 && p_produit.description.trim().length>0 && p_produit.categorie.trim().length>0){
            AjouterProduit(p_produit)
            alert("Produit Ajouter")

        }
        else{
            alert("un champ ne peut avoir seulment des espace")
        }
    }

    return (
        <>
        <h1>Ajouter un produit</h1>
            <Form onSubmit={() => ValiderChampStringSeulmentEspace(produitAAjouter)}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control id="titre" type="text"  required="required"  onChange={e => produitAAjouter.nom=e.target.value}/>
                            <br/>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"  required="required" onChange={e => produitAAjouter.description=e.target.value}/>
                            <br/>
                            <Form.Label>Categorie</Form.Label>
                            <Form.Control type="text" pattern="[a-zA-Z ]+" required="required" onChange={e => produitAAjouter.categorie=e.target.value}/>
                            <br/>
                            <Form.Label>Prix</Form.Label>
                            <Form.Control type="number" min="0" step="0.01" required="required" onChange={e => produitAAjouter.prix=e.target.value}/>
                            <br/>
                            <Form.Label>Rabais %</Form.Label> 
                            <Form.Control type="number" min="0" max="100" step="0.01" required="required" onChange={e => produitAAjouter.rabais=e.target.value}/>
                            <br/>
                            <Form.Label>Quantite</Form.Label>
                            <Form.Control type="number" min="0" required="required" onChange={e => produitAAjouter.quantite=e.target.value}/>
                        </Form.Group>
                        <br/>
                        <Row>
                            <Col>
                            <button type="submit" class="btn btn-primary">Ajouter</button>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default PageAjouterProduit;