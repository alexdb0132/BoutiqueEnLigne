import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';
import { getProduitsBD } from './getProduitsVoulues';

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

    test('Retourne toutes les produits', async () => {
        let produits = await db.collection('Produits');

        const decalage = 0;
        const produitParPage = 12;
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

        const listeProduits = await getProduitsBD(db, decalage, produitParPage, tabCategorie);

        listeProduits.forEach((produit)=> {
            expect(produitsInserees).toContainEqual(produit);
        })
        expect(listeProduits.length).toBe(4);
    });

    test('Retourne toutes les produits filtrés avec 1 choix de categorie', async () => {
        let produits = await db.collection('Produits');

        const decalage = 0;
        const produitParPage = 12;
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
        const produitsFiltres = [{
            _id: 1,
            nom: "tomate",
            categorie: "jaune"
        },{
            _id: 4,
            nom: "poire",
            categorie: "jaune"
        }];

        await produits.insertMany(produitsInserees);

        const listeProduits = await getProduitsBD(db, decalage, produitParPage, tabCategorie);

        listeProduits.forEach((produit)=> {
            expect(produitsFiltres).toContainEqual(produit);
        })
        expect(listeProduits.length).toBe(2);
    });

    test('Retourne toutes les produits apres un décalage de 1 (utilité de la pagination)', async () => {
        let produits = await db.collection('Produits');

        const decalage = 1;
        const produitParPage = 12;
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

        const listeProduits = await getProduitsBD(db, decalage, produitParPage, tabCategorie);

        listeProduits.forEach((produit)=> {
            expect(produitsInserees).toContainEqual(produit);
        })
        expect(listeProduits.length).toBe(3);
    });

    test('Retourne toutes les produits avec un nombre de produit par page de 3', async () => {
        let produits = await db.collection('Produits');

        const decalage = 0;
        const produitParPage = 3;
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

        const listeProduits = await getProduitsBD(db, decalage, produitParPage, tabCategorie);

        listeProduits.forEach((produit)=> {
            expect(produitsInserees).toContainEqual(produit);
        })
        expect(listeProduits.length).toBe(3);
    });
});