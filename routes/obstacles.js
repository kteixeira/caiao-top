const express = require('express')
const router = express.Router()
const ObstaclesRepository = require('../app/repositories/ObstaclesRepository')
const ObstaclesValidator = require('../validators/ObstaclesValidator')

router.get('/', function(req, res) {
    ObstaclesRepository.list(function (response) {
        return res.send(response)
    })
})

router.post('/', ObstaclesValidator.validatorCreate, function(req, res) {
    ObstaclesValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        ObstaclesRepository.save(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.put('/', ObstaclesValidator.validatorUpdate, function(req, res) {
    ObstaclesValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        ObstaclesRepository.update(req.body, function (response) {
            return res.send(response)
        })
    })
})

router.delete('/', ObstaclesValidator.validatorDelete, function(req, res) {
    ObstaclesValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        ObstaclesRepository.delete(req.query, function (response) {
            return res.send(response)
        })
    })
})


router.get('/search', function(req, res) {
    ObstaclesRepository.findByName(req.query, function (response) {
        return res.send(response)
    })
})


module.exports = router
