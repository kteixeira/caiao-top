/**
 * Created by Kaio on 27/08/2018.
 * Author: MediaMonks SP
 * Developer: Kaio Teixeira
 * Players Repository
 */

const Files = require('../models/Files')
const Exception = require('../exceptions/ExceptionHandler')
const Response = require('./Response')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    /**
     * @param response
     */
    list: function (response) {
        Files.find({}, [], {}, function (err, files) {
            if(err){
                return response(Exception.parse('FilesList', 'Files', err))
            }

            if(files.length < 1) {
                return response(Response.make(true, 'Files', {}))
            }

            return response(Response.make(true, 'Files', files))
        }).sort( {_id: 'asc'} )
    },

    /**
     * @param response
     */
    listByPlayers: function (response) {
        Files.aggregate([
            {
                $match: {
                    type: false,
                }
            },
            {
                $lookup: {
                    from: 'players',
                    localField: 'player_id',
                    foreignField: '_id',
                    as: 'player'
                }
            }
        ]).allowDiskUse(true).exec((err, players) => {
            if(err) {
                return response(Exception.parse('FilesListByPlayers', 'Files', err))
            }

            if(players.length < 1) {
                return response(Response.make(true, 'FilesListByPlayers', {}))
            }

            return response(Response.make(true, 'FilesListByPlayers', players))
        });
    },

    getByPlayer: function (response, object) {
        Files.aggregate([
            {
                $match: {
                    type: false,
                    player_id: ObjectId(object.player_id)
                }
            },
            {
                $lookup: {
                    from: 'players',
                    localField: 'player_id',
                    foreignField: '_id',
                    as: 'player'
                }
            }
        ]).allowDiskUse(true).exec((err, players) => {
            if(err){
                return response(Exception.parse('FilesListByPlayers', 'Files', err))
            }

            if(players.length < 1) {
                return response(Response.make(true, 'FilesListByPlayers', {}))
            }

            return response(Response.make(true, 'FilesListByPlayers', players))
        });
    },

    /**
     * @param response
     */
    listByVignettes: function (response) {
        Files.find({type: 1}, [], {}, function (err, files) {
            if(err){
                return response(Exception.parse('FilesList', 'Files', err))
            }

            if(files.length < 1) {
                return response(Response.make(true, 'Files', {}))
            }

            return response(Response.make(true, 'Files', files))
        }).sort( {_id: 'asc'} )
    },

    /**
     * @param object
     * @param response
     */
    getById: function (object, response) {
        Files.findById(object._id, function (err, files) {
            if(err) {
                return response(Exception.parse('FilesById', 'Files', err))
            }

            return response(Response.make(true, 'Files', files))
        }).sort( {_id: 'asc'} )
    },

    /**
     * @param object
     * @param response
     */
    save: function (object, response) {
        Files.create(object, function (err, files) {
            if(err) {
                return response(Exception.parse('FilesSave', 'Files', err))
            }

            return response(Response.make(true, 'FilesSave', files))
        })
    },

    /**
     * @param object
     * @param response
     */
    update: function (object, response) {
        Files.findOneAndUpdate({_id: object._id}, object, {upsert: true}, function (err, files) {
            if(err) {
                return response(Exception.parse('FilesUpdate', 'Files', err))
            }

            return response(Response.make(true, 'FilesUpdate', files))
        })
    },

    /**
     * @param id
     * @param response
     */
    delete: function (object, response){
        Files.findOneAndDelete({_id: object._id}, function(err, files){
            if(err) {
                return response(Exception.parse('FilesDelete', 'Files', err))
            }

            return response(Response.make(true, 'FilesDelete', files))
        })
    },

    /**
     * @param object
     * @param response
     */
    findByPlayer: function (object, response) {
        Files.find({player_id: object.player_id}, function (err, files) {
            if(err){
                return response(Exception.parse('FilesFindByPlayer', 'Files', err))
            }

            return response(Response.make(true, 'FilesFindByPlayer', files))
        })
    },

    /**
     * @param object
     * @param response
     */
    findByTeam: function (object, response) {
        Files.find({team_id: object.team_id}, function (err, files) {
            if(err){
                return response(Exception.parse('FilesFindByTeam', 'Files', err))
            }

            return response(Response.make(true, 'FilesFindByTeam', files))
        })
    },
}
