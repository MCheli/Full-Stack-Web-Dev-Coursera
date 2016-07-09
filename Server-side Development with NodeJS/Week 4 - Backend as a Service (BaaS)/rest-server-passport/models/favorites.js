var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dishes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }],
    },
    {
        timestamps: true
    }
);

var Favorites = mongoose.model('favorite', favoriteSchema);
module.exports = Favorites;
