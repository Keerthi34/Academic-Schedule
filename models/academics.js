var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var schema= new Schema({
    "School_Id" : {type:String},
    "Class_Id":{type:String},
    "Subject": {type:String},
    "Term": {type:String},
    "Description": {type:String}

    })

module.exports=mongoose.model('academics',schema);
