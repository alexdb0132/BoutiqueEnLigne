import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { RechercherVentes, AjouterVente } from './AdminVente';

describe('Recherchr ventes', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_Test');
    });

    test('AfficheVentes', async () => {
        const donneesTrouvees = await RechercherVentes(db,);
        expect(donneesTrouvees).not.toBeNull();
    });
})

describe('AjouterVente', () =>{
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne');
    });
    afterAll(async () => {
        await db.collection('achats').deleteOne({nomClient : "test3"});
        await connection.close();
    });

    test('AfficheVentes', async () => {
        const donneesAttendu = {
            "nomClient": "test3",
            "produits": [{
                "nom": "MacBook pro",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "quantite": 1
            }, {
                "nom": "MacBook pro",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "quantite": 1
            }]
        }

        AjouterVente(db, donneesAttendu);
        const donneesTrouvees = await db.collection('achats').findOne({nomClient : "test3"});
        expect(donneesTrouvees.nomClient).toEqual(donneesAttendu.nomClient);
        expect(donneesTrouvees.categorie).toEqual(donneesAttendu.categorie);
        expect(donneesTrouvees.prixRegulier).toEqual(donneesAttendu.prixRegulier);
        expect(donneesTrouvees.quantite).toEqual(donneesAttendu.quantite);
    });
})
