import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import AfficherProduits from "./AffichageProduits";
import { jssPreset } from '@material-ui/core';

test("Afficher qu'il n'y a pas de produits disponible", () => {
    const {getByText} = render(<AfficherProduits/>);

    const messageNonDisponible = getByText(/Aucun produit disponible/);
    expect(messageNonDisponible).toBeInTheDocument();
});

const tableauProduits = [{
    nom: "pomme",
    description: "fruit",
    categorie: "epicerie",
    prix: 2,
    rabais: 0,
    quantite: 100
},{
    nom: "banane",
    description: "fruit",
    categorie: "epicerie",
    prix: 2,
    rabais: 0,
    quantite: 100
},{
    nom: "orange",
    description: "fruit",
    categorie: "epicerie",
    prix: 2,
    rabais: 0,
    quantite: 100
},{
    nom: "citron",
    description: "fruit",
    categorie: "epicerie",
    prix: 2,
    rabais: 0,
    quantite: 100
},{
    nom: "anana",
    description: "fruit",
    categorie: "epicerie",
    prix: 2,
    rabais: 0,
    quantite: 100
},{
    nom: "poire",
    description: "fruit",
    categorie: "epicerie",
    prix: 2,
    rabais: 0,
    quantite: 100
},]

test("Afficher les produits", () => {
    const {getByText} = render(<AfficherProduits produits={tableauProduits} />);

    const pomme = getByText(/pomme/);
    expect(pomme).toBeInTheDocument();

    const poire = getByText(/poire/);
    expect(poire).toBeInTheDocument();

    const citron = getByText(/citron/);
    expect(citron).toBeInTheDocument();
});

test("Affichage des boutons pour ajouter au panier et verification qu'ils fonctionnent", () => {
    const fonction = jest.fn(() => true);
    const {getAllByRole} = render(<AfficherProduits produits={tableauProduits} ajoutPanier={fonction}/>);

    const boutonsAjouter = getAllByRole('button', {name: /Ajouter/});
    expect(boutonsAjouter.length).toEqual(tableauProduits.length);

    boutonsAjouter.forEach(bouton => {
        fireEvent.click(bouton);
        expect(bouton).not.toBeDisabled();
        expect(fonction).toHaveReturnedWith(true);
    })
});