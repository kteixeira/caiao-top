/**
 * Created by Kaio on 27/08/2018.
 * Author: MediaMonks SP
 * Developer: Kaio Teixeira
 * Players Repository
 */

const Players = require('../models/Players');
const Exception = require('../exceptions/ExceptionHandler');
const Response = require('./Response');
const Teams = require('../models/Teams');
const mime = require('mime');
const fs = require('fs');
const app = require('../../configs/AppConfig');

module.exports = {
    /**
     *
     * @param response
     */
    list: response => {
        Players.aggregate([
            {
                $lookup: {
                    from: 'teams',
                    localField: 'team_id',
                    foreignField: '_id',
                    as: 'teams'
                }
            },
            {
                $project: {
                    name:1,
                    mugshot:1,
                    locale:1,
                    height:1,
                    weight:1,
                    hobby:1,
                    custom: 1,
                    teams: {$cond: [
                            {$gt: ['$teams', []]},
                            '$teams',
                            [{}]
                        ]}
                }
            },
            {
                $unwind: '$teams'
            },
            {
                $project: {
                    name:1,
                    mugshot:1,
                    locale:1,
                    height:1,
                    weight:1,
                    hobby:1,
                    custom: 1,
                    team: {
                        name: '$teams.name',
                        logo: '$teams.logo',
                        color: '$teams.color',
                        status: '$teams.status'
                    },
                }
            },
        ]).allowDiskUse(true).exec((err, players) => {
            if(err){
                return response(Exception.parse('PlayersList', 'Players', err))
            }

            if(players.length < 1) {
                return response(Response.make(true, 'PlayersList', {}))
            }

            return response(Response.make(true, 'PlayersList', players))
        });
    },

    /**
     *
     * @param object
     * @param response
     */
    save: function (object, response) {
        if(object.mugshot) {
            object.mugshot = this.saveMugshot(object.mugshot);
        }

        Players.create(object, function (err, player) {
            if(err){
                return response(Exception.parse('PlayersSave', 'Players', err))
            }

            return response(Response.make(true, 'PlayersSave', player))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    update: function (object, response) {
        if(object.mugshot) {
            object.mugshot = this.saveMugshot(object.mugshot);
        }

        Players.findOneAndUpdate({_id: object._id}, object, {upsert: true}, function (err, player) {
            if(err) {
                return response(Exception.parse('PlayersUpdate', 'Players', err))
            }

            return response(Response.make(true, 'PlayersUpdate', player))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    delete: function (object, response){
        Players.findOneAndDelete({_id: object._id}, function(err, player){
            if(err) {
                return response(Exception.parse('PlayersDelete', 'Players', err))
            }

            return response(Response.make(true, 'PlayersDelete', player))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    findByName: function (object, response) {
        Players.find({name: new RegExp(object.name, 'i')}, function (err, players) {
            if(err){
                return response(Exception.parse('PlayersFindByName', 'Players', err))
            }

            return response(Response.make(true, 'PlayersFindByName', players))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    findByTeam: function (object, response) {
        Players.find({team_id: object.team_id}, function (err, players) {
            if(err){
                return response(Exception.parse('PlayersFindByTeam', 'Players', err))
            }

            return response(Response.make(true, 'PlayersFindByTeam', players))
        })
    },

    saveMugshot: function(objectBase64) {
        const decodedImg = this.decodeBase64Image(objectBase64);
        const imageBuffer = decodedImg.data;
        const type = decodedImg.type;
        const extension = mime.getExtension(type);
        const fileName = this.generateRandomString(12) + "." + extension;
        const pathMugshot = app.files.pathPlayerMugshot + fileName;

        try{
            fs.writeFile(pathMugshot, imageBuffer, 'utf8');

            return pathMugshot;
        }
        catch(err){
            console.error(err)
        }
    },

    decodeBase64Image: function(dataString) {
        const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    },

    generateRandomString: function (tamanho) {
        const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let concat = '';

        for (let i = 0; i < tamanho; i++) {
            let num = Math.floor(Math.random() * str.length);
            concat += str.substring(num, num + 1);
        }

        return concat;
    },
}
