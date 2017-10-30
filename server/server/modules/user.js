var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"orderList":[
	{
		"orderId":String,
		"totalPrice":Number,
		"address":Object,
		"orderStatus":String,
		"createDate":String,
	}
	],
	"cartList":[
		{
		"productId":String,
		"productName":String,
		"salePrice":String,
		"productImage":String,
		"checked":Boolean,
		"productNum":Number,
		}
	],
	"addressList":[
		{
		"addressId" : String,
	    "userName" : String,
	    "streetName" : String,
	    "postCode" : String,
	    "tel" : String,
	    "isDefault" : Boolean
		}
	]

});

module.exports = mongoose.model("user",userSchema);
