// Autheur: Philippe-Anthony Daumas
import React from 'react'
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';

import PageCreationCompte from './PageCreationCompte';

test('Afficher PageCreationCompte', () => {
    const div = document.createElement('div');
    ReactDOM.render(< PageCreationCompte />, div);
});

test('Aucune information n\'a été entrée dans les champs', () => {
    const { getByLabelText, getByText, getByRole } = render(<PageCreationCompte/>);

    const inputNom = getByLabelText(/Nom utilisateur/);
    fireEvent.change(inputNom, { target: { value: '' } });

    const inputPremierMotDePasse = getByLabelText(/Mot de passe/);
    fireEvent.change(inputPremierMotDePasse, { target: { value: '' } });

    const inputDeuxiemeMotDePasse = getByLabelText(/Confirmer mot de passe/);
    fireEvent.change(inputDeuxiemeMotDePasse, { target: { value: '' } });

    const boutonCreer = getByText('Créer');
    fireEvent.click(boutonCreer);

    const message = getByRole('alert');
    expect(message).toHaveTextContent(/Le champ nom ne peut pas être vide!/);
});

test('Le premier champ mot de passe a été entré', () => {
    const { getByLabelText, getByText, getByRole } = render(<PageCreationCompte/>);

    const inputNom = getByLabelText(/Nom utilisateur/);
    fireEvent.change(inputNom, { target: { value: ' ' } });

    const inputPremierMotDePasse = getByLabelText(/Mot de passe/);
    fireEvent.change(inputPremierMotDePasse, { target: { value: 'motDePasseAjoute' } });

    const inputDeuxiemeMotDePasse = getByLabelText(/Confirmer mot de passe/);
    fireEvent.change(inputDeuxiemeMotDePasse, { target: { value: '' } });

    const boutonCreer = getByText('Créer');
    fireEvent.click(boutonCreer);

    const message = getByRole('alert');
    expect(message).toHaveTextContent(/Le champ nom ne peut pas être vide!/);
});

test('Le nom et le deuxième champ mot de passe ont été entrées', () => {
    const { getByLabelText, getByText, getByRole } = render(<PageCreationCompte/>);

    const inputNom = getByLabelText(/Nom utilisateur/);
    fireEvent.change(inputNom, { target: { value: 'nomAjoute' } });

    const inputPremierMotDePasse = getByLabelText(/Mot de passe/);
    fireEvent.change(inputPremierMotDePasse, { target: { value: 'motDePasseAjoute' } });

    const inputDeuxiemeMotDePasse = getByLabelText(/Confirmer mot de passe/);
    fireEvent.change(inputDeuxiemeMotDePasse, { target: { value: '' } });

    const boutonCreer = getByText('Créer');
    fireEvent.click(boutonCreer);

    const message = getByRole('alert');
    expect(message).toHaveTextContent(/Les champs mot de passe doivent être non vide et identiques!/);
});

test('Tous les champs du formulaire ont été entrées', () => {
    const { getByLabelText, getByText, getByRole } = render(<PageCreationCompte/>);

    const inputNom = getByLabelText(/Nom utilisateur/);
    fireEvent.change(inputNom, { target: { value: 'nomAjoute' } });

    const inputPremierMotDePasse = getByLabelText(/Mot de passe/);
    fireEvent.change(inputPremierMotDePasse, { target: { value: 'motDePasseAjoute' } });

    const inputDeuxiemeMotDePasse = getByLabelText(/Confirmer mot de passe/);
    fireEvent.change(inputDeuxiemeMotDePasse, { target: { value: 'motDePasseDifferent' } });

    const boutonCreer = getByText('Créer');
    fireEvent.click(boutonCreer);

    const message = getByRole('alert');
    expect(message).toHaveTextContent(/Les champs mot de passe doivent être non vide et identiques!/);
});

test('Le nom d\'utilisateur admin a été entré', () => {
    const { getByLabelText, getByText, getByRole } = render(<PageCreationCompte/>);

    const inputNom = getByLabelText(/Nom utilisateur/);
    fireEvent.change(inputNom, { target: { value: 'admin' } });

    const inputPremierMotDePasse = getByLabelText(/Mot de passe/);
    fireEvent.change(inputPremierMotDePasse, { target: { value: 'motDePasseAjoute' } });

    const inputDeuxiemeMotDePasse = getByLabelText(/Confirmer mot de passe/);
    fireEvent.change(inputDeuxiemeMotDePasse, { target: { value: 'motDePasseAjoute' } });

    const boutonCreer = getByText('Créer');
    fireEvent.click(boutonCreer);

    const message = getByRole('alert');
    expect(message).toHaveTextContent(/Le nom d'utilisateur de peut pas être admin!/);
});