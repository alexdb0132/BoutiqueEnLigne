import React, {useState} from 'react';
import Button from 'react-bootstrap/button';
import { Icon, InlineIcon } from '@iconify/react';
import visaIcon from '@iconify-icons/logos/visa';
import mastercardIcon from '@iconify-icons/logos/mastercard';



function Paiement({nomClient, panierclient})
{
    const[Paiementvalide,setPaiementValide] = useState(false);
    const[messageErreur,setMessageErreur] = useState("");
    const[TypeCarte,setTypeCarte] = useState();
    function ConfirmerVente()
    {
        if(Paiementvalide === true)
        {
            const optionsAjout = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(panierclient)
            };
            const optionsViderPanier = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(`/api/client/${nomClient}/panier/viderPanier`,optionsViderPanier);
            fetch('/api/administrateur/ajouterVente', optionsAjout);
            window.location.replace("/");
        }
        else
        {
            setMessageErreur("Pas une carte de credit valide");
        }
    }

    function testerCarteCredit(noCarte) {
        var visaValide = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        var masterValide = /^(?:5[1-5][0-9]{14})$/;
        
        if(noCarte.match(visaValide))
        {
            setPaiementValide(true);
            setMessageErreur("");
            setTypeCarte(visaIcon);
        }
        else if(noCarte.match(masterValide))
        {
            setPaiementValide(true);
            setTypeCarte(mastercardIcon);
            setMessageErreur("");
        }
        else
        {
            setPaiementValide(false);
            setTypeCarte();
            setMessageErreur("");
        }
      }

    return (
        <>    
        <span>Carte de credit:</span><input type="text" onChange={(e) => testerCarteCredit(e.target.value)}></input>
            <br/>
            <span style={{
                fontWeight: 'bold',
                color: 'red',
              }}>{messageErreur}</span>
            <Icon icon={TypeCarte} />
            <br/>
        <Button variant="success" onClick={()=> ConfirmerVente()}>Confirmer</Button>
        </>
    );
}

export default Paiement;