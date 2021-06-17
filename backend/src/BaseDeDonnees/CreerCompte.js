// Auteur: Philippe-Anthony Daumas
export async function CreerCompte(p_baseDonnees, p_nomClient, p_motDePasse){
    
    await p_baseDonnees.collection('InformationsClient').insertOne(
        {
            nom : p_nomClient,
            motDePasse : p_motDePasse
        }
    );
}

