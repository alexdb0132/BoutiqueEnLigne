import React from 'react'
import { fireEvent, getByText, render } from '@testing-library/react'
import PagePanier from '../PagePanier';
import Total from '../Total';
import { ExpansionPanelActions } from '@material-ui/core';

import { customRender } from '../../Context/MockAuth';

let model = {
    "nomUtilisateur": "",
    "typeCompte": "",
    "estAuthentifie": false
};

let informationsCompte = model;

function setInformationsCompte(p_nouveauModel){
    informationCompte = p_nouveauModel;
};

test('Affichage PagePanier', () => {
    const providerPros = {informationsCompte, setInformationsCompte};
    const{getByRole} = customRender(<PagePanier/>, { providerPros })

    const bouttons = getByRole('button');
    fireEvent.click(bouttons);
});

test('Affichage du total', () => {
    const{getByRole} = render(<Total/>);
})