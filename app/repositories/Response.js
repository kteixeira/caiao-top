module.exports = {
    make: function (status, type, response) {
        return {
            status: status,
            type: type,
            data: response
        }
    }
}