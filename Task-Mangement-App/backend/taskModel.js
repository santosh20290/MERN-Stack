const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Task', Task);