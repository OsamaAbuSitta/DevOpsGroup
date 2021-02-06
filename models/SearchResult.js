const mongoose = require('mongoose');

const SearchSchema = mongoose.Schema({

    Serial_Number:{
        type: Number,
        required: true
    },
    Search_Title:{
        type: String,
        required: true
    },
    Search_Link:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('SearchResult', SearchSchema);