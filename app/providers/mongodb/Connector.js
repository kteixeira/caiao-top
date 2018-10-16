/**
 * Created by renato on 30/06/16.
 *
 * Connection Database Interceptor to MongoDB
 */

const mongoose = require('mongoose');
const app = require('../../../configs/AppConfig');

Connector = {

    /**
     * Start database connection
     */
    connect: function () {
        mongoose.connect(app.database.host + app.database.name);
        const db = mongoose.connection;
        db.on('error', function (err) {
            console.error('connection error:' + err);
        });
        db.once('open', function () {
            console.log('connected');
        });
    }
}

module.exports = Connector;


