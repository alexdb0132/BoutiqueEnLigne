import express from 'express'
import { MongoClient } from 'mongodb'

import { RechercherCompte } from './BaseDeDonnees/RechercherCompte'
import { CreerCompte } from './BaseDeDonnees/CreerCompte'
import { 
    AfficherPanier, 
    ViderPanier, 
    AjouterPanier, 
    RetirerPanier 
} from './fctPanier/Panier'
import {RechercherVentes} from './fctAdministrateurVente/AdminVente'
<<<<<<< HEAD
import { AfficherInventaire, ModifierProduit } from './fctGestionProduitAdmin/GestionProduit';
import { RechercherProduit } from './fctGestionProduitAdmin/GestionProduit'
import { SupprimerProduit } from './fctGestionProduitAdmin/GestionProduit'
import { AjouterProduit } from './fctGestionProduitAdmin/GestionProduit'
import { FiltreParPropriete } from './fctGestionProduitAdmin/GestionProduit'
import { RechercheUtilisateur } from './fctGestionProduitAdmin/GestionProduit';

// je veux me créer un test qui vérifie si une fonction écrie dans une bd
=======
import { EstInformationValide } from './EstInformationValide'
import { EstConnectionValide } from './BaseDeDonnees/EstConnectionValide'

import { getProduitsVoulues } from '../FonctionClient/getProduitsVoulues';
import { getCategories } from '../FonctionClient/getCategories';
import { getNombreTotalProduits } from '../FonctionClient/getNombreTotalProduits';
import { putSelectionCategorie } from '../FonctionClient/putSelectionCategorie';
import { postAjoutPanier } from '../FonctionClient/postAjoutPanier';
import { getPanierClient } from '../FonctionClient/getPanierClient';
import { deletePanierClient } from '../FonctionClient/deletePanierClient';
>>>>>>> 54e61b2bbdca72dd858300bbf98e9f89042e5422

const app = express();
app.use(express.json());

const utiliserDB = async(operations, reponse)=>{
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology: true});
        const db = client.db('BoutiqueEnLigne');

        await operations(db);

<<<<<<< HEAD
        client.close(db);
    }
    catch(erreur){
        console.log(erreur)
        reponse.status(500).json({message:'erreur de la connection a la base de donnes'});
=======
        client.close();
    }
    catch(erreur){
        reponse.status(500).json({message : 'Erreur de connexion à la base de donées', erreur});
>>>>>>> 54e61b2bbdca72dd858300bbf98e9f89042e5422
    }
}

app.post("/api/creationCompte", (requete,reponse) => {
    const { nom, motDePasse } = requete.body;

    if(EstInformationValide(nom) && EstInformationValide(motDePasse)){
        utiliserDB( async (db) => {
            const donneesTrouvees = await RechercherCompte(db, nom, motDePasse);
            
            if(donneesTrouvees === null){
                await CreerCompte(db, nom, motDePasse);

                reponse.status(200).send("Création du compte réussi!");
            }
            else{
                reponse.status(400).send("La création du compte a échouée!");
            }
        }, reponse)
    }
    else{
        reponse.status(400).send("Les informations sont invalides!");
    }
});

<<<<<<< HEAD
app.get("/api/inventaire", (requete, reponse) => {
    //const { nom, motDePasse } = requete.body;
    utiliserDB( async (db) => {
        const inventaire = await AfficherInventaire(db);

        //const donneesTrouvees = await RechercherInformationsCompte(db, nom, motDePasse);

        //if(donneesTrouvees === {}){
        if(inventaire !=null){
            console.log("inventaie")
            reponse.status(200).json(inventaire);
        }
        else{
            
            reponse.status(400).json({});
        }
    }, reponse)
})
app.get('/api/filtre/:propriete/:ordre',(requete,reponse)=>{
    utiliserDB( async (db) => {
        var filtrePropriete = requete.params.propriete;
        var ordre = requete.params.ordre;

        if(filtrePropriete !=null && ordre !=null){
           const ordrefiltre=await FiltreParPropriete(db,filtrePropriete,ordre)
            reponse.status(200).json(ordrefiltre);
        }
        else{
            
            reponse.status(400).json({});
        }
    }, reponse)
})
app.get('/api/inventaire/:id', (requete, reponse) => {
    utiliserDB( async (db) => {
        const ProduitRechercher = requete.params.id;
        const produit = await RechercherProduit(db,ProduitRechercher)

        if(produit !=null){
            reponse.status(200).json(produit);
        }
        else{
            
            reponse.status(400).json({});
        }
    }, reponse)
})
app.get('/api/inventaire/rechercheUtilisateur/:recherche', (requete, reponse) => {
    utiliserDB( async (db) => {
        const rechercheUtilisateur = requete.params.recherche;

        const resultat = await RechercheUtilisateur(db,rechercheUtilisateur)
        console.log(resultat)
        if(resultat !=null){
            reponse.status(200).json(resultat);
        }
        else{
            
            reponse.status(400).json({});
        }
    }, reponse)
=======
app.get("/api/connexion/:nom/:motDePasse", (requete, reponse) => {
    const nom = requete.params.nom;
    const motDePasse = requete.params.motDePasse;

    if(EstInformationValide(nom) && EstInformationValide(motDePasse)){
        utiliserDB( async (db) => {
            const donneesTrouvees = await EstConnectionValide(db, nom, motDePasse);
    
            if(donneesTrouvees === true){
                reponse.status(200).send("Connexion réussi!");
            }
            else{
                reponse.status(400).send("Les informations de connexion données n'existent pas!");
            }
        }, reponse)
    }
    else{
        reponse.status(400).send("Informations invalides!");
    }
>>>>>>> 54e61b2bbdca72dd858300bbf98e9f89042e5422
})
app.post('/api/inventaire/ajouter', (requete,reponse) =>{
    const produit = requete.body
    utiliserDB( async (db) => {
        if(produit === null){
            reponse.status(400).json({});
        }
        else{
            await AjouterProduit(db,produit)
            reponse.status(202).json(produit);
        }
    },reponse)
});
app.post('/api/inventaire/:id/modifier', (requete,reponse) =>{
    const nouvelleValeurs = requete.body
    const ProduitRechercher = requete.params.id;

    utiliserDB( async (db) => {
        const ProduitAModifier = await RechercherProduit(db,ProduitRechercher)
        if(ProduitAModifier === null){
            reponse.status(400).json({});
        }
        else{
            await ModifierProduit(db,ProduitAModifier,nouvelleValeurs)
            reponse.status(202).json(nouvelleValeurs);
        }
    },reponse)
   
});
app.delete('/api/inventaire/:id/supprimer',(requete,reponse) =>{
    const ProduitRechercher = requete.params.id

    utiliserDB( async (db) => {
        const ProduitASupprimer = await RechercherProduit(db,ProduitRechercher)
        console.log(ProduitASupprimer)

        if(ProduitASupprimer === null){
            reponse.status(400).json({});
        }
        else{
            await SupprimerProduit(db,ProduitASupprimer)
            reponse.status(202).json(ProduitASupprimer);
        }
    },reponse)
});
/*----------- */

app.get('/api/client/:nom/panier', (requete, reponse) => {
    var clientRechercher = requete.params.nom;

    utiliserDB(async (db) =>{
        try{
            const PanierClient = await AfficherPanier(db, clientRechercher);

            if(PanierClient === null){
                reponse.status(400).send("Client inexistant");
                
            }
            else{
                reponse.status(200).send(PanierClient);
            }
        }catch(erreur){
            reponse.status(500).json({message: erreur});
        }
    }, reponse);
});

app.post('/api/client/:nom/panier/viderPanier', (requete, reponse) =>{
    var nomClient = requete.params.nom;

    utiliserDB(async (db) =>{
        try{
            await ViderPanier(db, nomClient);           
            reponse.status(200).send("panier vider");
        }catch(erreur){
            reponse.status(500).json({message:erreur});
        }
    }, reponse);
});

app.post('/api/client/:nom/panier/ajouter/:nomItem' ,(requete,reponse) => {
    var nomClientReq = requete.params.nom;
    var nomproduitReq = requete.params.nomItem;
    utiliserDB(async (db) =>{
        try{
            const MessageRetour = await AjouterPanier(db,nomClientReq,nomproduitReq);
            if(MessageRetour === "item ajouter")
            {
                reponse.status(200).json(MessageRetour);
            }
            else
            {
                reponse.status(400).json(MessageRetour);
            }
        }catch(erreur){
            reponse.status(500).json({message:erreur});
        }
    },reponse);
});

app.post('/api/client/:nom/panier/retirer/:nomItem' ,(requete,reponse) => {
    var nomClientReq = requete.params.nom;
    var nomproduitReq = requete.params.nomItem;
    utiliserDB(async (db) =>{
        try{
            let messageRetour = await RetirerPanier(db, nomClientReq, nomproduitReq);
            reponse.status(200).json(messageRetour);
        }catch(erreur){
            reponse.status(500).json(MessageRetour);
        }
    },reponse);
});

app.get('/api/administrateur/ventes', (requete,reponse) =>{

    utiliserDB(async (db) =>{
        try{
            const ventes = await RechercherVentes(db);

            if(ventes === null){
                reponse.status(200).json("AucuneVentes");
            }
            else{
                reponse.status(200).json(ventes);
            }
        }catch(erreur){
            reponse.status(500).json({message:erreur});
        }
    },reponse);
});

app.post('/api/administrateur/ajouterVente', (requete,reponse) => {
    const nouvelleVente = requete.body;
    
        if(nouvelleVente !== undefined)
        {
            utiliserDB(async (db) => {
                const message = await AjouterVente(db, nouvelleVente);
                reponse.status(200).send(message);
            }, reponse).catch(
                () => reponse.status(500).send("Erreur : la vente n'a pas été ajoutée")
            );
        }
        else
        {
            reponse.status(500).send("Certains paramètres ne sont pas définis");
        } 
});



app.get('/api/produits/count', getNombreTotalProduits);

app.get('/api/produits/:decalage/:produitsParPage', getProduitsVoulues);

app.get('/api/produits/categories', getCategories);

app.put('/api/produits/selectionCategorie', putSelectionCategorie);

app.post('/api/produits/ajouterAuPanier', postAjoutPanier);

app.get('/api/panier/:nomClient', getPanierClient);

app.delete('/api/panier/suppression/:nomClient', deletePanierClient);

app.listen(8000, () => console.log('Écoute le port 8000'));
