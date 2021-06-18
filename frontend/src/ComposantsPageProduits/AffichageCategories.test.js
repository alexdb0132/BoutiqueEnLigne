import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import AfficherCategories from './AffichageCategories';

test("Afficher qu'il n'y a pas de catégorie disponible", () => {
    const {getByText} = render(<AfficherCategories/>);

    const messageNonDisponible = getByText(/Aucune catégorie disponible/);
    expect(messageNonDisponible).toBeInTheDocument();
});

const tableauCategories = ["epicerie", "mecanique", "informatique", "sport"];

test("Affichage des checkbox afin de selectionner une/des catégorie(s) de recherche et verification qu'ils fonctionnent", () => {
    const fonction = jest.fn(() => true);
    const {getAllByRole} = render(<AfficherCategories categories={tableauCategories} SelectionCategorie={fonction}/>);

    const checkboxCategorie = getAllByRole('checkbox', {name: /checkbox categorie/});
    expect(checkboxCategorie.length).toEqual(tableauCategories.length);

    checkboxCategorie.forEach(checkbox => {
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeDisabled();
        expect(fonction).toHaveReturnedWith(true);
    })
});