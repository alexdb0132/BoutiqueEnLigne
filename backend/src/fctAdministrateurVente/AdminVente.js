
export async function RechercherVentes(p_bd){
    const ventes = await p_bd.collection('achats').find().toArray();
    if(ventes === null){
        return null;
    }
    else{
        return ventes;
    }
}

export async function AjouterVente(p_db, p_vente){
    await p_db.collection('achats').insertOne(p_vente);
}