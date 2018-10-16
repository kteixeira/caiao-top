var config = {
    app_env: 'production',

    /**
     *
     */
    node_server:{
        PORT: 5000
    },
    /**
     *
     */
    socket_server:{
        PORT: 5000
    },

    direct_messages:{
        address: 'http://192.168.10.150:8089'
    },

    /**
     * Path to log file
     */
    logs: {
        path: '../',
        filename: 'application.log',
        dateFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    },

    /**
     *
     */
    database: {
        host: 'mongodb://127.0.0.1:27017/',
        name: 'old_spice_foam_zone',
        options: {
            'db': {
                'native_parser': true
            },
            'server': {
                'auto_reconnect': true,
                'poolSize': 10
            },
            'replicaset': {
                'readPreference': 'nearest',
                'strategy': 'ping',
                'rs_name': 'old_spice_foam_zone_replset'
            }
        }
    },

    /**
     *
     */
    date: {
        timezone: 'America/Sao_Paulo',
        timezone_br: 'America/Sao_Paulo',
        timezone_sf: 'America/Los_Angeles'
    },

    files: {
        pathPlayerMugshot: '../imagens-foam-zone/playersmugshots/',
        pathTeamLogo: '../imagens-foam-zone/teamslogos/',
        pathPlayerFile: '../imagens-foam-zone/playersfiles/',
        pathVignette: '../imagens-foam-zone/vignette/'
    },
}

module.exports = config