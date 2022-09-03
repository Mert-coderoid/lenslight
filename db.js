import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URL, {
        dbName : process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(`Error connecting to MongoDB: ${err}`);
    });
}


export default conn;