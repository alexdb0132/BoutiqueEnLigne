import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';
import { getNombreTotalProduitsBD } from './getNombreTotalProduits';

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
        await db.collection('Produits').deleteMany({});
    });

    test('Retourne la quantité total de produits', async () => {
        let produits = await db.collection('Produits');

        const tabCategorie = [];

        const produitsInserees = [{
            _id: 1,
            nom: "tomate",
            categorie: "jaune"
        },{
            _id: 2,
            nom: "patate",
            categorie: "brun"
        },{
            _id: 3,
            nom: "banane",
            categorie: "rouge"
        },{
            _id: 4,
            nom: "poire",
            categorie: "jaune"
        }];

        await produits.insertMany(produitsInserees);

        const totalProduit = await getNombreTotalProduitsBD(db, tabCategorie);

        expect(totalProduit).toBe(4);
    });

    test('Retourne la quantité total de produits ayant leur catégorie sélectionné', async () => {
        let produits = await db.collection('Produits');

        const tabCategorie = ["jaune"];

        const produitsInserees = [{
            _id: 1,
            nom: "tomate",
            categorie: "jaune"
        },{
            _id: 2,
            nom: "patate",
            categorie: "brun"
        },{
            _id: 3,
            nom: "banane",
            categorie: "rouge"
        },{
            _id: 4,
            nom: "poire",
            categorie: "jaune"
        }];

        await produits.insertMany(produitsInserees);

        const totalProduit = await getNombreTotalProduitsBD(db, tabCategorie);

        expect(totalProduit).toBe(2);
    });
});