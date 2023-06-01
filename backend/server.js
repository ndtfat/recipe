const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const app = express();
dotenv.config();

// connect db
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDb');
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
routes(app);

app.listen(5000, () => {
    console.log('listening on port 5000');
});
