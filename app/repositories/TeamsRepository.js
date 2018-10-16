/**
 * Created by Kaio on 27/08/2018.
 * Author: MediaMonks SP
 * Developer: Kaio Teixeira
 * Teams Repository
 */

const Teams = require('../models/Teams')
const Exception = require('../exceptions/ExceptionHandler')
const Response = require('./Response')
const mime = require('mime')
const fs = require('fs')
const app = require('../../configs/AppConfig');

module.exports = {
    /**
     *
     * @param response
     */
    list: function (response) {
        Teams.aggregate([
            {
                $lookup: {
                    from: 'players',
                    localField: '_id',
                    foreignField: 'team_id',
                    as: 'players'
                }
            },
            {
                $project: {
                    _id: 1,
                    name:1,
                    logo:1,
                    color:1,
                    status: 1,
                    players: {$cond: [
                            {$gt: ['$players', []]},
                            '$players',
                            [{}]
                        ]}
                }
            },
        ]).allowDiskUse(true).exec((err, teams) => {
            if(err){
                return response(Exception.parse('TeamsList', 'Teams', err))
            }

            if(teams.length < 1) {
                return response(Response.make(true, 'TeamsList', {}))
            }

            return response(Response.make(true, 'TeamsList', teams))
        });
    },

    /**
     *
     * @param object
     * @param response
     */
    save: function (object, response) {
        object.logo = this.saveLogo(object.logo);

        Teams.create(object, function (err, team) {
            if(err) {
                return response(Exception.parse('TeamsSave', 'Teams', err))
            }

            return response(Response.make(true, 'TeamsSave', team))
        });
    },

    /**
     *
     * @param object
     * @param response
     */
    update: function (object, response) {
        if(object.logo) {
            object.logo = this.saveLogo(object.logo);
        }

        Teams.findOneAndUpdate({_id: object._id}, object, { upsert: true }, function (err, team) {
            if(err) {
                return response(Exception.parse('TeamsUpdate', 'Teams', err))
            }

            return response(Response.make(true, 'TeamsUpdate', team))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    delete: function (object,response){
        Teams.findOneAndDelete({_id: object._id}, function(err, team){
            if(err) {
                return response(Exception.parse('TeamsDelete', 'Teams', err))
            }

            return response(Response.make(true, 'TeamsDelete', team))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    findByName: function (object, response) {
        Teams.find({name: new RegExp(object.name, 'i')}, function (err, teams) {
            if(err){
                return response(Exception.parse('TeamsFindByName', 'Teams', err))
            }

            return response(Response.make(true, 'TeamsFindByName', teams))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    findById: function (object, response) {
        Teams.findById(object._id, function (err, teams) {
            if(err){
                return response(Exception.parse('TeamsFindByTeam', 'Teams', err))
            }

            return response(Response.make(true, 'TeamsFindByTeam', teams))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    findByPlayer: function (object, response) {
        Teams.find({ player_a: new RegExp(object.player) }, function (err, teams) {
            if(err){
                return response(Exception.parse('TeamsFindByTeam', 'Teams', err))
            }

            return response(Response.make(true, 'TeamsFindByTeam', teams))
        }).or([{ player_b: new RegExp(object.player) } ])
    },

    saveLogo: function(objectBase64) {
        const decodedImg = this.decodeBase64Image(objectBase64);
        const imageBuffer = decodedImg.data;
        const type = decodedImg.type;
        const extension = mime.getExtension(type);
        const fileName = this.generateRandomString(12) + "." + extension;
        const pathLogo = app.files.pathTeamLogo + fileName;

        try{
            fs.writeFile(pathLogo, imageBuffer, 'utf8');

            return pathLogo;
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
    }
}
