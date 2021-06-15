// Autheur: Philippe-Anthony Daumas
import { DonnerDroitsAcces } from './PageConnexion';

test('Le context reçoit client comme type de compte', () => {
    const informationConnexion = {
        "nomUtilisateur": "testNom",
        "motDePasse" : "motDePasse"
    };
    let informationsContext = {
        "nomUtilisateur": "",
        "typeCompte": "", 
        "estAuthentifie": false
    };

    informationsContext = DonnerDroitsAcces(informationConnexion);

    expect(informationsContext["nomUtilisateur"]).toEqual("testNom");
    expect(informationsContext["typeCompte"]).toEqual("client");
    expect(informationsContext["estAuthentifie"]).toEqual(true);
});

test('Le context reçoit admin comme type de compte', () => {
    const informationConnexion = {
        "nomUtilisateur": "admin",
        "motDePasse" : "admin"
    };
    let informationsContext = {
        "nomUtilisateur": "",
        "typeCompte": "", 
        "estAuthentifie": false
    };

    informationsContext = DonnerDroitsAcces(informationConnexion);

    expect(informationsContext["nomUtilisateur"]).toEqual("admin");
    expect(informationsContext["typeCompte"]).toEqual("administrateur");
    expect(informationsContext["estAuthentifie"]).toEqual(true);
});