const express = require('express')
const router = express.Router()
const TeamsRepository = require('../app/repositories/TeamsRepository')
const TeamsValidator = require('../validators/TeamsValidator')

const TeamsResources = require('../app/resources/TeamsResources')

router.get('/', function(req, res) {
    TeamsRepository.list(function (response) {
        return res.send(response)
    })
})

router.post('/', TeamsValidator.validatorCreate, function(req, res) {
    TeamsValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        TeamsRepository.save(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.put('/', TeamsValidator.validatorUpdate, function(req, res) {
    TeamsValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        TeamsRepository.update(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.delete('/', TeamsValidator.validatorDelete, function(req, res) {
    TeamsValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        TeamsRepository.delete(req.query, function (response) {
            return res.send(response)
        })
    })
})


router.get('/search', function(req, res) {
    TeamsRepository.findByName(req.query, function (response) {
        return res.send(response)
    })
})

router.get('/test', function(req, res){
    TeamsResources.teamsList(function (response){
        return res.send(response)
    });
})

module.exports = router
