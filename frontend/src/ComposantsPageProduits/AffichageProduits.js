import React from 'react';

function AfficherProduits({produits, ajoutPanier})
{
    if(produits !== undefined && produits.length > 0)
    {
        return(
        <>
            {produits.map((produit, index) => 
            <tr>
                <td>{produit.nom}</td>
                <td>{produit.description.substring(0,50)}...</td>
                <td>{produit.categorie}</td>
                <td>{produit.prix.toFixed(2)}</td>
                <td>{produit.rabais > 0 ? produit.rabais : null}</td>
                <td>{produit.rabais > 0 ? (produit.prix - (produit.prix * produit.rabais / 100)).toFixed(2) : produit.prix}</td>
                <td><button type="button" className="btn btn-primary btn-sm" 
                aria-label="btnAjouter" onClick={()=>ajoutPanier(index)}>Ajouter</button></td>
            </tr>   
            )}
        </>
        )
    }
    else
    {
        return(
            <>
                <tr><td>Aucun produit disponible</td></tr>
            </>
        )
    }
}

export default AfficherProduits;