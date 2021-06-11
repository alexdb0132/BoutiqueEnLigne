
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


export async function AjouterPanier(p_bd, p_nomClient, p_idItem)
{
    const produitCourant = await p_bd.collection('Produits').findOne({id : p_idItem});
    if(produitCourant.quantite >= 1)
    {
        await p_bd.collection('Panier').updateOne(
            {
                "nomClient" : p_nomClient,
                "panier" : {$elemMatch : {id : p_idItem}}
            },
            {$inc : {"panier.$.quantite" : 1}},
            false,
            true);
        await p_bd.collection('Produits').updateOne(
            {
                "id" : p_idItem,
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
export async function RetirerPanier(p_bd, p_nomClient, p_idItem)
{
    const itemCourant = await p_bd.collection('Panier').findOne(
    {
        "nomClient" : p_nomClient,
            "panier" : {$elemMatch: {id : p_idItem}}
    }, 
    {
        "panier.$" : 1
    });   

    await p_bd.collection('Panier').updateOne(
        {
            "nomClient" : p_nomClient,
            "panier" : {$elemMatch : {id : p_idItem}}
        },
        {$inc : {"panier.$.quantite" : -1}},
        false,
        true);
    await p_bd.collection('Produits').updateOne(
        {
            "id" : p_idItem,
        },
        {$inc : {"quantite" : 1}},
        false,
        true);
}

