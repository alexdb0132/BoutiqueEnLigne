import React from 'react'
import { fireEvent, getByText, render } from '@testing-library/react'
import PagePanier from '../PagePanier';
import Total from '../Total';
import { ExpansionPanelActions } from '@material-ui/core';


test('Affichage PagePanier', () => {
    const{getByRole} = render(<PagePanier/>);

    const bouttons = getByRole('button');
    fireEvent.click(bouttons);
});

test('Affichage du total', () => {
    const{getByRole} = render(<Total/>);
})