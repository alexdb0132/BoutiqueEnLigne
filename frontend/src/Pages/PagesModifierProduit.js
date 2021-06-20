import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PageModifierProduit({ match }){
    const identifiant = match.params.id;

    const [produit, setProduit] = useState([]);
    
    useEffect(() => {
        const chercherDonnes = async () => {
            const resultat = await fetch(`/api/inventaire/${identifiant}`);
            const body = await resultat.json();
            setProduit(body);
        };
        chercherDonnes();
    }, []);
    function ValiderChampStringSeulmentEspace(p_produit)
    {
        if(p_produit.nom.trim().length>0 && p_produit.description.trim().length>0 && p_produit.categorie.trim().length>0){
            modifierProduit(p_produit)
            alert("Produit Ajouter")

        }
        else{
            alert("un champ ne peut avoir seulment des espace")
        }
    }

    async function modifierProduit(produitRenvoyer)
    {
            let data = produitRenvoyer;
            let options = {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(data)

            }        
            await fetch(`/api/inventaire/${identifiant}/modifier`,options);   
    }
    

    return (
        <>
        <h1>Modifier un produit existant</h1>
        <Form onSubmit={() => ValiderChampStringSeulmentEspace(produit)}>
                <Row>
                    <Col>
                         <Form.Group>
                            <Form.Label htmlFor="inputNom">Nom</Form.Label>
                            <Form.Control aria-label="inputNom" type="text"  required="required" placeholder={produit.nom} onChange={e => produit.nom=e.target.value}/>
                            <br/>
                            <Form.Label htmlFor="inputDescription">Description</Form.Label>
                            <Form.Control aria-label="inputDescription" type="text"  required="required"  placeholder={produit.nom} onChange={e => produit.description=e.target.value}/>
                            <br/>
                            <Form.Label htmlFor="inputCategorie">Categorie</Form.Label>
                            <Form.Control aria-label="inputCategorie" type="text" pattern="[a-zA-Z ]+" required="required"  placeholder={produit.nom} onChange={e => produit.categorie=e.target.value}/>
                            <br/>
                            <Form.Label htmlFor="inputPrix">Prix</Form.Label>
                            <Form.Control aria-label="inputPrix" type="number" min="0" step="0.01" required="required"  placeholder={produit.nom} onChange={e => produit.prix=e.target.value}/>
                            <br/>
                            <Form.Label htmlFor="inputRabais">Rabais %</Form.Label> 
                            <Form.Control aria-label="inputRabais" type="number" min="0" max="100" step="0.01" required="required"  placeholder={produit.nom} onChange={e => produit.rabais=e.target.value}/>
                            <br/>
                            <Form.Label htmlFor="inputQuantite">Quantite</Form.Label>
                            <Form.Control aria-label="inputQuantite" type="number" min="0" required="required"  placeholder={produit.nom} onChange={e => produit.quantite=e.target.value}/>
                        </Form.Group>
                        <br/>
                        <Row>
                            <Col>
                            <button type="submit" class="btn btn-primary">Modifier</button>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default PageModifierProduit;