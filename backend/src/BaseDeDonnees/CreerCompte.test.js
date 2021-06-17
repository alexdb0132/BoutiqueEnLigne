// Auteur: Philippe-Anthony Daumas
import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { CreerCompte } from './CreerCompte';
import { RechercherCompte } from './RechercherCompte';

describe('Créer un compte', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne-test');
    });

    afterAll(async () => {
        await db.collection('InformationsClient').deleteMany({});
        await connection.close();
    });

    beforeEach(async () => {
        await db.collection('InformationsClient').deleteMany({});
    });

    test('Créer un compte selon les informations données en paramètres', async () => {
        const donneesAttendues = { nom: "bob", motDePasse: "unAutreMotDePasse"}
        await CreerCompte(db, "bob", "unAutreMotDePasse");

        const donneesTrouvees = await RechercherCompte(db, "bob", "unAutreMotDePasse");
        expect(donneesTrouvees).toEqual(donneesAttendues);
    });
})