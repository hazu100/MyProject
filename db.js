const mongoose = require('mongoose');
const config = require('config');

const dbUri = config.get('mongoDBUri');

const databaseConnect = () => {
    try {
        mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('Database connected..');
    }
    catch (err) {
        process.exit();
    }
};

module.exports = databaseConnect;