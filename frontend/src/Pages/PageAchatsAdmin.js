import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/button';


function PageAchatsAdmin()
{
    const [ventes, setVentes] = useState([]);

    useEffect(() => {
        const chercherDonnes = async () => {
            const resultat = await fetch(`/api/administrateur/ventes`);
            const body = await resultat.json();
            setVentes(body);
        };
        chercherDonnes();
    }, []);
    
    function AfficherVentes() {
        return ventes.map((vente, index) => {
           const { _id, nomClient, produits} = vente
           return (
                <TableRow key={_id}>
                    <TableCell align="center">{nomClient}</TableCell>
                    <TableCell>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"> Nom </TableCell>
                                    <TableCell align="center"> Categorie</TableCell>
                                    <TableCell align="center"> Prix</TableCell>
                                    <TableCell align="center"> quantite</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {
                                    produits.map(produit =>
                                        <TableRow>
                                            <TableCell align="center">{produit.nom}</TableCell>
                                            <TableCell align="center">{produit.categorie}</TableCell>
                                            <TableCell align="center">{produit.prixRegulier} $</TableCell>
                                            <TableCell align="center">{produit.quantite}</TableCell>
                                        </TableRow>
                                        )
                                    }
                            </TableBody>
                        </Table>
                    </TableCell>
                    <TableCell align="center">{calculertotal(produits)}</TableCell>
                </TableRow>
           )
        });
    };


    function calculertotal(prod)
    {
        var totalCourrant =0;
        prod.forEach(produit => totalCourrant += (produit.prixRegulier * produit.quantite));
        totalCourrant = parseFloat(totalCourrant).toFixed(2);
        return totalCourrant;
    }
    return(
        <>
            <h1>Achats effectuer</h1>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align="center" >NomClient</TableCell>
                    <TableCell align="center" >produits</TableCell>
                    <TableCell align="center">total</TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>                   
                    { 
                    AfficherVentes()
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default PageAchatsAdmin;