let mongoose = require('mongoose')
let {ObjectId} = mongoose.Schema

let orderSchema = new mongoose.Schema({
oderItems: [{
    type: ObjectId,
    ref:'OrderItems'
}],
user: {
    type: ObjectId,
    ref: "User"
},
total:{
    type: Number,
    required:true
},
shipping_address:{
    type: String,
    required: true
},
alternate_shipping_address:{
    type: String,
    
},
city: {
    type:String,
    required: true
},
zipcode: {
    type: String,
    required: true
},
country: {
    type: String,
    required: true
},
phone:{
    type: String,
    required: true
},
status:{
    type: String,
    required: "pending"
},
},{timestamps: true})

module.exports = mongoose.model("Order", orderSchema)