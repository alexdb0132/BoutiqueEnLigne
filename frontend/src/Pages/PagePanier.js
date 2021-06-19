import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/button';
import Total from './Total';
import {UtiliseAuth} from '../Context/Auth'
import Payement from './Payement'


function PagePanier()
{
    const {informationsCompte} = UtiliseAuth();
    const[panier,setPanier] = useState([]);
    const[quantite, setquantite] = useState([]);
    const[errorMessage, setErrorMessage] = useState("");
    const[total, setTotal] = useState(0);


    const nomClientCourrant = informationsCompte.nomUtilisateur;
    const panierJSON = {
        nomClient: nomClientCourrant,
        produits: [{}]
    };

    useEffect(() => {
        const chercherDonnes = async () => {
            const resultat = await fetch(`/api/client/${nomClientCourrant}/panier`);
            const body = await resultat.json();
            setPanier(body)
            let quantiteDebut =[body[0].quantite];
            if(body != null)
            {
                body.map(item => {
                    quantiteDebut.push(item.quantite);   
                });
            }
            setquantite(quantiteDebut);
        };
        chercherDonnes();
        calculerTotal();
    }, []);

    function calculerTotal()
    {
        panierJSON.produits.shift();
        var nouveautotal = 0;
        panier.forEach((article,index) => nouveautotal += (article.prixRabais * quantite[index + 1]));
        nouveautotal = nouveautotal.toFixed(2);
        setTotal(nouveautotal);
    }
    async function AjouterItem(nomItem,index)
    {
        let nouvelleQuantite = quantite.slice();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        await fetch(`/api/client/${nomClientCourrant}/panier/ajouter/${nomItem}`,options).then((response) => {
            if(response.ok){
                nouvelleQuantite[index] +=1;
                setquantite(nouvelleQuantite);
                setErrorMessage("");
                calculerTotal();
            }
            else{
                setErrorMessage(`inventaire manquant pour l'item: ${nomItem} `)
            }
        });
    } 
    
    async function RetirerItem(nomItem, index)
    {
        let nouvelleQuantite = quantite.slice();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        if(quantite[index] >0)
        {
            await fetch(`/api/client/${nomClientCourrant}/panier/retirer/${nomItem}`,options).then((response)=> {
                if(response.ok){
                    nouvelleQuantite[index] -= 1;
                    setquantite(nouvelleQuantite);
                    setErrorMessage("");
                    calculerTotal();
                }  
            });
        }
    }

    return(
        <>
        {() => calculerTotal()}
            <h1>Votre Panier</h1>
            <p>{errorMessage}</p>
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
                        panier.map((article,index) =>
                            <TableRow>
                                <TableCell align="center">{article.nom}</TableCell>
                                <TableCell align="center">
                                    {quantite[index + 1]}  &nbsp;
                                    <Button variant="outline-secondary" aria-label="btnAjouter" onClick={() => AjouterItem(article.nom, index + 1)}>+</Button> &nbsp;
                                    <Button variant="outline-secondary" onClick={() => RetirerItem(article.nom, index + 1)}>-</Button>
                                </TableCell>
                                <TableCell align="center">{article.prixRabais}</TableCell>
                                <div style={{display: "none"}}>{panierJSON.produits.push(article)}</div>
                            </TableRow>
                            )
                        }
                </TableBody>
            </Table>

            <div style={{"textAlign": "right"}}>    
                <Total sousTotal={total}/>
                <Payement nomClient= {nomClientCourrant} panierclient={panierJSON}/>
            </div>

        </>
    )
}

export default PagePanier;