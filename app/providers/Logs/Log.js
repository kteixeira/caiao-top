/**
 * Created by renato on 22/04/2018.
 * Author: MediaMonks SP
 * Developer: Renato Sousa
 */
var app = require('../../../configs/AppConfig');

var opts = {
    logDirectory: app.logs.path ,
    fileNamePattern: app.logs.filename,
    dateFormat: app.logs.dateFormat
};
var log = require('simple-node-logger').createRollingFileLogger(opts);
module.exports = {
    /**
     * Write logs to trace anything
     * @param message
     * @param action
     */
    info: function(message, action){
        log.setLevel('info');
        log.info(message, action, ' ::: ', new Date().toJSON());
    },
    /**
     * Write logs to trace all error on the application
     * @param message
     * @param action
     */
    error: function(message, action){
        log.setLevel('warn');
        log.warn(message, action, ' ::: ', new Date().toJSON());
    }
}