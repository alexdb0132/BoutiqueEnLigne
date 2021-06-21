// Auteur: Philippe-Anthony Daumas
import { SeDeconnecter } from "./SeDeconnecter";

describe('Déconnexion d\'un compte', () => {

    test('Déconnexion d\'un compte client', () => {
        let informationsContext = {
            "nomUtilisateur": "testNom",
            "typeCompte": "client", 
            "estAuthentifie": true
        };
    
        let nouveauContext = SeDeconnecter(informationsContext);
    
        expect(nouveauContext["nomUtilisateur"]).toEqual("");
        expect(nouveauContext["typeCompte"]).toEqual("");
        expect(nouveauContext["estAuthentifie"]).toEqual(false);
    });

    test('Déconnexion d\'un compte administrateur', () => {
        let informationsContext = {
            "nomUtilisateur": "admin",
            "typeCompte": "administrateur", 
            "estAuthentifie": true
        };
    
        let nouveauContext = SeDeconnecter(informationsContext);
    
        expect(nouveauContext["nomUtilisateur"]).toEqual("");
        expect(nouveauContext["typeCompte"]).toEqual("");
        expect(nouveauContext["estAuthentifie"]).toEqual(false);
    });
});