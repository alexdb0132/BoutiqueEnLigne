import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';

var ordre=1
function PageGestionProduitAdmin()
{
    const [inventaire, setInventaire] = useState([]);
    useEffect(() => {
        const chercherDonnes = async () => {
            const resultat = await fetch('/api/inventaire');
            const body = await resultat.json();
            setInventaire(body);
            
        };
        
        chercherDonnes();
    }, []);
    
    var recherche=""

    async function RechercheUtilisateur(p_recherche){
        if(p_recherche.trim().length>0){
        const resultat = await fetch(`/api/inventaire/rechercheUtilisateur/${p_recherche}`);
            const body = await resultat.json();
            setInventaire(body);
        }
    }

    async function FiltreParPropriete(p_propriete,p_ordre){
        const resultat = await fetch(`/api/filtre/${p_propriete}/${ordre}`);
            const body = await resultat.json();
            setInventaire(body);
            ordre=ordre*-1
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <th>
                        <h1>Gestion de Produit</h1>
                        <Form className="d-flex">                        
                        <Form.Control id="titre" type="text" pattern="[a-zA-Z ]+" required="required" placeholder="Recherche par nom, description, categorie" onChange={e => recherche=e.target.value}/>
                        &nbsp;
                        <Button onClick={()=>RechercheUtilisateur(recherche)} variant="primary">Rechercher</Button>
                        </Form>
                    </th>
                    <tr>
                    <th>Nom<img onClick={()=>FiltreParPropriete("nom",ordre)} src="favicon-16x16.png" alt="up down arrow"/></th>
                    <th>Description <img onClick={()=>FiltreParPropriete("description",ordre)} src="favicon-16x16.png" alt="up down arrow"/></th>
                    <th> Categorie <img onClick={()=>FiltreParPropriete("categorie",ordre)} src="favicon-16x16.png" alt="up down arrow"/></th>
                    <th> Prix <img onClick={()=>FiltreParPropriete("prix",ordre)} src="favicon-16x16.png" alt="up down arrow"/></th>
                    <th> Rabais <img onClick={()=>FiltreParPropriete("rabais",ordre)} src="favicon-16x16.png" alt="up down arrow"/></th>
                    <th> Quantite <img onClick={()=>FiltreParPropriete("quantite",ordre)} src="favicon-16x16.png" alt="up down arrow"/></th>
                    </tr>
                </thead>
                <tbody>
                    {inventaire.map((produit, index) => 
                    <tr>
                        <td>{produit.nom}</td>
                        <td>{produit.description}</td>
                        <td>{produit.categorie}</td>
                        <td>{produit.prix}</td>
                        <td>{produit.rabais}</td>
                        <td>{produit.quantite}</td>
                        <td>
                            <Link key={index} to={`/modifier/${produit.nom}/`}><Button size="sm" active="true" variant="primary" >Modifier</Button></Link>
                            &nbsp;
                            <Link key={index} to={`/supprimer/${produit.nom}/`}><Button size="sm" active="true" variant="primary" >Supprimer</Button></Link>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
            <br/>
        </>
    );
}

export default PageGestionProduitAdmin;