import express from 'express'
import { MongoClient } from 'mongodb';
import { RechercherCompte } from './BaseDeDonnees/RechercherCompte'
import { CreerCompte } from './BaseDeDonnees/CreerCompte'
import { EstInformationValide } from './VerifierInformationsCompte'

// je veux me créer un test qui vérifie si une fonction écrie dans une bd

const app = express();
app.use(express.json());

const utiliserDB = async (operations, reponse) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
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

app.listen(8000, () => console.log('Écoute le port 8000'));