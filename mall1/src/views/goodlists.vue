<template>
    <div>
      <pageheader></pageheader>
      <breadcrumb>
        <span slot="bread">商品列表</span>
      </breadcrumb>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price " @click="sortGoods" :class="{'sort-up':!sortFlag}">
              price
              <svg class="icon icon-arrow-short"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use></svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="filtershow">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter"  :class="{'filterby-show':filterbyshow}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{cur:ischecked == 'all'}" @click="isAll">All</a></dd>

                <dd v-for="(price,index) in priceRange">
                  <a href="javascript:void(0)" :class="{cur:ischecked ==index}" @click="iscur(index)">{{price.start}} - {{price.end}}</a>
                </dd>
                
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap ">
              <div class="accessory-list col-4 ">
                <ul class="list-wrap ">
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img  v-lazy="'static/'+ item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}￥</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>
            </div>
            
          </div>
        </div>
      </div>
    <div class="md-overlay " v-show="overlayflag" @click="filtershow"></div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
    </div>  
    <div v-show="loading" class="loading">
        <img src="../assets/loading/loading-spinning-bubbles.svg" alt="">
    </div>
    <div v-show="hasfinish" class="loading">
        <span>已加载全部内容</span>
    </div>
    <!-- 模态框 -->
     <modal v-bind:mdShow="mdShow" @close="changemdshow">
        <p slot="message">
          <a href="javascript:;"  >请先登录</a> 
        </p>
        <div slot = "btnGroup">
           <a href="javascript:;" class="btn btn--m"  @click="mdShow=false">确定</a>
        </div>
    </modal>

    <modal v-bind:mdShow="hasAdded" @close="changemdshow" >
        <p slot="message">
           <a href="javascript:;"  >
            <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成功</span>
          </a> 
        </p>
        <div slot = "btnGroup">
           <a href="javascript:;" class="btn btn--m"  @click="hasAdded=false"> 继续购物</a>
           <router-link to="/cart"  class="btn btn--m">查看购物车</router-link>
        </div>
    </modal>

   

     <pagefooter></pagefooter>
    </div>
</template>
<style type="text/css">
    .loading{
       text-align: center;
    }
    .btn:hover{
      background-color: #ffe5e6;
      transition: all 0.3s ease-out;
    }
   
</style>
<script>

  import pageheader from '@/components/pageheader.vue';
  import pagefooter from '@/components/pagefooter.vue';
  import breadcrumb from '@/components/breadcrumb.vue';
  import modal from '@/components/modal.vue';
  import axios from 'axios';
    export default{
        data(){
            return {
              priceLever:'all',
              busy:false,
              loading:false,
              hasfinish:false,

              mdShow:false,
              hasAdded:false,

              goodsList:[],
              sortFlag:true,
              page:1,
              pageSize:4,
              priceRange:[
              {
                start:0,
                end:500.00,
              },
               {
                start:500.00,
                end:1000.00,
               
              },
               {
                start:1000.00,
                end:5000.00,
                
              }
              ],
              ischecked:'all',
              filterbyshow:false,
              overlayflag:false,
            }
        },
        components:{
          pageheader:pageheader,
          pagefooter,
          breadcrumb,
          modal
        },
        methods:{
          // 商品排序
          sortGoods(){
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.busy=false;
            this.getGoodsList();
          },
          // 获取商品列表
          getGoodsList(flag){
          
            var params = {
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1,
                priceLever:this.priceLever,
            };
            // 发送get请求
             axios.get("/goods/list",{params:params}).then((response) =>{
                var res = response.data;
                if(res.status=="0"){
                  if(flag){
                    // flag表示商品列表叠加
                    this.goodsList = this.goodsList.concat(res.result.list);
                    this.loading = false;
                    // this.query = true;
                    if(res.result.count < this.pageSize){
                        this.hasfinish = true;
                        this.busy = true;
                        
                    }else{
                       this.hasfinish = false;
                       this.busy = false;
                    }
                  }else{
                    this.goodsList = res.result.list;

                  }
                 
               }else{
                this.goodsList = [];
                
               }
            })
          },
          // 判断价格区间是否选中
          iscur(index){
              this.busy=false;
              this.ischecked = index;
              this.setPriceFilter(index);
            },
          isAll(){
              this.busy=false;
              this.ischecked = 'all';
              this.setPriceFilter('all')
            },
            // 小页面模式下的弹出层按钮控制
          filtershow(){
              this.filterbyshow = !this.filterbyshow; 
              this.overlayflag = !this.overlayflag;
            },
           // 无限滚动插件参数配置 
          loadMore() {
            console.log(1)
            this.busy = true;
            this.loading = true;
            this.page++;
            this.getGoodsList(true) 
            },
          // 价格过滤
          setPriceFilter(index){
            this.busy = false;
            this.priceLever = index;
            this.page = 1;
            this.getGoodsList()
          },
          // 加入购物车
          addCart(productId){
            axios.post("/goods/addCart",{"productId":productId}).then((res)=>{
              if(res.data.status =="0"){
                this.hasAdded=true;
                this.$store.commit("updateCartCount",+1)
                
              }else{
                
                this.mdShow  = true;
              };
            })
          },
          changemdshow(){
            this.mdShow = false;
            this.hasAdded = false;
          } 
        },
        mounted:function(){

            this.getGoodsList();
        },
   } 
</script>
