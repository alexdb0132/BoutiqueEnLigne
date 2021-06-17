// Auteur: Philippe-Anthony Daumas
import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { RechercherCompte } from './RechercherCompte';

describe('Rechercher des informations de connexion', () => {
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
    
    test('Rechercher un compte selon les informations données en paramètres', async () => {
        const donneesInexistantes = await RechercherCompte(db, "bob", "unAutreMotDePasse");
        const donneesExistantes = await RechercherCompte(db, "joeBine", "1234");
        const donneesNomExistantPasMotDePasse = await RechercherCompte(db, "joeBine", "motDePasseDifferent");
        const donneesMotDePasseExistantPasNom = await RechercherCompte(db, "bob", "1234");

        const donneesAttendues = {
            nom: "joeBine",
            motDePasse: "1234"
        };

        expect(donneesInexistantes).toEqual(null);
        expect(donneesExistantes).toEqual(donneesAttendues);
        expect(donneesNomExistantPasMotDePasse).toEqual(donneesAttendues);
        expect(donneesMotDePasseExistantPasNom).toEqual(donneesAttendues);
    });
})