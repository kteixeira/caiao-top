const express = require('express')
const router = express.Router()
const FilesRepository = require('../app/repositories/FilesRepository')
const FilesValidator = require('../validators/FilesValidator')
const multer = require('multer')
const upload = multer({ dest: '/tmp/'});
const app = require('../configs/AppConfig');
const fs = require ('fs')

router.get('/', function(req, res) {
    FilesRepository.list(function (response) {
        return res.send(response)
    })
})

router.get('/player', function(req, res) {
    FilesRepository.getByPlayer(function (response) {
        return res.send(response)
    }, req.query)
})

router.get('/players', function(req, res) {
    FilesRepository.listByPlayers(function (response) {
        return res.send(response)
    })
})

router.get('/vignettes', function(req, res) {
    FilesRepository.listByVignettes(function (response) {
        return res.send(response)
    })
})

// File input field name is simply 'file'
router.post('/', upload.single('file'), function(req, res) {
    const file = app.files.pathPlayerFile + '/' + req.file.filename;

    req.body.path = file;

    fs.rename(req.file.path, file, function(err) {
        if (err) {
            return res.status(500).json({ errors: err });
        }

        FilesValidator.validate(req, res, function(validate) {
            if(validate.errors) {
                return res.status(422).json({ errors: validate.errors });
            }

            FilesRepository.save(req.body, function (response) {
                return res.send(response)
            })
        })
    });
});

router.delete('/', FilesValidator.validatorDelete, function(req, res) {
    FilesValidator.validate(req, res, function(validate) {
        if(validate.errors) {
            return res.status(422).json({ errors: validate.errors });
        }

        FilesRepository.delete(req.query, function (response) {
            return res.send(response)
        })
    })
})

module.exports = router
