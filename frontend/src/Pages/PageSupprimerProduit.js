import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

function PageSupprimerProduit({match}){
    const identifiant = match.params.id;
    const [produit, setProduit] = useState([]);
    
    useEffect(() => {
        const chercherDonnes = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json();
            setProduit(body);
        };
        chercherDonnes();
    }, []);

    async function supprimerPiece()
    {
        fetch(`/api/inventaire/${identifiant}/supprimer`, { method: 'DELETE' });
    }
    return(
        <>            
            <h1>Supprimer ce Produit ?</h1>
            <h1>{identifiant}</h1>

            <Row>
                <Col>
                <Link to={`/GestionProduit`}><Button onClick={() => supprimerPiece()}>Supprimer</Button></Link>
                </Col>
            </Row>
        </>
    )
}

export default PageSupprimerProduit;