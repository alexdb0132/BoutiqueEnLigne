// Auteur: Philippe-Anthony Daumas
export function SeDeconnecter({ informationsCompte }){
    const nouvelleInformations = Object.assign({}, informationsCompte);

    nouvelleInformations["nomUtilisateur"] = "";
    nouvelleInformations["typeCompte"] = "";
    nouvelleInformations["estAuthentifie"] = false;

    return nouvelleInformations;
}