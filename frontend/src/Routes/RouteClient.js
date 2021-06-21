// Auteur: Philippe-Anthony Daumas
import React from 'react';
import {
  Redirect,
  Route 
} from 'react-router-dom';

import { UtiliseAuth } from '../Context/Auth';
import { EstInformationValide } from '../FonctionsGeneriques/EstInformationValide';

function RouteClient({ component: Component, ...reste }){
    const { informationsCompte } = UtiliseAuth();

    return (
        <>
            <Route {...reste} 
                render={(props) => (EstCompteConnecteClient(informationsCompte)) ? 
                    (<Component {...props} />) : (<Redirect to="/" />)
                }
            />
        </>
    );
}

export function EstCompteConnecteClient(p_informations){
    let estValide = false;

    if(EstCompteClientVerifiable(p_informations)){
        const { typeCompte, estAuthentifie } = p_informations;
        estValide = estAuthentifie 
                 && typeCompte === "client";
    }

    return estValide;
}

function EstCompteClientVerifiable(p_informations){
    const { nomUtilisateur, typeCompte, estAuthentifie } = p_informations;

    return EstInformationValide(nomUtilisateur) 
        && EstInformationValide(typeCompte) 
        && estAuthentifie !== null 
        && estAuthentifie !== undefined;
}

export default RouteClient;