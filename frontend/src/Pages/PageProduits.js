import React, {useState, useEffect} from 'react';
import { Pagination } from '@material-ui/lab';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageProduits()
{
    const [totalDonnees, setTotalDonnees] = useState();
    const [donneesAffichees, setDonneesAffichees] = useState([]);
    const [decalage, setDecalage] = useState(0);
    const [produitsParPage, setProduitsParPage] = useState(12);
    const [pageCourante, setPageCourante] = useState(1);
    const [nombreDePage, setNombreDePage] = useState(0);
    const [categorie, setCategorie] = useState([]);
    const [categorieSelectionnee, setCategorieSelectionnee] = useState([]);
    //const {authentification} = {};

//--------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const chercherCategorie= async () => {
            const resultatCategorie = await fetch('/api/produits/categorie');
            const bodyCategorie = await resultatCategorie.json().catch((error) => {console.log(error)});
            setCategorie(bodyCategorie);
        };
        chercherCategorie();
    },[])

    useEffect(() => {
        const chercherTotalProduit = async () => {
            const resultatCount = await fetch('/api/produits/count');
            const bodyCount = await resultatCount.json().catch((error) => {console.log(error)});
            setTotalDonnees(bodyCount);
        };
        chercherTotalProduit();
    }, [categorieSelectionnee]);

    useEffect(() => {
        const options = {method: 'PUT', headers: {'Content-type' : 'application/json'}, body: JSON.stringify(categorieSelectionnee)};
        fetch('/api/produits/selectionCategorie', options);
    }, [categorieSelectionnee]);

    useEffect(() => {
        const chercherProduit = async () => {
            const resultatProduit = await fetch(`/api/produits/${decalage}/${produitsParPage}`);
            const bodyProduit = await resultatProduit.json().catch((error) => {console.log(error)});
            setDonneesAffichees(bodyProduit);
        };
        chercherProduit();
    }, [categorieSelectionnee, produitsParPage, decalage]);
    
    useEffect(() => {
        var nouveauNombrePage = Math.ceil(totalDonnees / produitsParPage);
        setNombreDePage(nouveauNombrePage);
    }, [produitsParPage, totalDonnees]);

//--------------------------------------------------------------------------------------------------------------------------------
    
    const ChangementDePage = (event, valeur) => {
        const nouvellePage = valeur;
        const nouveauDecalage = (valeur - 1) * produitsParPage;
        setPageCourante(nouvellePage);
        setDecalage(nouveauDecalage);
    };

    const SelectionCategorie = (event) => {
        const valeur = event.target.value;
        const nouvelleSelection = categorieSelectionnee.slice();
        if(nouvelleSelection.includes(valeur))
        {
            nouvelleSelection.splice(nouvelleSelection.indexOf(valeur),1);
        }
        else
        {
            nouvelleSelection.push(valeur);
        }
        setCategorieSelectionnee(nouvelleSelection);
    };

    const NBProduitsPages = (event) => {
        const nouveauNbProduitsParPage = event.target.value;
        setProduitsParPage(nouveauNbProduitsParPage)
    };

    async function AjoutPanier(index)
    {
        const produitAjoute = {
            nomClient: "jujube",
            produits:[{
                id: donneesAffichees[index].id,
                nom: donneesAffichees[index].nom,
                description: donneesAffichees[index].description,
                categorie: donneesAffichees[index].categorie,
                prixRegulier: donneesAffichees[index].prix,
                rabais: donneesAffichees[index].rabais,
                prixRabais: (donneesAffichees[index].prix - (donneesAffichees[index].prix * donneesAffichees[index].rabais / 100)).toFixed(2),
                quantite: 1
            }]
        };
        
        if(donneesAffichees[index].quantite > 0)
        {
            let clientExistant = await RecherchePanierClient(produitAjoute.nomClient);
            console.log(clientExistant);
            let optionsPost = {method: '', headers: {'' : ''}, body: JSON.stringify()};
            if(clientExistant === null || clientExistant === undefined)
            {
                optionsPost = {method: 'POST', headers: {'Content-type' : 'application/json'}, body: JSON.stringify(produitAjoute)};
            }
            else
            {
                if(clientExistant.produits.some(produit => produit.id === produitAjoute.produits[0].id))
                {
                    const index = clientExistant.produits.findIndex(produit => produit.id === produitAjoute.produits[0].id);
                    clientExistant.produits[index].quantite += 1; 
                    optionsPost = {method: 'POST', headers: {'Content-type' : 'application/json'}, body: JSON.stringify(clientExistant)};
                }
                else
                {
                    clientExistant.produits.push(produitAjoute.produits[0]);
                    optionsPost = {method: 'POST', headers: {'Content-type' : 'application/json'}, body: JSON.stringify(clientExistant)};
                }

                await fetch(`/api/panier/suppression/${clientExistant.nomClient}`, {method: 'DELETE'});
            }

            await fetch('/api/produits/ajouterAuPanier', optionsPost);
        }
        else
        {
            alert('Quantité insuffisante pour ajouter au panier');
        }
    }

    async function RecherchePanierClient(nomClient)
    {
        const rechercheClient = await fetch(`/api/panier/${nomClient}`);
        const client = await rechercheClient.json().catch((error) => {console.log(error)});
        return client;
    }

//----------------------------------------------------------------------------------------------------------------------------------
    
    return(
        <>
        <div className="col-12">
            <div className="row me-0 pe-0 border">
                <div className="col-10">
                    <h1>Liste des produits</h1>
                </div>
                <div className="col-2 form-floating pe-0">
                    <select id="ddl1" className="form-select" aria-label="produits par page" onChange={NBProduitsPages}>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                        <option value={`${totalDonnees}`}>Tout</option>
                    </select>
                    <label htmlFor="ddl1">Produits par page</label>
                </div>
            </div>
            <div className="row">
                <div className="col-auto border">
                    {categorie.map((categorie) =>
                    <div className="row my-2"> 
                        <div className="form-check">
                            <input type="checkbox" id={categorie._id} value={categorie._id} onChange={SelectionCategorie} 
                            className="form-check-input" aria-label="checkbox categorie"/>
                            <label htmlFor={categorie._id} className="form-check-label ms-2">{categorie._id}</label>
                        </div>
                    </div>)}
                </div>
                <div className="col">
                    <Table striped bordered hover aria-label="Tableau produits">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Categorie</th>                       
                                <th>Prix régulier</th>
                                <th>Rabais (%)</th>
                                <th>Prix réduit<br/>(Si applicable)</th>    
                                <th>Panier</th>                    
                            </tr>
                        </thead>
                        <tbody>
                            {donneesAffichees.map((produit, index) => 
                            <tr>
                                <td>{produit.nom}</td>
                                <td>{produit.description.substring(0,50)}...</td>
                                <td>{produit.categorie}</td>
                                <td>{produit.prix.toFixed(2)}</td>
                                <td>{produit.rabais > 0 ? produit.rabais : null}</td>
                                <td>{produit.rabais > 0 ? (produit.prix - (produit.prix * produit.rabais / 100)).toFixed(2) : produit.prix}</td>
                                <td><button type="button" className="btn btn-primary btn-sm" 
                                aria-label="btnAjouter" onClick={()=>AjoutPanier(index)}>Ajouter</button></td>
                            </tr>   
                            )}
                        </tbody>
                    </Table>
                    <Pagination count={nombreDePage} page={pageCourante} onChange={ChangementDePage}color="primary"
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default PageProduits;