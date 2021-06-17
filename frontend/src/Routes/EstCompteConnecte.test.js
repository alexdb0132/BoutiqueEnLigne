// Auteur: Philippe-Anthony Daumas
import { EstCompteConnecteAdmin } from './RouteAdmin';
import { EstCompteConnecteClient } from './RouteClient';

describe('Tentative d\'accès à une route d\'administrateur', () => {

    test('Le type de compte est administrateur', () => {
        const administrateurConnecte = {
            "nomUtilisateur": "admin",
            "typeCompte": "administrateur",
            "estAuthentifie": true
        };
        const administrateurNonConnecte = {
            "nomUtilisateur": "admin",
            "typeCompte": "administrateur",
            "estAuthentifie": false
        };
        const administrateurAvecNomUtilisateurInvalide = {
            "nomUtilisateur": "testNom",
            "typeCompte": "administrateur",
            "estAuthentifie": true
        };

        expect(EstCompteConnecteAdmin(administrateurConnecte)).toBe(true);
        expect(EstCompteConnecteAdmin(administrateurNonConnecte)).toBe(false);
        expect(EstCompteConnecteAdmin(administrateurAvecNomUtilisateurInvalide)).toBe(false);
    });

    test('Le type de compte est client', () => {
        const clientConnecte = {
            "nomUtilisateur": "testNom",
            "typeCompte": "client",
            "estAuthentifie": true
        };
        const clientAvecNomUtilisateurAdmin = {
            "nomUtilisateur": "admin",
            "typeCompte": "client",
            "estAuthentifie": false
        };

        expect(EstCompteConnecteAdmin(clientConnecte)).toBe(false);
        expect(EstCompteConnecteAdmin(clientAvecNomUtilisateurAdmin)).toBe(false);
    });

    test('Des propriétés des informations sont null ou vide', () => {
        const proprieteNomUtilisateur = {
            "nomUtilisateur": "",
            "typeCompte": "administrateur",
            "estAuthentifie": true
        };
        const proprietetypeCompteEstVide = {
            "nomUtilisateur": "admin",
            "typeCompte": "",
            "estAuthentifie": true
        };
        const proprieteEstAuthentifieEstNull = {
            "nomUtilisateur": "admin",
            "typeCompte": "administrateur",
            "estAuthentifie": null
        };

        expect(EstCompteConnecteAdmin(proprieteNomUtilisateur)).toBe(false);
        expect(EstCompteConnecteAdmin(proprietetypeCompteEstVide)).toBe(false);
        expect(EstCompteConnecteAdmin(proprieteEstAuthentifieEstNull)).toBe(false);
    });
});

describe('Tentative d\'accès à une route cliente', () => {

    test('Le type de compte est client', () => {
        const clientConnecte = {
            "nomUtilisateur": "testNom",
            "typeCompte": "client",
            "estAuthentifie": true
        };
        const clientDeconnecte = {
            "nomUtilisateur": "testNom",
            "typeCompte": "client",
            "estAuthentifie": false
        };
        
        expect(EstCompteConnecteClient(clientConnecte)).toBe(true);
        expect(EstCompteConnecteClient(clientDeconnecte)).toBe(false);
    });

    test('Le type de compte est administrateur', () => {
        const administrateurConnecte = {
            "nomUtilisateur": "admin",
            "typeCompte": "administrateur",
            "estAuthentifie": true
        };
        const administrateurAvecNomUtilisateurInvalide = {
            "nomUtilisateur": "client",
            "typeCompte": "administrateur",
            "estAuthentifie": false
        };

        expect(EstCompteConnecteClient(administrateurConnecte)).toBe(false);
        expect(EstCompteConnecteClient(administrateurAvecNomUtilisateurInvalide)).toBe(false);
    });

    test('Des propriétés des informations sont null ou vide', () => {
        const proprieteNomUtilisateur = {
            "nomUtilisateur": "",
            "typeCompte": "client",
            "estAuthentifie": true
        };
        const proprietetypeCompteEstVide = {
            "nomUtilisateur": "testNom",
            "typeCompte": "",
            "estAuthentifie": true
        };
        const proprieteEstAuthentifieEstNull = {
            "nomUtilisateur": "testNom",
            "typeCompte": "client",
            "estAuthentifie": null
        };

        expect(EstCompteConnecteClient(proprieteNomUtilisateur)).toBe(false);
        expect(EstCompteConnecteClient(proprietetypeCompteEstVide)).toBe(false);
        expect(EstCompteConnecteClient(proprieteEstAuthentifieEstNull)).toBe(false);
    });
});
