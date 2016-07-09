var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promos = require('../models/promotions');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

    .get(function (req, res, next) {
        Promos.find({}, function (err, Promo) {
            if (err) throw err;
            res.json(Promo);
        })
    })

    .post(function (req, res, next) {
        Promos.create(req.body, function (err, Promo) {
            if (err) throw err;
            console.log('Promo created!');
            var id = Promo._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promo with id: ' + id);
        })
    })

    .delete(function (req, res, next) {
        Promos.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

promoRouter.route('/:promoId')
    .get(function (req, res, next) {
        Promos.findById(req.params.promoId, function(err, Promo) {
            if (err) throw err;
            res.json(Promo);
        });
    })

    .put(function (req, res, next) {
        Promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        }, function (err, Promo) {
            if (err) throw err;
            res.json(Promo);
        })
    })

    .delete(function (req, res, next) {
        Promos.findByIdAndRemove(req.params.promoId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = promoRouter;