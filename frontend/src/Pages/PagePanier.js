import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/button';
import Total from './Total';

function PagePanier()
{
    const nomClientCourrant ="maxime";
    const panierJSON = {
        nomClient: nomClientCourrant,
        produits: [{}]
    };

    const[panier,setPanier] = useState([]);

    useEffect(() => {
        const chercherDonnes = async () => {
            const resultat = await fetch(`/api/client/${nomClientCourrant}/panier`);
            const body = await resultat.json();
            setPanier(body);
        };
        chercherDonnes();
    }, []);

    function calculerTotal()
    {
        panierJSON.produits.shift();
        var nouveautotal = 0;
        panier.forEach(article => nouveautotal += (article.prixRabais * article.quantite));
        nouveautotal = nouveautotal.toFixed(2);
        return nouveautotal;
    }

    function ConfirmerVente()
    {
        const optionsAjout = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(panierJSON)
        };
        const optionsViderPanier = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`/api/client/${nomClientCourrant}/panier/viderPanier`,optionsViderPanier);
        fetch('/api/administrateur/ajouterVente', optionsAjout)
        
    }

    function AjouterItem(idItem)
    {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`/api/client/${nomClientCourrant}/panier/ajouter/${idItem}`,options);      
        window.location.reload();
    } 
    function RetirerItem(idItem)
    {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`/api/client/${nomClientCourrant}/panier/retirer/${idItem}`,options);
        window.location.reload();
    }

    return(
        <>
            <h1>Votre Panier</h1>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align="center" >Article</TableCell>
                    <TableCell align="center">Quantité</TableCell>
                    <TableCell align="center">Prix</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        panier.map(article =>
                            <TableRow>
                                <TableCell align="center">{article.nom}</TableCell>
                                <TableCell align="center">
                                    {article.quantite}  &nbsp;
                                    <Button variant="outline-secondary" aria-label="btnAjouter" onClick={() => AjouterItem(article.id)}>+</Button> &nbsp;
                                    <Button variant="outline-secondary" onClick={() => RetirerItem(article.id)}>-</Button>
                                </TableCell>
                                <TableCell align="center">{article.prixRabais}</TableCell>
                                <div style={{display: "none"}}>{panierJSON.produits.push(article)}</div> {/*A modifier afin qu'il ne dois pas etre cache mais afficher simplement pas*/}
                            </TableRow>
                            )
                        }
                </TableBody>
            </Table>
            <div style={{"textAlign": "right"}}>
                
            <Total sousTotal={calculerTotal()}/>

            <Button variant="success" onClick={()=> ConfirmerVente()}>Confirmer</Button>
            </div>

        </>
    )
}

export default PagePanier;