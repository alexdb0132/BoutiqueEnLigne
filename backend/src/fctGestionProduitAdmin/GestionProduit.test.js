import { AfficherInventaire,  ModifierProduit } from './GestionProduit';
import { RechercherProduit } from './GestionProduit'
import {  SupprimerProduit } from './GestionProduit'
import {  AjouterProduit } from './GestionProduit'
import { FiltreParPropriete } from './GestionProduit'
import { RechercheUtilisateur } from './GestionProduit';
import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

describe('Ajouter un Produit', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({nom : "Zune"});
        await connection.close();
    });

    test('  AjouterProduit', async () => {
        const donneesAttendu = {
            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }        

         await AjouterProduit(db, donneesAttendu);
        const donneesTrouvees = await db.collection('Produit').findOne({nom : "Zune"});
        expect(donneesTrouvees).toEqual(donneesAttendu);
        })
});

describe('Supprimer un Produit', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await connection.close();
    });

    test(' SupprimerProduit', async () => {
        const donneesASupprimer = {
            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }        

        var donneesAttendu = null;
        await AjouterProduit(db, donneesASupprimer);
        await SupprimerProduit(db,donneesASupprimer)
        const donneesTrouvees = await db.collection('Produit').findOne({nom : "Zune"});
        expect(donneesTrouvees).toEqual(donneesAttendu);
        })
});

describe('Afficher Inventaire', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({nom : "Zune"});
        await connection.close();
    });

    test('AfficherInventaire', async () => {
        
        const donneesAttendu = {
            
            "nom": "Zune",
            "description":"Microsoft",
            "categorie": "electronique",
            "prix": 399.99,
            "rabais":0,
            "quantite": 1
        }        

         await AjouterProduit(db, donneesAttendu);
        const donneesTrouvees = await AfficherInventaire(db)
        expect(donneesTrouvees).toEqual([donneesAttendu]);
        })
});

describe('RechercherProduit', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({nom : "Zune"});
        await connection.close();
    });

    test('RechercherProduit', async () => {
        
        const donneesAttendu = {            
            "nom": "Zune",
            "description":"Microsoft",
            "categorie": "electronique",
            "prix": 399.99,
            "rabais":0,
            "quantite": 1
        }        

         await AjouterProduit(db, donneesAttendu);
        const donneesTrouvees = await RechercherProduit(db,donneesAttendu.nom)
        expect(donneesTrouvees).toEqual(donneesAttendu);
        })
});


describe(' ModifierProduit', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({nom : "Xbox"});
        await connection.close();
    });

    test(' ModifierProduit', async () => {
        const donnees = {            
            "nom": "Zune",
            "description":"Microsoft",
            "categorie": "electronique",
            "prix": 399.99,
            "rabais": 0,
            "quantite": 1
        }
        
        const donneeModifier = {
            "nom": "Xbox",
            "description":"Microsoft",
            "categorie": "electronique",
            "prix": 399.99,
            "rabais": 0,
            "quantite": 1
        }       
        const donneesAttendu = {
            "nom": "Xbox",
            "description":"Microsoft",
            "categorie": "electronique",
            "prix": 399.99,
            "rabais": 0,
            "quantite": 1
        }        

         await AjouterProduit(db, donnees);
        await ModifierProduit(db,donnees,donneeModifier)
        const donneesTrouvees = await RechercherProduit(db,donneeModifier.nom)
        expect(donneesTrouvees.nom).toEqual(donneesAttendu.nom);
        })
});

describe('FiltreNomAsc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreNomAsc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"nom",1)
        var donneeAttendu =  await db.collection('Produit').find().sort({nom:1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreNomDesc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreNomDesc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"nom",-1)
        var donneeAttendu =  await db.collection('Produit').find().sort({nom:-1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreDescriptionAsc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreDescriptionAsc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"description",1)
        var donneeAttendu =  await db.collection('Produit').find().sort({description:1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreDescriptionDesc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreDescriptionDesc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"description",-1)
        var donneeAttendu =  await db.collection('Produit').find().sort({description:-1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreCategorieDesc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreCategorieDesc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"categorie",-1)
        var donneeAttendu =  await db.collection('Produit').find().sort({categorie:-1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreCategorieAsc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreCategorieAsc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"categorie",1)
        var donneeAttendu =  await db.collection('Produit').find().sort({categorie:1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltrePrixAsc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltrePrixAsc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"prix",1)
        var donneeAttendu =  await db.collection('Produit').find().sort({prix:1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltrePrixDesc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltrePrixDesc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"prix",-1)
        var donneeAttendu =  await db.collection('Produit').find().sort({prix:-1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreRabaisAsc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreRabaisAsc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"rabais",1)
        var donneeAttendu =  await db.collection('Produit').find().sort({rabais:1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreRabaisDesc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreRabaisDesc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"rabais",-1)
        var donneeAttendu =  await db.collection('Produit').find().sort({rabais:-1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreQuantiteAsc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreQuantiteAsc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"quantite",1)
        var donneeAttendu =  await db.collection('Produit').find().sort({quantite:1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('FiltreQuantiteDesc', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('FiltreQuantiteDesc', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "Lecteur Numerique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await FiltreParPropriete(db,"quantite",-1)
        var donneeAttendu =  await db.collection('Produit').find().sort({quantite:-1}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('RechercheUtilisateur_Categorie', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('RechercheUtilisateur_Categorie', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "electronique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await RechercheUtilisateur(db,"electronique")
        const donneeAttendu =await db.collection('Produit').find({$text:{$search: "electronique"}}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('RechercheUtilisateur_Description', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('RechercheUtilisateur_Description', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "electronique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await RechercheUtilisateur(db,"Apple")
        const donneeAttendu =await db.collection('Produit').find({$text:{$search: "Apple"}}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});

describe('RechercheUtilisateur_Nom', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
        db = await connection.db('BoutiqueEnLigne_testGestionProduit');
    });
    afterAll(async () => {
        await db.collection('Produit').remove({});
        await connection.close();
    });

    test('RechercheUtilisateur_Nom', async () => {
        const donnee1 = {            
                "nom": "Zune",
                "description":"Microsoft",
                "categorie": "electronique",
                "prix": 399.99,
                "rabais":0,
                "quantite": 1
            }
            const donnee2 = {            
                "nom": "Ipod",
                "description":"Apple",
                "categorie": "electronique",
                "prix": 299.99,
                "rabais":5,
                "quantite": 4
            }
           

         await AjouterProduit(db, donnee1);
         await AjouterProduit(db, donnee2);
        const donneesTrouvees = await RechercheUtilisateur(db,"Zune")
        const donneeAttendu =await db.collection('Produit').find({$text:{$search: "Zune"}}).toArray()
        expect(donneesTrouvees).toEqual(donneeAttendu);
        })
});