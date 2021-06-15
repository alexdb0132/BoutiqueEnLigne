// Autheur: Philippe-Anthony Daumas
import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { ContexteAuth } from '../../Context/Auth';
import PageConnexion from './PageConnexion';

let model = {
    "nomUtilisateur": "",
    "typeCompte": "",
    "estAuthentifie": false
};

let informationsCompte = model;

function setInformationsCompte(p_nouveauModel){
    informationCompte = p_nouveauModel;
};

// fonction pour tester le context. Elle est reprise de React context | Testin Library
const customRender = (composant, { providerPros, ...renderOptions }) => {
    return render(
        <ContexteAuth.Provider value={providerPros}>{composant}</ContexteAuth.Provider>,
        renderOptions
    );
};

test('Afficher PageConnexion', () => {
    const providerPros = {informationsCompte, setInformationsCompte};
    customRender(<PageConnexion/>, { providerPros })
});

test('Aucune information n\'a été entrée dans les champs', () => {
    const providerPros = {informationsCompte, setInformationsCompte};
    const { getByLabelText, getByText, getByRole } = customRender(<PageConnexion/>, { providerPros })

    const inputNom = getByLabelText(/Nom utilisateur/);
    fireEvent.change(inputNom, { target: { value: '' } });

    const inputMotDePasse = getByLabelText(/Mot de passe/);
    fireEvent.change(inputMotDePasse, { target: { value: '' } });

    const boutonConnexion = getByText('Se connecter');
    fireEvent.click(boutonConnexion);

    const message = getByRole('alert');
    expect(message).toHaveTextContent(/Le nom d'utilisateur ou le mot de passe est invalide!/);
});

test('Le champ nom d\'utilisateur est vide', () => {
    const providerPros = {informationsCompte, setInformationsCompte};
    const { getByLabelText, getByText, getByRole } = customRender(<PageConnexion/>, { providerPros })

    const inputNom = getByLabelText(/Nom utilisateur/);
    fireEvent.change(inputNom, { target: { value: ' ' } });

    const inputMotDePasse = getByLabelText(/Mot de passe/);
    fireEvent.change(inputMotDePasse, { target: { value: 'motDePasse' } });

    const boutonConnexion = getByText('Se connecter');
    fireEvent.click(boutonConnexion);

    const message = getByRole('alert');
    
    expect(message).toHaveTextContent(/Le nom d'utilisateur ou le mot de passe est invalide!/);
    expect(providerPros.informationsCompte["nomUtilisateur"]).toEqual("");
    expect(providerPros.informationsCompte["typeCompte"]).toEqual("");
    expect(providerPros.informationsCompte["estAuthentifie"]).toEqual(false);
});