import React from 'react';
import { render, fireEvent,getByLabelText } from "@testing-library/react";
import PageAjouterProduit from '../PageAjouterProduit';

test('Affichage de la Page Ajouter Produit', () => {
    const {getByText} = render(<PageAjouterProduit/>);

    const titre = getByText("Ajout de produit");
    expect(titre).toBeInTheDocument();

    const Nom = getByText(/Nom/);
    expect(Nom).toBeInTheDocument();
    
    const Description = getByText(/Description/);
    expect(Description).toBeInTheDocument();

    const Categorie = getByText(/Categorie/);
    expect(Categorie).toBeInTheDocument();

    const Prix = getByText(/Prix/);
    expect(Prix).toBeInTheDocument();

    const Rabais = getByText(/Rabais/);
    expect(Rabais).toBeInTheDocument();

    const Quantite = getByText(/Quantite/);
    expect(Quantite).toBeInTheDocument();   

    const bouttonAjouter = getByText("Ajouter");
    expect(bouttonAjouter).toBeInTheDocument();
});

test('Valider tous champ obligatoire', () => {
    const {getByLabelText} = render(<PageAjouterProduit/>);    

    const Nom = getByLabelText(/Nom/);
    expect(Nom).toBeRequired()

    const Description = getByLabelText(/Description/);
    expect(Description).toBeRequired()

    const Categorie = getByLabelText(/Categorie/);
    expect(Categorie).toBeRequired()

    const Prix = getByLabelText(/Prix/);
    expect(Prix).toBeRequired()

    const Rabais = getByLabelText(/Rabais/);
    expect(Rabais).toBeRequired()

    const Quantite = getByLabelText(/Quantite/);
    expect(Quantite).toBeRequired() 
    
});
