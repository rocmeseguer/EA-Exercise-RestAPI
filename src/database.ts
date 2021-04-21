import { connect } from 'mongoose'

export async function startConnection() {
    const db = await connect('mongodb://localhost/ea-nodejs-restapi',{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    });
    console.log('Database is connected');
}
