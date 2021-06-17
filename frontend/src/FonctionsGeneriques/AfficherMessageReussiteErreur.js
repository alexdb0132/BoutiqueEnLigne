// Auteur: Philippe-Anthony Daumas
import Alert from 'react-bootstrap/Alert';

export function AfficherMessageReussiteErreur(p_show,p_variant,p_message){
    return (
        <>
            <Alert show={p_show} variant={p_variant} id="messagerAlert">{p_message}</Alert>
        </>
    );
}