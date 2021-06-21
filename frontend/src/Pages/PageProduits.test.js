import React from 'react';
import PageProduits from './PageProduits';
import { customRender } from '../Context/MockAuth';

let model = {
    "nomUtilisateur": "",
    "typeCompte": "",
    "estAuthentifie": false
};

let informationsCompte = model;

function setInformationsCompte(){
    ;
};

test('Affichage de la PageProduits', () => {
    const providerPros = { informationsCompte, setInformationsCompte };
    const {getByText, getByRole} = customRender(<PageProduits/>, { providerPros });

    const titrePage = getByText(/Liste des produits/);
    expect(titrePage).toBeInTheDocument();

    const pagination = getByRole('navigation', {name: /pagination/});
    expect(pagination).toBeInTheDocument();

    const tableau = getByRole('table', {name: /Tableau/});
    expect(tableau).toBeInTheDocument();

    const nbProduitParPage = getByRole('combobox', {name: /produits/});
    expect(nbProduitParPage).toBeInTheDocument();
});