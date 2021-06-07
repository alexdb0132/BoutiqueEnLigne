import React from 'react';
import ReactDOM from 'react-dom';
import PageCreationCompte from './PageCreationCompte'
import { EstInformationValide, EstFormulaireValide } from './PageCreationCompte';

test('Vérifier une information du formulaire', () => {
    expect(EstInformationValide("")).toBe(false);
    expect(EstInformationValide(" ")).toBe(false);
    expect(EstInformationValide(null)).toBe(false);
    expect(EstInformationValide(undefined)).toBe(false);
    expect(EstInformationValide("test")).toBe(true);
});

test('Vérifier que les champs password sont les mêmes.', () => {

    const informationsDifferentes = {
        nom: "NomTest",
        premierMotDePasse: "premierMotDePasse",
        deuxiemeMotDePasse: "deuxiemeMotDePasse"
    };
    
    const informationsPareilles = {
        nom: "NomTest",
        premierMotDePasse: "motDePassPareille",
        deuxiemeMotDePasse: "motDePassPareille"
    };

    expect(EstFormulaireValide(informationsPareilles)).toBe(true);
    expect(EstFormulaireValide(informationsDifferentes)).toBe(false);
});

test('Vérifier des champs du formulaire sont vides.', () => {

    const informationsSansNom = {
        nom: "",
        premierMotDePasse: "motDePassPareille",
        deuxiemeMotDePasse: "motDePassPareille"
    };
    
    const informationsSansPremierMotDePasse = {
        nom: "NomTest",
        premierMotDePasse: "",
        deuxiemeMotDePasse: "deuxiemeMotDePasse"
    };
    
    const informationsSansDeuxiemeMotDePasse = {
        nom: "NomTest",
        premierMotDePasse: "premierMotDePasse",
        deuxiemeMotDePasse: ""
    };

    expect(EstFormulaireValide(informationsSansNom)).toBe(false);
    expect(EstFormulaireValide(informationsSansPremierMotDePasse)).toBe(false);
    expect(EstFormulaireValide(informationsSansDeuxiemeMotDePasse)).toBe(false);
});

test('Afficher PageCreationCompte', () => {
    const div = document.createElement('div');
    ReactDOM.render(< PageCreationCompte />, div);
});