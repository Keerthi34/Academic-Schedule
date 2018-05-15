var mongoose=require('mongoose');
var Schema1 = mongoose.Schema;


var schema1= new Schema1({
    "School_Id" : {type:String},
    "Event_Type":{type:String},
    "Date": {type:String},
    "Description": {type:String}

})

module.exports=mongoose.model('events',schema1);
