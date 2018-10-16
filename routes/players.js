const express = require('express')
const router = express.Router()
const PlayersRepository = require('../app/repositories/PlayersRepository')
const PlayersValidator = require('../validators/PlayersValidator')

const PlayersResources = require('../app/resources/PlayersResources')

router.get('/', function(req, res) {
    PlayersRepository.list(function (response) {
        return res.send(response)
    })
})

router.post('/', PlayersValidator.validatorCreate, function(req, res) {
    PlayersValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        PlayersRepository.save(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.put('/', PlayersValidator.validatorUpdate, function(req, res) {
    PlayersValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        PlayersRepository.update(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.delete('/', PlayersValidator.validatorDelete, function(req, res) {
    PlayersValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        PlayersRepository.delete(req.query, function (response) {
            return res.send(response)
        })
    })
})

router.get('/search', function(req, res) {
    PlayersRepository.findByName(req.query, function (response) {
        return res.send(response)
    })
})

router.get('/test', function(req, res){
    PlayersResources.playersList(function (response){
        return res.send(response)
    });
})

module.exports = router
