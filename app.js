import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import * as options from "./options.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
conn();

// Create Express server
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public', options.staticFilesOptions));

// ROUTES
app.use('/', pageRoute);
app.use('/photos', photoRoute);
app.use('/users', userRoute);

// START SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});