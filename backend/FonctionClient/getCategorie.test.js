import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import {getCategorieBD} from './getCategorie';

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

    test('Retourne toutes les catégories filtrées', async () => {
        let produits = await db.collection('Produits');

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
        const listeCategories = ["jaune", "brun", "rouge"];


        await produits.insertMany(produitsInserees);

        const listeCategoriesRecue = await getCategorieBD(db);

        listeCategoriesRecue.forEach((produit)=> {
            expect(listeCategories).toContainEqual(produit._id);
        })
    });
});