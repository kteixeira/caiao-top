
const PlayersResources = require("../resources/PlayersResources");
const TeamsResources = require("../resources/TeamsResources");

module.exports = {
    eventListener: function (event, callback) {
        switch (event.type) {
            case 'PlayersList':
                console.log("############### Teams List ###############");
                PlayersResources.playersList(function (data) {
                    return callback(data);
                });
                callback(event);
                break;

            case 'TeamsList':
                console.log("############### Teams List ###############");
                TeamsResources.teamsList(function (data) {
                    return callback(data);
                });
                callback(event);
                break;

            default:
                console.log("############### Default Event ###############");
        }
    }
}