import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { AfficherPanier, ViderPanier,AjouterPanier, RetirerPanier } from './Panier';

describe('Rechercher Panier', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne');
    });

    test('Trouve un compte existant', async () => {
        const donneesAttendues = [{"id":2,"nom":"MacBook pro","description":"bougui bougui","categorie":"ordinateur","prixRegulier":1400.99,"rabais":0,"prixRabais":1400.99,"quantite":32}];
        const donneesTrouvees = await AfficherPanier(db, "marc-antoine");
        expect(donneesTrouvees).toEqual(donneesAttendues);
    });

    test('Trouve un compte Inexistant', async () => {
        const donneesAttendues = null
        const donneesTrouvees = await AfficherPanier(db, "xillophone");
        expect(donneesTrouvees).toEqual(donneesAttendues);
    });
})


describe('Rechercher Vider panier ', () => {
    let connection, db;
    const mockUser = 
    {
        "nomClient": "test1",
        "panier": [{
            "id": 2,
            "nom": "MacBook pro",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 32
        }, {
            "id": 1,
            "nom": "MacBook ",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 4
        }]
    }
    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne');
    });

    beforeEach(async () => {
        await db.collection('Panier').insert(mockUser);
    });
    
    afterAll(async () => {
        await db.collection('Panier').deleteOne({nomClient : "test1"});
        await connection.close();
    });


    test('Trouve un compte existant', async () => {
        const donneesAttendues = [{}]
        await ViderPanier(db, "test1");
        const clientMock = await db.collection('Panier').findOne({nomClient : "test1"});
        const donneesTrouvees = clientMock.panier;
        expect(donneesTrouvees).toEqual(donneesAttendues);
    });
})

describe('Ajouter quantite Panier ', () => {
    let connection, db;
    const mockUser = 
    {
        "_id": "60c2c9e2c75b732748410d8e",
        "nomClient": "test2",
        "panier": [{
            "id": 2,
            "nom": "MacBook pro",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 14
        }, {
            "id": 1,
            "nom": "MacBook ",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 4
        }]
    }
    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne');
    });

    beforeEach(async () => {
        await db.collection('Panier').insert(mockUser);
    });
    
    afterAll(async () => {
        await db.collection('Panier').deleteOne({nomClient : "test2"});
        await connection.close();
    });

    test('Ajouter Item', async () => {
        const donneesAttendues =    
        {
            "_id": "60c2c9e2c75b732748410d8e",
            "nomClient": "test2",
            "panier": [{
                "id": 2,
                "nom": "MacBook pro",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 15
            }, {
                "id": 1,
                "nom": "MacBook ",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 4
            }]
        }
        await AjouterPanier(db, "test2",2);
        const donneesTrouvees = await db.collection('Panier').findOne({nomClient : "test2"});
        expect(donneesTrouvees).toEqual(donneesAttendues);
    });
})

describe('soustraire quantite Panier ', () => {
    let connection, db;
    const mockUser = 
    {
        "_id": "60c2c9e2c75b732748410d8e",
        "nomClient": "test2",
        "panier": [{
            "id": 2,
            "nom": "MacBook pro",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 32
        }, {
            "id": 1,
            "nom": "MacBook ",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 4
        }]
    }
    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne');
    });

    beforeEach(async () => {
        await db.collection('Panier').insert(mockUser);
    });
    
    afterAll(async () => {
        await db.collection('Panier').deleteOne({nomClient : "test2"});
        await connection.close();
    });

    test('Retirer Item', async () => {
        const donneesAttendues =    
        {
            "_id": "60c2c9e2c75b732748410d8e",
            "nomClient": "test2",
            "panier": [{
                "id": 2,
                "nom": "MacBook pro",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 31
            }, {
                "id": 1,
                "nom": "MacBook ",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 4
            }]
        }
        await RetirerPanier(db, "test2",2);
        const donneesTrouvees = await db.collection('Panier').findOne({nomClient : "test2"});
        expect(donneesTrouvees).toEqual(donneesAttendues);
    });
});

