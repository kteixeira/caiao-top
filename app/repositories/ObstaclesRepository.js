/**
 * Created by Kaio on 27/08/2018.
 * Author: MediaMonks SP
 * Developer: Kaio Teixeira
 * Players Repository
 */

const Obstacles = require('../models/Obstacles')
const Exception = require('../exceptions/ExceptionHandler')
const Response = require('./Response')

module.exports = {
    /**
     *
     * @param response
     */
    list: function (response) {
        Obstacles.find({}, [], {}, function (err, obstacles) {
            if(err){
                return response(Exception.parse('ObstaclesList', 'Obstacles', err))
            }

            if(obstacles.length < 1) {
                return response(Response.make(true, 'ObstaclesList', {}))
            }

            return response(Response.make(true, 'ObstaclesList', obstacles))
        }).sort( {position: 'asc'} )
    },

    /**
     *
     * @param object
     * @param response
     */
    save: function (object, response) {
        Obstacles.create(object, function (err, obstacles) {
            if(err) {
                return response(Exception.parse('ObstaclesSave', 'Obstacles', err))
            }

            return response(Response.make(true, 'ObstaclesSave', obstacles))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    update: function (object, response) {
        Obstacles.findOneAndUpdate({_id: object._id}, object, {upsert: true}, function (err, obstacles) {
            if(err) {
                return response(Exception.parse('ObstaclesUpdate', 'Obstacles', err))
            }

            return response(Response.make(true, 'ObstaclesUpdate', obstacles))
        })
    },

    /**
     *
     * @param object
     * @param response
     */
    delete: function (object, response){
        Obstacles.findOneAndDelete({_id: object._id}, function(err, obstacles){
            if(err) {
                return response(Exception.parse('ObstaclesDelete', 'Obstacles', err))
            }

            return response(Response.make(true, 'ObstaclesDelete', obstacles))
        })
    },



    /**
     *
     * @param object
     * @param response
     */
    findByName: function (object, response) {
        Obstacles.find({name: new RegExp(object.name, 'i')}, function (err, players) {
            if(err){
                return response(Exception.parse('ObstaclesFindByName', 'Obstacles', err))
            }

            return response(Response.make(true, 'ObstaclesFindByName', players))
        })
    },
}
