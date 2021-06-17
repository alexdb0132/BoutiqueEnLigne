// Auteur: Philippe-Anthony Daumas
export async function RechercherCompte(p_baseDonnees, p_nomClient, p_motDePasse){
    let donneesSansId = null;

    const donnees = await p_baseDonnees.collection('InformationsClient').findOne(
        {
            $or : 
            [
                { nom : p_nomClient },
                { motDePasse : p_motDePasse }
            ]
        }
    );
    
    if(donnees !== null){
        donneesSansId = {};
        donneesSansId.nom = donnees.nom;
        donneesSansId.motDePasse = donnees.motDePasse;
    }

    return donneesSansId;
}