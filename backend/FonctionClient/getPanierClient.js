import { utiliserDB } from './connection';

export function getPanierClient(requete, reponse)
{
    const nom = requete.params.nomClient;
    utiliserDB( async(db) => {
        const panierClient = await getPanierClientBD(db, nom);
        reponse.status(200).json(panierClient);
    }, reponse).catch(() => reponse.status(500).send('Erreur lors de la requête'));
}

export async function getPanierClientBD(db, nom)
{
    return await db.collection('Panier').findOne({nomClient: nom});
}