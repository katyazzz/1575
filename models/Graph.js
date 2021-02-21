const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    data: {type: String, required: true},
    date: {type: String},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Graph', schema)
