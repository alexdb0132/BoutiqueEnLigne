import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function PageGestionProduitAdmin()
{
    const [inventaire, setInventaire] = useState([]);

    useEffect(() => {
        const chercherDonnes = async () => {
            const resultat = await fetch('/api/test');
            const body = await resultat.json();
            setInventaire(body);
            
        };
        
        chercherDonnes();
    }, []);
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Categorie</th>
                    <th>Prix</th>
                    <th>Rabais</th>
                    <th>Quantite</th>
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
                            <Link key={index} to={`/modifier/${produit.titre}`}><Button size="sm" active="true" variant="primary" >Modifier</Button></Link>
                            &nbsp;
                            <Link key={produit.titre} to={`/supprimer/${produit.titre}`}><Button size="sm" active="true" variant="primary" >Supprimer</Button></Link>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
            <br/>
        </>
    );
}

export default PageGestionProduitAdmin;