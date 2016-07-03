var bodyParser = require('body-parser');
var express = require('express');
var favoriteRouter = express.Router();
var Favorites = require('../models/favorites');
var Verify = require('./verify');
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){
        Favorites.find({"postedBy":req.decoded._doc._id})
            .populate('postedBy')
            .populate('dishes')
            .exec(function(err,favorite){
                if(err) throw err;
                res.json(favorite);
            });
    })

    .post(Verify.verifyOrdinaryUser, function(req,res,next){
        Favorites.find({"postedBy":req.decoded._doc._id}).exec(function(err, favorite){
            if(err) throw err;
            if(favorite.length === 0){
                req.body.postedBy = req.decoded._doc._id;
                req.body.dishes = req.body._id;
                req.body._id = null;
                Favorites.create(req.body,function(err, favoriteDish){
                    if(err) throw err;
                    res.json(favoriteDish);
                });
            }else{
                var dish = favorite[0];
                dish.dishes.push(req.body._id);
                dish.save(function(err, favorite){
                    if(err) throw err;
                    res.json(favorite);
                });
            }
        });
    })

    .delete(Verify.verifyOrdinaryUser, function(req,res,next){
        Favorites.find({"postedBy":req.decoded._doc._id}).exec(function(err, favorite){
            if(err) throw err;
            if(favorite.length === 0){
                res.json(favorite);
            }else{
                if(favorite[0].dishes.length > 0){
                    favorite[0].remove(function(err, result){
                        if(err) throw err;
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        res.end("Deleted all Favorites");
                    });
                }
            }
        });
    });

favoriteRouter.route('/:dishId')
    .delete(Verify.verifyOrdinaryUser, function(req,res,next){
        Favorites.find({"postedBy":req.decoded._doc._id}).exec(function(err, favorite){
            if(err) throw err;
            var index = favorite[0].dishes.indexOf(req.params.dishId);
            if(index > -1){
                favorite[0].dishes.splice(index,1);
                favorite[0].save(function(err,favorite){
                    if(err) throw err;
                    res.json(favorite);
                });
            }
            else{
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end("No such Dish");
            }
        });
    });

module.exports = favoriteRouter;
