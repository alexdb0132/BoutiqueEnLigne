import { utiliserDB } from './connection';
import { TableauSelectionCategorie } from './putSelectionCategorie';

export function getProduitsVoulues(requete, reponse) 
{
    const decalage = parseInt(requete.params.decalage);
    const produitsParPage = parseInt(requete.params.produitsParPage);

    utiliserDB( async(db) => {
        const listeProduit = await getProduitsBD(db, decalage, produitsParPage, TableauSelectionCategorie());
        reponse.status(200).json(listeProduit);
    }, reponse).catch(() => reponse.status(500).send('Erreur lors de la requête'));
};

export async function getProduitsBD(db, decalage, produitsParPage, tabCategorie)
{
    if(tabCategorie.length < 1)
    {
        return await db.collection('Produits').find().skip(decalage).limit(produitsParPage).sort({id:1}).toArray();
    }
    else
    {
        return await db.collection('Produits').find({categorie:{$in: tabCategorie}}).
        skip(decalage).limit(produitsParPage).sort({id:1}).toArray();
    }
}

