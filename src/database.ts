import {connect} from 'mongoose';

export async function startConnection(){
    await connect('mongodb://localhost/photo-gallery-db')
    console.log("database connected");
}