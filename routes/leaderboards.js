const express = require('express')
const router = express.Router()
const LeaderboardsRepository = require('../app/repositories/LeaderboardsRepository')
const LeaderboardsValidator = require('../validators/LeaderboardsValidator')

router.get('/', function(req, res) {
    LeaderboardsRepository.list(function (response) {
        return res.send(response)
    })
})

router.post('/', LeaderboardsValidator.validatorCreate, function(req, res) {
    LeaderboardsValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        LeaderboardsRepository.save(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.put('/', LeaderboardsValidator.validatorUpdate, function(req, res) {
    LeaderboardsValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        LeaderboardsRepository.update(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.delete('/', LeaderboardsValidator.validatorDelete, function(req, res) {
    LeaderboardsValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        LeaderboardsRepository.delete(req.body, function (response) {
            return res.send(response)
        })
    })
})

module.exports = router
