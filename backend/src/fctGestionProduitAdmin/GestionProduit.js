export async function AfficherInventaire(p_bd){

    const inventaire = await p_bd.collection('Produit').find().toArray();
    if(inventaire === null){
        return null;
    }
    else{
        return inventaire;
    }
}
export async function AjouterProduit(p_db, p_produit){
    await p_db.collection('Produit').insertOne(p_produit);
}
export async function SupprimerProduit(p_db, p_produit){
    await p_db.collection('Produit').deleteOne({nom:p_produit.nom});
}
export async function RechercherProduit(p_db,p_produit){
    const produitTrouver = await p_db.collection('Produit').findOne({nom: p_produit});
    if(produitTrouver === null){
        return null;
    }
    else{
        return produitTrouver;
    }
}
export async function ModifierProduit(p_db,p_produit,p_nouvelleValeur){

    if(p_produit === null){
        return null;
    }
    else{       
       await p_db.collection('Produit').updateOne({nom: p_produit.nom},{ 
           $set:{nom:p_nouvelleValeur.nom,
           description:p_nouvelleValeur.description,
           categorie:p_nouvelleValeur.categorie,
           prix:p_nouvelleValeur.prix,
           rabais:p_nouvelleValeur.rabais,
           quantite:p_nouvelleValeur.quantite}})
    }
    
}
export async function FiltreParPropriete(p_db,p_propriete,p_ordre){
    if(p_ordre==="1"){
        var monFiltre={[p_propriete]:1}
    }
    else{
        var monFiltre={[p_propriete]:-1}

    }
    var ordre = await p_db.collection('Produit').find().sort(monFiltre).toArray()
    return ordre
}

export async function RechercheUtilisateur(p_db,p_recherche){
    await p_db.collection('Produit').createIndex({nom: "text", description:"text", categorie:"text"})    
    var resultat = await p_db.collection('Produit').find({$text:{$search: p_recherche}}).toArray()
    return resultat
}
