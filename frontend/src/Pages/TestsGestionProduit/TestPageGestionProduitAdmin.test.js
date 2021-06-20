import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import PageGestionProduitAdmin from '../PageGestionProduitAdmin';

test('Affichage de la Page Gestion Produit', () => {
    const {getByText} = render(<PageGestionProduitAdmin/>);

    const titre = getByText(/Gestion de Produit/);
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

    const bouttonRecherche = getByText(/Rechercher/);
    fireEvent.click(bouttonRecherche);
});