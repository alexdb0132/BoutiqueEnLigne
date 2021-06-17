// Auteur: Philippe-Anthony Daumas
import { render } from '@testing-library/react'

import { ContexteAuth } from './Auth';
// Créer pour faire des tests sur les composants qui utilisent les informations du context

// fonction pour tester le context. Elle est reprise de React context | Testin Library
export const customRender = (composant, { providerPros, ...renderOptions }) => {
    return render(
        <ContexteAuth.Provider value={providerPros}>{composant}</ContexteAuth.Provider>,
        renderOptions
    );
};