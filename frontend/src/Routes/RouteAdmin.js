// Autheur: Philippe-Anthony Daumas
import React from 'react';
import {
  Redirect,
  Route 
} from 'react-router-dom';

import { UtiliseAuth } from '../Context/Auth';

function RouteAdmin({ component: Component, ...reste }){
    const { informationsCompte } = UtiliseAuth();

    return (
        <>
            <Route {...reste} 
                render={(props) => (informationsCompte["estAuthentifie"] 
                                 && informationsCompte["typeCompte"] === "admin") ? 
                    (<Component {...props} />) : (<Redirect to="/" />)
                }
            />
        </>
    );
}

export default RouteAdmin;