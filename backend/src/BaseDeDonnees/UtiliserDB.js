import { MongoClient } from 'mongodb';

export async function UtiliserDB(p_baseDonnees, operations){
    const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology : true });
    const db = client.db(p_baseDonnees);
    await operations(db);

    client.close(db);
}
