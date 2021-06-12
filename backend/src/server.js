import express from 'express'
import { MongoClient } from 'mongodb';
import { RechercherCompte } from './BaseDeDonnees/RechercherCompte'
import { CreerCompte } from './BaseDeDonnees/CreerCompte'
import { EstInformationValide } from './VerifierInformationsCompte'
import {AfficherPanier, ViderPanier,AjouterPanier,RetirerPanier } from './fctPanier/Panier'
import {RechercherVentes} from './fctAdministrateurVente/AdminVente'
// je veux me créer un test qui vérifie si une fonction écrie dans une bd

const app = express();
app.use(express.json());

const utiliserDB = async(operations, reponse)=>{
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology: true});
        const db = client.db('BoutiqueEnLigne');
        await operations(db);
        client.close(db);
    }
    catch(erreur){
        reponse.status(500).json({message:'erreur de la connection a la base de donnes'});
    }
}

app.post("/api/creationCompte", (requete,reponse) => {
    const { nom, motDePasse } = requete.body;

    if(EstInformationValide(nom) && EstInformationValide(motDePasse)){
        utiliserDB( async (db) => {
            try{
                const donneesTrouvees = await RechercherCompte(db, nom, motDePasse);
                
                if(donneesTrouvees === null){
                    await CreerCompte(db, nom, motDePasse);

                    reponse.status(200).send("Réussi");
                }
                else{
                    reponse.status(400).send("Existe déjà");
                }
            }
            catch(erreur){
                reponse.status(500).json({message: erreur});
            }
        }, reponse)
    }
    else{
        reponse.status(400).send("400");
    }
});

app.get("/test", (requete, reponse) => {
    const { nom, motDePasse } = requete.body;
    utiliserDB( async (db) => {
        const donneesTrouvees = await RechercherInformationsCompte(db, nom, motDePasse);

        if(donneesTrouvees === {}){
            reponse.status(200).json(donneesTrouvees);
        }
        else{
            reponse.status(400).json({});
        }
    }, reponse)
})

/*----------- */

app.get('/api/client/:nom/panier', (requete,reponse) => {
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
    },reponse);
});

app.post('/api/client/:nom/panier/viderPanier', (requete,reponse) =>{
    var nomClient = requete.params.nom;
    utiliserDB(async (db) =>{
        try{
            await ViderPanier(db, nomClient);           
            reponse.status(200).send("panier vider");
        }catch(erreur){
            reponse.status(500).json({message:erreur});
        }
    },reponse);
});

app.post('/api/client/:nom/panier/ajouter/:id' ,(requete,reponse) => {
    var nomClientReq = requete.params.nom;
    var idproduitReq = parseInt(requete.params.id);
    utiliserDB(async (db) =>{
        try{
            const MessageRetour = await AjouterPanier(db,nomClientReq,idproduitReq);
            reponse.status(200).json(MessageRetour);
        }catch(erreur){
            reponse.status(500).json({message:erreur});
        }
    },reponse);
});

app.post('/api/client/:nom/panier/retirer/:id' ,(requete,reponse) => {
    var nomClientReq = requete.params.nom;
    var idproduitReq = parseInt(requete.params.id);
    utiliserDB(async (db) =>{
        try{
            await RetirerPanier(db, nomClientReq, idproduitReq);
            reponse.status(200).json("Item retirer");
        }catch(erreur){
            reponse.status(500).json({message:erreur});
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
    console.log(nouvelleVente);
        if(nouvelleVente !== undefined)
        {
            utiliserDB(async (db) => {
                await AjouterVente(db, nouvelleVente);
                reponse.status(200).send("Vente ajoute");
            }, reponse).catch(
                () => reponse.status(500).send("Erreur : la vente n'a pas ete ajoute")
            );
        }
        else
        {
            reponse.status(500).send(`certains parametres ne sont pas definis`);
        } 
});



app.listen(8000, () => console.log('Écoute le port 8000'));