import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { EstConnectionValide } from './EstConnectionValide';

describe('Vérifier les informations de connection', () => {
    let connection, db;

    beforeAll( async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne-test');

        const informations = [
            {
                nom: "joeBine",
                motDePasse: "1234"
            },
            {
                nom: "test",
                motDePasse: "testMotDePasse"
            }
        ]
        await db.collection('InformationsClient').insertMany(informations);
    });

    afterAll( async () => {
        await db.collection('InformationsClient').deleteMany({});
        await connection.close();
    });

    test('Rechercher éléments selon les informations données en paramètres', async () => {
        const donneesInexistantes = await EstConnectionValide(db, "bob", "unAutreMotDePasse");
        const donneesExistantes = await EstConnectionValide(db, "joeBine", "1234");
        const donneesNomExistantPasMotDePasse = await EstConnectionValide(db, "joeBine", "motDePasseDifferent");
        const donneesMotDePasseExistantPasNom = await EstConnectionValide(db, "bob", "1234");

        expect(donneesInexistantes).toEqual(false);
        expect(donneesExistantes).toEqual(true);
        expect(donneesNomExistantPasMotDePasse).toEqual(false);
        expect(donneesMotDePasseExistantPasNom).toEqual(false);
    });
})