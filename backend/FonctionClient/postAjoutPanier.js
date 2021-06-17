import { utiliserDB } from './connection';

export function postAjoutPanier(requete, reponse)
{
    utiliserDB(async(db) =>{
        const produitAjoute = requete.body;
        await postAjoutPanierBD(db, produitAjoute);
        reponse.status(200).json(produitAjoute);
    }, reponse).catch(() => reponse.status(500).send('Erreur lors de la requête'));
}

export async function postAjoutPanierBD(db, produit)
{
    await db.collection('Panier').insertOne(produit);
}