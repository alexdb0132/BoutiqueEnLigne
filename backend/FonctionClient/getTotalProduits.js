import { utiliserDB } from './connection';
import { TableauSelectionCategorie } from './putSelectionCategorie';

export function getTotalProduits(requete, reponse) 
{
    utiliserDB( async(db) => {
        const totalProduits = await getTotalProduitsBD(db, TableauSelectionCategorie());
        reponse.status(200).json(totalProduits);
    }, reponse).catch(() => reponse.status(500).send('Erreur lors de la requête'));
};

export async function getTotalProduitsBD(db, tabCategorie)
{
    if(tabCategorie.length < 1)
    {
        return await db.collection('Produits').estimatedDocumentCount();
    }
    else
    {
        return await db.collection('Produits').find({categorie:{$in: tabCategorie}}).count();
    }
}