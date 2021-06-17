import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';
import { deletePanicerClientDB } from './deletePanierClient';


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

    test("Suppression d'un panier", async () => {
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

        await deletePanicerClientDB(db, "qwerty");

        const panierNonTrouve = await panier.findOne({nomClient: "qwerty"});

        expect(panierNonTrouve).toBeNull();
    })
});