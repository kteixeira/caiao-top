const TeamsRepository = require ('../repositories/TeamsRepository')

module.exports = {
    teamsList: function (callback) {
        TeamsRepository.list(function (teams) {
            let response = {
                "type":"TeamsList",
                "status":true,
                "data": [],
            }

            for (let team of teams.data) {
                let players = []

                team.players.forEach(function(player, key) {
                    players.push(player._id)
                })

                response.data.push({
                    "id": team._id,
                    "name": team.name,
                    "color": team.color,
                    "logo": team.logo.replace(/^.*\//g, ''),
                    "players": players
                })
            }

            callback(response)
        })
    },
}