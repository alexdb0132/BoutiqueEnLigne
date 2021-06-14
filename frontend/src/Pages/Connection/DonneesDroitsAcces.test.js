import {DonnerDroitsAcces} from './PageConnexion';

test('', () => {
    const nomUtilisateur = "testNom";
    let informationsContext = {
        "nomUtilisateur": "",
        "typeCompte": "", 
        "estAuthentifie": false
    };

    informationsContext = DonnerDroitsAcces(nomUtilisateur);

    expect(informationsContext["nomUtilisateur"]).toEqual("testNom");
    expect(informationsContext["typeCompte"]).toEqual("client");
    expect(informationsContext["estAuthentifie"]).toEqual(true);
});

test('', () => {
    const nomUtilisateur = "admin";
    let informationsContext = {
        "nomUtilisateur": "",
        "typeCompte": "", 
        "estAuthentifie": false
    };

    informationsContext = DonnerDroitsAcces(nomUtilisateur);

    expect(informationsContext["nomUtilisateur"]).toEqual("admin");
    expect(informationsContext["typeCompte"]).toEqual("administrateur");
    expect(informationsContext["estAuthentifie"]).toEqual(true);
});