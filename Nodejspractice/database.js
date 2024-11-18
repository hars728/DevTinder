//  require("mongodb");

const { MongoClient } = require('mongodb');
const url = "mongodb+srv://LearningNodejs:WoHMFdQUkAND0wXl@learningnodejs.qjzaj.mongodb.net/";

const client = new MongoClient(url);

const dbName = 'HelloWorld';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Users');

    // const datas = {
    //     firstname: 'Satyamaaaa',
    //     lastname: 'Kuamr Gupta',
    //     city: 'Hazaribagh',
    //     education: 'ug',
    //     phoneno: '0987365432'

    // }

    // create


    // const insertResult = await collection.insertMany([datas]);
    // console.log('Inserted documents =>', insertResult);

    // read 


    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);


    // delete 

    const deleteResult = await collection.deleteMany({ firstname: "Satyamaa" });
    console.log('Deleted documents =>', deleteResult);


    // Updates

    const updateResult = await collection.updateOne({ firstname: "Satyamaaaa" }, { $set: { firstname: "Satyam" } });
    console.log('Updated documents =>', updateResult);

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
