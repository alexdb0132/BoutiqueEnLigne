import { MongoClient } from 'mongodb';

import 'regenerator-runtime/runtime';

 

import { AfficherPanier, ViderPanier,AjouterPanier, RetirerPanier } from './Panier';

 

describe('Rechercher Panier', () => {

    let connection, db;
    const mockUser = {
        "_id":{"oid":"60b57c39cc8bf82dd0ed0af3"},
        "nomClient": "Test",
        "panier": [{
            "nom": "MacBook pro",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 32
        }, {
            "nom": "MacBook ",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 4
        }]
    };
 

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_Test');
    });

    beforeEach(async () => {
        await db.collection('Panier').insertOne(mockUser);
    });

    afterEach(async () => {
        await db.collection('Panier').deleteOne({nomClient : "Test"});
    });

    afterAll(async () => {
        await connection.close();
    });

    test('Trouve un compte existant', async () => {

        const donneesAttendues =  [{
            "nom": "MacBook pro",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 32
        }, {
            "nom": "MacBook ",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 4
        }];
        const donneesTrouvees = await AfficherPanier(db, "Test");
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
            "nom": "MacBook pro",
            "description": "bougui bougui",
            "categorie": "ordinateur",
             "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 32
        }, {
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
        db = await connection.db('BoutiqueEnLigne_Test');
    });
 
    beforeEach(async () => {
        await db.collection('Panier').insertOne(mockUser);
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
            "nom": "testArt",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 14
        }, {
            "nom": "MacBook ",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 4
        }]
    }
    const mockArticle = {
        "nom": "testArt",
        "description": "Assumenda corrupti quaerat ipsa. Nihil in fuga nihil quo modi. Quis qui laudantium totam ratione tenetur. Quisquam magnam nobis illo aperiam et.",
        "categorie": "Generic",
        "prix": 9786.77,
        "rabais": 0,
        "quantite": 25
    }

    beforeAll(async () => {

        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_Test');
    });

 

    beforeEach(async () => {
        await db.collection('Produits').insertOne(mockArticle);
       await db.collection('Panier').insertOne(mockUser);
    });

    

    afterAll(async () => {
        await db.collection('Panier').deleteOne({nomClient : "test2"});
        await db.collection('Produits').deleteOne({nom : "testArt"});
        await connection.close();
    });

 

    test('Ajouter Item', async () => {
        const donneesAttendues =    
        {
            "_id": "60c2c9e2c75b732748410d8e",
            "nomClient": "test2",
            "panier": [{
                "nom": "testArt",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 15
            }, {
                "nom": "MacBook ",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 4
            }]
        }
        const inventaireAvant = await db.collection('Produits').findOne({nom : "testArt"});
        await AjouterPanier(db, "test2", "testArt");
        const inventaireApres = await db.collection('Produits').findOne({nom : "testArt"});
        const donneesTrouvees = await db.collection('Panier').findOne({nomClient : "test2"});      

        expect(donneesTrouvees).toEqual(donneesAttendues);
        expect(inventaireAvant.quantite).toBeGreaterThan(inventaireApres.quantite);
    });
})

describe('soustraire quantite Panier ', () => {
    let connection, db;
    const mockUser = 
    {
        "_id": "60c2c9e2c75b732748410d8e",
        "nomClient": "test2",
        "panier": [{
            "nom": "testArt1",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 32
        }, {
            "nom": "testArt1",
            "description": "bougui bougui",
            "categorie": "ordinateur",
            "prixRegulier": 1400.99,
            "rabais": 0,
            "prixRabais": 1400.99,
            "quantite": 4
        }]
    }
    const mockArticle = {
        "nom": "testArt1",
        "description": "Assumenda corrupti quaerat ipsa. Nihil in fuga nihil quo modi. Quis qui laudantium totam ratione tenetur. Quisquam magnam nobis illo aperiam et.",
        "categorie": "Generic",
        "prix": 9786.77,
        "rabais": 0,
        "quantite": 25
    }

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_Test');
    });
    beforeEach(async () => {
        await db.collection('Panier').insertOne(mockUser);
        await db.collection('Produits').insertOne(mockArticle);
    });
    afterAll(async () => {
        await db.collection('Panier').deleteOne({nomClient : "test2"});
        await db.collection('Produits').deleteOne({nom: "testArt1"});
        await connection.close();
    });

    test('Retirer Item', async () => {
        const donneesAttendues =    
        {
            "_id": "60c2c9e2c75b732748410d8e",
            "nomClient": "test2",
            "panier": [{
                "nom": "testArt1",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 31
            }, {
                "nom": "testArt1",
                "description": "bougui bougui",
                "categorie": "ordinateur",
                "prixRegulier": 1400.99,
                "rabais": 0,
                "prixRabais": 1400.99,
                "quantite": 4
            }]
        }
        const inventaireAvant = await db.collection('Produits').findOne({nom : "testArt1"});
        await RetirerPanier(db, "test2","testArt1");
        const inventaireApres = await db.collection('Produits').findOne({nom : "testArt1"});
        const donneesTrouvees = await db.collection('Panier').findOne({nomClient : "test2"});

        expect(donneesTrouvees).toEqual(donneesAttendues);
        expect(inventaireApres.quantite).toBeGreaterThan(inventaireAvant.quantite);
    });

});