module.exports = {
    /**
     *
     * @param classFile
     * @param type
     * @param error
     * @returns {{error, type: *, classError: *}}
     *
     */
    parse: function (classFile, type, error) {
        return {
            error: error.message,
            type: type,
            classError: classFile,
            status: false
        }
    }
}