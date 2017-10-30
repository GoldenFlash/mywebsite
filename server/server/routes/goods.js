var express = require('express');
var router = express.Router();

var Goods = require('../modules/goods.js');
var mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/demo');

//监听事件
mongoose.connection.on("connected", function() {
    console.log("success")
});
mongoose.connection.on("error", function() {
    console.log("fail")
});
mongoose.connection.on("disconnected", function() {
    console.log("disconnected")
});

router.get("/list", function(req, res, next) {
    // 获取浏览器传输过来的数据

    let page = parseInt(req.param("page"));

    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let priceLever = req.param("priceLever")
    let skip = (page - 1) * pageSize; //查找数据时需要跳过的数据条数

    let params = {}; //数据查找条件

    var priceGt = '',
        priceLte = '';

    if (priceLever != 'all') {
        switch (priceLever) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = '1000';
                priceLte = '5000';
                break;
        };
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte,
            }
        };
        // let goodsModel = Goods.find(params).skip(skip).limit(pageSize); //跳过skip条数据查询pageSize条数据
        let goodsModel = Goods.find(params); //跳过skip条数据查询pageSize条数据

        goodsModel.sort({ salePrice: sort }); //sort值为1升序-1降序salePrice不能是字符串

        goodsModel.exec(function(err, doc) {

        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            //输出数据
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                },

            });
        };
    });
    } else if(priceLever == 'all'){
        prams = {};
        let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
        goodsModel.sort({ salePrice: sort }); //sort值为1升序-1降序salePrice不能是字符串
        goodsModel.exec(function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                });
            } else {
                //输出数据
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        count: doc.length,
                        list: doc
                    },

                })
            }
        })
    };


    //查找数据

});
//加入购物车
router.post("/addCart", function(req, res, next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;
    var User = require('../modules/user.js');

    User.findOne({ userId: userId }, function(error1, userDoc) {
        if (error1) {
            res.json({
                status: '1',
                msg: error1.message,
            })
        } else if (userDoc) {
            let goodsItem = '';
            userDoc.cartList.forEach(function(item) {
                if (item.productId == productId) {
                    goodsItem = item;
                    item.productNum++;

                }
            });
            if (goodsItem) {
                userDoc.save(function(error3, doc3) {
                    if (error3) {
                        res.json({
                            status: '1',
                            msg: error3.message
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'success'
                        })
                    };
                })
            } else {
                Goods.findOne({ productId: productId }, function(error2, doc2) {
                    if (error2) {
                        res.json({
                            status: '1',
                            msg: error2.message
                        })
                    } else {
                        if (doc2) {
                            doc2.productNum = 1;
                            doc2.checked = true;
                            userDoc.cartList.push(doc2);
                            userDoc.save(function(error3, doc3) {
                                if (error3) {
                                    res.json({
                                        status: '1',
                                        msg: error3.message
                                    })
                                } else {
                                    res.json({
                                        status: '0',
                                        msg: '',
                                        result: 'success'
                                    })
                                };
                            })
                        }
                    };
                })
            }
        };
    })
});

module.exports = router;