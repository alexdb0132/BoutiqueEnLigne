import React from 'react';
import { render } from "@testing-library/react";
import PageProduits from './PageProduits';

test('Affichage de la PageProduits', () => {
    const {getByText, getByRole} = render(<PageProduits/>);

    const titrePage = getByText(/Liste des produits/);
    expect(titrePage).toBeInTheDocument();

    const pagination = getByRole('navigation', {name: /pagination/});
    expect(pagination).toBeInTheDocument();

    const tableau = getByRole('table', {name: /Tableau/});
    expect(tableau).toBeInTheDocument();

    const nbProduitParPage = getByRole('combobox', {name: /produits/});
    expect(nbProduitParPage).toBeInTheDocument();
});