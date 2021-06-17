import {utiliserDB} from './connection';

export function getCategorie(requete, reponse)
{
    utiliserDB( async(db) => {
        const listeCategorie = await getCategorieBD(db);
        reponse.status(200).json(listeCategorie);
    }, reponse).catch(() => reponse.status(500).send('Erreur lors de la requête'));
}

export async function getCategorieBD(db)
{
    return await db.collection('Produits').aggregate([{$group:{_id: "$categorie" }}, {$sort:{ _id: 1 }}]).toArray();
}