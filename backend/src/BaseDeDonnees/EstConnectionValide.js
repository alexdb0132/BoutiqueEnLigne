import { RechercherCompte } from './RechercherCompte'

export async function EstConnectionValide(p_baseDonnees, p_nomClient, p_motDePasse){
    const donnesTrouvees = await RechercherCompte(p_baseDonnees, p_nomClient, p_motDePasse);

    let estValide = false;
    if(donnesTrouvees !== null){
        const {nom, motDePasse} = donnesTrouvees;
        estValide = (nom === p_nomClient && motDePasse === p_motDePasse)
    }

    return estValide;
}