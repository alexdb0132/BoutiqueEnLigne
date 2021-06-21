// Auteur: Philippe-Anthony Daumas
import React from 'react';
import {
  Redirect,
  Route 
} from 'react-router-dom';

import { UtiliseAuth } from '../Context/Auth';
import { EstInformationValide } from '../FonctionsGeneriques/EstInformationValide';

function RouteAdmin({ component: Component, ...reste }){
    const { informationsCompte } = UtiliseAuth();

    return (
        <>
            <Route {...reste} 
                render={(props) => (EstCompteConnecteAdmin(informationsCompte)) ? 
                    (<Component {...props} />) : (<Redirect to="/" />)
                }
            />
        </>
    );
}

export function EstCompteConnecteAdmin(p_informations){
    let estValide = false;

    if(EstCompteAdminVerifiable(p_informations)){
        const { nomUtilisateur, typeCompte, estAuthentifie } = p_informations;
        estValide = estAuthentifie 
                 && nomUtilisateur === "admin" 
                 && typeCompte === "administrateur";
    }

    return estValide;
}

function EstCompteAdminVerifiable(p_informations){
    const { nomUtilisateur, typeCompte, estAuthentifie } = p_informations;

    return EstInformationValide(nomUtilisateur) 
        && EstInformationValide(typeCompte) 
        && estAuthentifie !== null 
        && estAuthentifie !== undefined;
}

export default RouteAdmin;