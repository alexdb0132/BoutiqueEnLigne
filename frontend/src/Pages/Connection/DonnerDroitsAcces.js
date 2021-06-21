// Auteur: Philippe-Anthony Daumas
import { EstAdministrateur } from '../../Administrateur/InformationsAdministrateur';

export function DonnerDroitsAcces(p_informations){
    const nouvellesInformationsContext = {};
    const { nomUtilisateur, motDePasse } = p_informations;

    nouvellesInformationsContext["nomUtilisateur"] = nomUtilisateur;
    nouvellesInformationsContext["typeCompte"] = EstAdministrateur(nomUtilisateur, motDePasse) ? 
                                                "administrateur" : "client";
    nouvellesInformationsContext["estAuthentifie"] = true;

    return nouvellesInformationsContext;
}