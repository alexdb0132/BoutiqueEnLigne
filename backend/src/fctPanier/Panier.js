export async function AfficherPanier(p_bd, p_nomClient){
    const donnees = await p_bd.collection('Panier').findOne(
        {
            "nomClient" : p_nomClient
        }
    );
    if(donnees === null)
    {
        return null
    }
    else{
        return donnees.panier;

    }
}

export async function ViderPanier (p_bd, p_nomClient){
await p_bd.collection('Panier').updateOne(
    {
        "nomClient" : p_nomClient
    },
    {
        $set:{"panier" : [{}]}
    })
}  


export async function AjouterPanier(p_bd, p_nomClient, p_nomItem)
{
    const produitCourant = await p_bd.collection('Produits').findOne({nom : p_nomItem});
    if(produitCourant.quantite >= 1)
    {
        await p_bd.collection('Panier').updateOne(
            {
                nomClient : p_nomClient,
                panier : {$elemMatch : {nom : p_nomItem}}
            },
            {$inc : {"panier.$.quantite" : 1}},
            false,
            true);
        await p_bd.collection('Produits').updateOne(
            {
                nom : p_nomItem,
            },
            {$inc : {"quantite" : -1}},
            false,
            true);
        return "item ajouter";
    }
    else
    {
        return "inventaire manquant";
    }
}

export async function RetirerPanier(p_bd, p_nomClient, p_nomItem)
{
    let quantitePanier = 0;
    const itemCourant = await p_bd.collection('Panier').findOne(
    {
        "nomClient" : p_nomClient,
        "panier" : {$elemMatch: {nom : p_nomItem}}
    });  
    itemCourant.panier.map(item => {
        if (item.nom === p_nomItem)
        {
            quantitePanier = item.quantite;   
        }
    });
    if(quantitePanier > 0)
    {
        await p_bd.collection('Panier').updateOne(
            {
                "nomClient" : p_nomClient,
                "panier" : {$elemMatch : {nom : p_nomItem}}
            },
            {$inc : {"panier.$.quantite" : -1}},
            false,
            true);
        await p_bd.collection('Produits').updateOne(
            {
                nom : p_nomItem,
            },
            {$inc : {"quantite" : 1}},
            false,
            true);
        return "item retirer";
    }
    else
    {
        await p_bd.collection('Panier').updateOne(
            {
                "nomClient" : p_nomClient,
                "panier" : {$elemMatch : {nom : p_nomItem}}
            },
            {$pull : {"panier" : {nom : p_nomItem}}},
            false,
            true);
        return "item supprimer du panier";
    }
}

