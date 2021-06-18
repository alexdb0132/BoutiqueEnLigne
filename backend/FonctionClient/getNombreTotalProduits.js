import { utiliserDB } from './connection';
import { TableauSelectionCategorie } from './putSelectionCategorie';

export function getNombreTotalProduits(requete, reponse) 
{
    utiliserDB( async(db) => {
        const totalProduits = await getNombreTotalProduitsBD(db, TableauSelectionCategorie());
        reponse.status(200).json(totalProduits);
    }, reponse).catch(() => reponse.status(500).send('Erreur lors de la requête'));
};

export async function getNombreTotalProduitsBD(db, tabCategorie)
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