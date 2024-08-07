const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Mongoose connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect(dbConfig.url, options)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Could not connect to the database. Exiting now...', err);
        process.exit(1);
    });

mongoose.connection.on('error', err => {
    console.error('Database connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('Database connection lost. Attempting to reconnect...');
});