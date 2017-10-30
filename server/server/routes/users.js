var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose')

var User = require('../modules/user.js')

require('../util/timeUtil.js')
// mongoose.connect('mongodb://localhost:27017/demo');

// //监听事件
// mongoose.connection.on("connected", function() {
//     console.log("success")
// });
// mongoose.connection.on("error", function() {
//     console.log("fail")
// });
// mongoose.connection.on("disconnected", function() {
//     console.log("disconnected")
// });

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
//   // res.render('layout');
// });

//登录接口
router.post('/login', function(req, res, next) {

    var param = {
        // post请求参数获取
        userName: req.body.userName,
        userPwd: req.body.userPwd,
    };
    User.findOne(param, function(error, doc) {
        if (error) {
            res.json({
                status: '1',
                msg: "error.message"
            });
        } else if (doc) {
            res.cookie("userId", doc.userId, {
                path: '/',
                maxAge: 1000 * 60 * 60
            });
            res.cookie("userName", doc.userName, {
                path: '/',
                maxAge: 1000 * 60 * 60
            });
            res.json({
                status: '0',
                msg: '',
                result: {
                    userName: doc.userName
                }
            });
        };
    });

});
//登出
router.post("/logout", function(req, res, next) {
    res.cookie("userId", "", {
        path: "/",
        maxAge: -1
    });
    res.json({
        status: "0",
        msg: '',
        result: ''
    });
});

//检验是否登陆
router.get("/checkLogin", function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '',
            result: req.cookies.userName ? req.cookies.userName : '',
        });
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        });
    };
});
//查询购物车
router.get("/cartList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.find({ userId: userId }, function(error, doc) {
        if (error) {
            res.json({
                status: '1',
                msg: error.message,
                result: ''
            });
        } else if (doc) {
            res.json({
                status: '0',
                msg: '',
                result:doc["0"].cartList
            });
        };
    });
});
//删除购物车数据
router.post("/cartDel", function(req, res, next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;
    User.update({"userId":userId},{$pull:{'cartList':{'productId':productId}}},function(error,doc){
    	    if (error) {
            res.json({
                status: '1',
                msg: error.message,
                result: ''
            });
        } else if (doc) {
            res.json({
                status: '0',
                msg: '',
                result:'删除成功'
            });
        };
    });
});
//改变购物车商品数量
 router.post("/cartAdd", function(req, res, next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;
    var flag = req.body.option;
   

    User.findOne({ userId: userId }, function(error1, userDoc) {
        if (error1) {
            res.json({
                status: '1',
                msg: error1.message,
            });
        }else if (userDoc) {
            let goodsItem = '';
            userDoc.cartList.forEach(function(item) {
                if (item.productId == productId) {
                    goodsItem = item;
                    if(flag=='add'){
                    	item.productNum++
                    }else if(item.productNum>1){
                    	item.productNum--
                    };
                };
            }); 
            if (goodsItem) {
                userDoc.save(function(error3, doc3) {
                    if (error3) {
                        res.json({
                            status: '1',
                            msg: error3.message
                        });
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'success'
                        });
                    };
                });
            };
        };
    });
});
//改变购物车商品选中状态
router.post("/checked", function(req, res, next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;
    var checked = req.body.checked;
    User.update({"userId":userId,'cartList.productId':productId},{
    	"cartList.$.checked":checked},
    	function(error,doc){
    	    if (error) {
            res.json({
                status: '1',
                msg: error.message,
                result: ''
            });
        } else if (doc) {
            res.json({
                status: '0',
                msg: '',
                result:'checked change'
            });
        };
    });
});
//全选切换
router.post("/toggleAll", function(req, res, next) {
    var userId = req.cookies.userId;
    var checkAll = req.body.checkAll;
    // if(req.body.checkAll == true){
    // 	checkAll = true;
    // }else{
    // 	checkAll = false;
    // };

    User.findOne({ userId: userId }, function(error1, userDoc) {
        if (error1) {
            res.json({
                status: '1',
                msg: error1.message,
                result:'',
            });
        }else if (userDoc) {
       
            userDoc.cartList.forEach(function(item) {
               item.checked = checkAll;
            }); 
            userDoc.save(function(error3, doc3) {
                if (error3) {
                    res.json({
                        status: '1',
                        msg: error3.message
                    });
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: 'success'
                    });
                };
            });
        };
        
    });
});
//查询收货地址
router.get("/address", function(req, res, next) {
    var userId = req.cookies.userId;
    
    User.findOne({"userId":userId},function(error,doc){
            if (error) {
            res.json({
                status: '1',
                msg: error.message,
                result: ''
            });
        } else if (doc) {
            res.json({
                status: '0',
                msg: '',
                result:doc.addressList
            });
        };
    });
});
//删除收货地址
router.post("/deleteAddress", function(req, res, next) {
    var userId = req.cookies.userId;
    var addressId = req.body.addressId;
    User.update({"userId":userId},{$pull:{'addressList':{'addressId':addressId}}},function(error,doc){
            if (error) {
            res.json({
                status: '1',
                msg: error.message,
                result: ''
            });
        } else if (doc) {
            res.json({
                status: '0',
                msg: '',
                result:'删除成功'
            });
        };
    });
});
//添加收货地址
router.post("/addAddress", function(req, res, next) {
    var userId = req.cookies.userId,
        userName = req.body.userName,
        streetName = req.body.streetName,
        postCode = req.body.postCode,
        tel = req.body.tel;
       
    User.findOne({ userId: userId }, function(error1, userDoc) {
        if (error1) {
            res.json({
                status: '1',
                msg: error1.message,
            })
        } else if (userDoc) {
            var addressNum = userDoc.addressList.length;
            var idHeader = '001';
            var sysDate = new Date().Format('yyyyMMddhhmmss');
            var addressId = idHeader + sysDate;
            

             if (addressNum<10) {
                var newAddress={
                    "addressId" : addressId,
                    "userName" : userName,
                    "streetName" : streetName,
                    "postCode" : postCode,
                    "tel" : tel,
                    "isDefault" : false           
                };
                userDoc.addressList.push(newAddress);
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
});
// 改变默认收货地址
router.post("/defaultAddress",function(req,res,next){
    var userId = req.cookies.userId;
    var addressId = req.body.addressId;
    User.findOne({"userId":userId},function(error,userDoc){
        if(error){
            res.json({
                status:'1',
                msg:error.message,
                result:'',
            })
        }else if(userDoc){
            userDoc.addressList.forEach(function(item){
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }
            });
            userDoc.save(function(erro,doc){
                if(error){
                    res.json({
                    status:'1',
                    msg:error.message,
                    result:'',
                    })
                }else if(doc){
                    res.json({
                    status:'0',
                    msg:'',
                    result:'设置成功',
                    })
                }
            })
        }
    })
});
//获取选中商品进行结算
router.get("/checkedGoods",function(req,res,next){
    var userId = req.cookies.userId;
    User.findOne({userId:userId},function(error,userDoc){
        if(error){
            res.json({
                status:'1',
                msg:error.message,
                result:'',
            });
        }else if(userDoc){
            var responce=[];
            userDoc.cartList.forEach(function(item){
                if(item.checked == true){
                    responce.push(item)
                }
            });
            if(responce.length>0){
                res.json({
                    status:'0',
                    msg:'',
                    result:responce,
                });
            };
        };
    });
});
// 生成订单
router.post("/payMent",function(req,res,next){
    var userId = req.cookies.userId,
        totalPrice = req.body.totalPrice,
        addressId = req.body.addressId;
        User.findOne({userId:userId},function(error,userDoc){
            if(error){
                res.json({
                    status:'1',
                    msg:error.message,
                    result:'',
                });
            }else if(userDoc){
                //获取地址信息
                var address=null;
                userDoc.addressList.forEach(function(item){
                    if(item.addressId==addressId){
                        address=item;
                    };
                });
                //获取用户购买商品
                var userGoods = [];
                userDoc.cartList.forEach(function(item){
                    if(item.checked==true){
                        userGoods.push(item);
                    };
                });
                var platform = '886';
                var r1 = Math.floor(Math.random()*10);
                var r2 = Math.floor(Math.random()*10);
                var sysDate = new Date().Format('yyyyMMddhhmmss');
                var createDate = new Date().Format('yyyy-MM-dd-hh:mm:ss');

                var orderId = platform + r1+sysDate+r2;
                var order = {
                    orderId:orderId,
                    totalPrice:totalPrice,
                    address:address,
                    orderStatus:'succsee',
                    createDate:createDate,
                };
                userDoc.orderList.push(order);
                userDoc.save(function(error,doc){
                    if(error){
                        res.json({
                            status:'1',
                            msg:error.message,
                            result:'',
                        });
                    }else if(doc){
                          res.json({
                            status:'0',
                            msg:'',
                            result:{
                                orderId:order.orderId,
                                totalPrice:order.totalPrice,
                            },
                        });
                    };
                });
            };
        });
    });


module.exports = router;