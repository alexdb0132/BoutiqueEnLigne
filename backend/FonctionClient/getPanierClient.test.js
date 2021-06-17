import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';
import { getPanierClientBD } from './getPanierClient';


describe('insert', () => {
    let connection, db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true});
      db = await connection.db( 'BoutiqueEnLigne-test');
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await db.collection('Panier').deleteMany({});
    });

    test("Recherche d'un panier existant", async () => {
        let panier = await db.collection('Panier');

        const produitsAjoute = [{
            _id: 1,
            nomClient: "asd",
            produits: [
                {
                    item: "banane",
                    categorie: "fruit",
                    prix: 2
                }
            ]
        },{
            _id: 2,
            nomClient: "qwerty",
            produits: [
                {
                    item: "pomme",
                    categorie: "outils",
                    prix: 4
                }
            ]
        }];

        await panier.insertMany(produitsAjoute);

        const panierTrouve = await getPanierClientBD(db, "qwerty");

        expect(panierTrouve).toEqual(produitsAjoute[1]);
    });

    test("Recherche d'un panier non existant", async () => {
        let panier = await db.collection('Panier');

        const produitsAjoute = [{
            _id: 1,
            nomClient: "asd",
            produits: [
                {
                    item: "banane",
                    categorie: "fruit",
                    prix: 2
                }
            ]
        },{
            _id: 2,
            nomClient: "qwerty",
            produits: [
                {
                    item: "pomme",
                    categorie: "outils",
                    prix: 4
                }
            ]
        }];

        await panier.insertMany(produitsAjoute);

        const panierTrouve = await getPanierClientBD(db, "bob");

        expect(panierTrouve).toBeNull();
    })
});