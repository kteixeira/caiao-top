/**
 * Created by Kaio on 27/08/2018.
 * Author: MediaMonks SP
 * Developer: Kaio Teixeira
 * Players Repository
 */

const Leaderboard = require('../models/Leaderboard');
const Exception = require('../exceptions/ExceptionHandler');
const Response = require('./Response');

module.exports = {
    /**
     * @param response
     */
    list: function (response) {
        Leaderboard.find({}, [], {}, function (err, leaderboard) {
            if(err){
                return response(Exception.parse('LeaderboardList', 'Leaderboard', err))
            }

            if(leaderboard.length < 1) {
                return response(Response.make(true, 'LeaderboardList', {}))
            }

            return response(Response.make(true, 'LeaderboardList', leaderboard))
        }).sort( {_id: 'asc'} )
    },

    /**
     * @param object
     * @param response
     */
    save: function (object, response) {
        Leaderboard.create(object, function (err, leaderboard) {
            if(err) {
                return response(Exception.parse('LeaderboardSave', 'Leaderboard', err))
            }

            return response(Response.make(true, 'LeaderboardSave', leaderboard))
        })
    },

    /**
     * @param object
     * @param response
     */
    update: function (object, response) {
        Leaderboard.findOneAndUpdate({_id: object._id}, object, {upsert: true}, function (err, leaderboard) {
            if(err) {
                return response(Exception.parse('LeaderboardUpdate', 'Leaderboard', err))
            }

            return response(Response.make(true, 'LeaderboardUpdate', leaderboard))
        })
    },

    /**
     * @param object
     * @param response
     */
    delete: function (object, response){
        Leaderboard.findOneAndDelete({_id: object._id}, function(err, leaderboard){
            if(err) {
                return response(Exception.parse('LeaderboardDelete', 'Leaderboard', err))
            }

            return response(Response.make(true, 'LeaderboardDelete', leaderboard))
        })
    },

    /**
     * @param object
     * @param type
     * @param response
     */
    findByPlayer: function (object, response) {
        Leaderboard.find({player_id: object.player_id}, function (err, leaderboard) {
            if(err){
                return response(Exception.parse('LeaderboardFindByType', 'Leaderboard', err))
            }

            return response(Response.make(true, 'LeaderboardFindByType', leaderboard))
        })
    },

    /**
     * @param object
     * @param response
     */
    findByTeam: function (object, response) {
        Leaderboard.find({team_id: object.team_id}, function (err, leaderboard) {
            if(err){
                return response(Exception.parse('LeaderboardFindByTeam', 'Leaderboard', err))
            }

            return response(Response.make(true, 'LeaderboardFindByTeam', leaderboard))
        })
    },
}
