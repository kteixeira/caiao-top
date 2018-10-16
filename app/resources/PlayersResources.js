
const PlayersRepository = require ('../repositories/PlayersRepository')

module.exports = {

    playersList: function (callback) {
        PlayersRepository.list(function (players) {
            let response = {
                "type": "PlayersList",
                "status": true,
                "data": []
            }

            for (let player of players.data) {
                response.data.push({
                    "id": player._id,
                    "name": player.name,
                    "mugshot": player.mugshot.replace(/^.*\//g, '')
                })
            }

            callback(response)
        })
    }

}