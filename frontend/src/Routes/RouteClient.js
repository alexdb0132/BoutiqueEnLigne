import React from 'react';
import {
    Redirect,
  Route 
} from 'react-router-dom';

import { UtiliseAuth } from '../Context/Auth';

function RouteClient({ component: Component, ...reste }){
    const { informationsCompte } = UtiliseAuth();

    return (
        <>
            <Route {...reste} 
                render={(props) => (informationsCompte["estAuthentifie"] 
                                 && informationsCompte["typeCompte"] === "client") ? 
                    (<Component {...props} />) : (<Redirect to="/" />)
                }
            />
        </>
    );
}

export default RouteClient;