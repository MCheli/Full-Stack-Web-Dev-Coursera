var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promos = require('../models/promotions');
var Verify = require('./verify')

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Promos.find({}, function (err, Promo) {
            if (err) throw err;
            res.json(Promo);
        })
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
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

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promos.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

promoRouter.route('/:promoId')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Promos.findById(req.params.promoId, function(err, Promo) {
            if (err) throw err;
            res.json(Promo);
        });
    })

    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        }, function (err, Promo) {
            if (err) throw err;
            res.json(Promo);
        })
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promos.findByIdAndRemove(req.params.promoId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = promoRouter;