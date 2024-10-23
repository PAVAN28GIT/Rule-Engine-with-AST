const mongoose = require('mongoose');


const ruleSchema = mongoose.Schema({
    ruleName : {
        type : String,
        required : true
    },
    ruleString : {
        type : String,
        required : true
    },
    ast : {
        type : Object,
        required : true
    }
}, { timestamps: true});


module.exports = mongoose.model('Rule', ruleSchema);
