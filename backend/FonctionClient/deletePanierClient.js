import { utiliserDB } from "./connection";

export function deletePanierClient(requete, reponse)
{
    const nom = requete.params.nomClient;
    utiliserDB(async (db) => {
        await deletePanicerClientDB(db, nom);
        reponse.status(200).send('Panier supprimer');
    }, reponse).catch(() => reponse.status(500).send('Erreur lors de la requête'));
}

export async function deletePanicerClientDB(db, nom)
{
    await db.collection('Panier').deleteOne({nomClient:nom});
}