import {MongoClient} from 'mongodb';

export const utiliserDB = async(operations, reponse)=>{
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology: true});
        const db = client.db('BoutiqueEnLigne');

        await operations(db);

        client.close();
    }
    catch(erreur){
        reponse.status(500).json({message:'erreur de la connection a la base de donnes'});
    }
}