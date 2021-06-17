import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { AfficherInventaire } from './GestionProduit';

describe('Lister Inventaire', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne');
    });

    test('Inventaire', async () => {
        const donneesTrouvees = await AfficherInventaire(db);
        expect(donneesTrouvees).not.toBeNull();
    });
})