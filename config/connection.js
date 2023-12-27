const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_URL;

async function connection() {
    await mongoose.connect(url)
    console.log("Database is Connected")
};

connection().catch(err => console.log(err));