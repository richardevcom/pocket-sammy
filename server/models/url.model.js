const mongoose = require('mongoose')

const UrlSchema = mongoose.Schema({
    title: String,
    url: String,
    public: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('Url', UrlSchema)