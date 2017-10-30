//goods路由加载数据模板
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productSchema = new schema({
	"productId":String,
	"productName":String,
	"productImage":String,
	"checked":String,
	"productNum":String,
});
module.exports = mongoose.model('good',productSchema)