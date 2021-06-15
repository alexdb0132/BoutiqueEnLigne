// Autheur: Philippe-Anthony Daumas
import { EstFormulaireValide } from './EstFormulaireValide';

test('Les informations du formulaire sont valides', () => {

    const deuxInformationsAVerifier = {
        nom: "testNom",
        motDePasse: "premierMotDePasse",
    };

    const troisInformationsAVerifier = {
        nom: "testNom",
        premierMotDePasse: "premierMotDePasse",
        deuxiemeMotDePasse: "deuxiemeMotDePasse"
    };

    expect(EstFormulaireValide(deuxInformationsAVerifier)).toBe(true);
    expect(EstFormulaireValide(troisInformationsAVerifier)).toBe(true);
});

test('Les informations du formulaire sont invalides', () => {

    const deuxInformationsAVerifier = {
        nom: "",
        motDePasse: "premierMotDePasse",
    };

    const troisInformationsAVerifier = {
        nom: "testNom",
        premierMotDePasse: "",
        deuxiemeMotDePasse: "deuxiemeMotDePasse"
    };

    const informationsSansDeuxiemeMotDePasse = {
        nom: "testNom",
        premierMotDePasse: "premierMotDePasse",
        deuxiemeMotDePasse: ""
    };

    expect(EstFormulaireValide(deuxInformationsAVerifier)).toBe(false);
    expect(EstFormulaireValide(troisInformationsAVerifier)).toBe(false);
    expect(EstFormulaireValide(informationsSansDeuxiemeMotDePasse)).toBe(false);
});