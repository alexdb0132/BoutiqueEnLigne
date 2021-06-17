import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';
import { postAjoutPanierBD } from './postAjoutPanier';

describe('insert', () => {
    let connection, db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true});
      db = await connection.db('BoutiqueEnLigne-test');
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await db.collection('Panier').deleteMany({});
    });

    test("Ajout d'un produit au panier", async () => {
        let panier = await db.collection('Panier');

        const produitAjoute = {
            _id: 1,
            nom: "asd",
            produits: [
                {
                    item: "banane",
                    categorie: "fruit",
                    prix: 2
                }
            ]
        };

        await postAjoutPanierBD(db, produitAjoute);

        const produitTrouve = await panier.findOne({nom:"asd"});

        expect(produitTrouve).toEqual(produitAjoute);
     });
});