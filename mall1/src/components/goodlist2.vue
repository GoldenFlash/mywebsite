<template>
    <div>
      <pageheader></pageheader>
      <breadcrumb>
        <span slot="bread">goods</span>
      </breadcrumb>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="filtershow">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter"  :class="{'filterby-show':filterbyshow}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{cur:ischecked == 'all'}" @click="isAll">All</a></dd>

                <dd v-for="(price,index) in priceRange">
                  <a href="javascript:void(0)" :class="{cur:ischecked ==index}" @click="iscur(index)" >{{price.start}} - {{price.end}}</a>
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
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
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
   
    <div v-show="loading" class="loading">
        <img src="../assets/loading/loading-spinning-bubbles.svg" alt="">
    </div>
    <div v-show="hasfinish" class="loading">
        <span>已加载全部内容</span>
    </div>
     <pagefooter></pagefooter>
    </div>
</template>
<style type="text/css">
    .loading{
       text-align: center;
    }
   
</style>
<script>

  import pageheader from '@/components/pageheader.vue';
  import pagefooter from '@/components/pagefooter.vue';
  import breadcrumb from '@/components/breadcrumb.vue';
  import axios from 'axios';
    export default{
        data(){
            return {
              query:true,
              loading:false,
              hasfinish:'',
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
                end:1500.00,
                
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
          breadcrumb
         },
        
         methods:{
          unbind(){
            
              if(window.removeEventListener){
                
                 window.removeEventListener('scroll', this.handleScroll)
                
              }else{

                window.detachEvent('scroll', this.handleScroll)
              }
          },
          addScroll(){
              if(window.addEventListener){
                window.addEventListener('scroll', this.handleScroll)
                 
              }else{
                alert(1)
                window.attachEvent('scroll', this.handleScroll)
              }
                 
            },
          
          handleScroll(){
            this.hasfinish = false;
            var a = document.documentElement.clientHeight ,
                b = document.documentElement.scrollTop,
                // b = document.documentElement.scrollTop || document.body.scrollTop;
                c = document.body.clientHeight;
            var d = a+b;
                 if(d == c){
                   if(this.query){

                      this.loading = true;
                      this.page++;
                  
                       setTimeout(() => {
                         this.getGoodsList(true)
                       }, 500);
                   }
              } 
            },
  
          sortGoods(){
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList();
          },
          getGoodsList(flag){
          
            var params = {
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1,
            };
           axios.get("/goods",{params:params}).then((response) =>{
                var res = response.data;
                if(res.status=="0"){
                  if(flag){
                    this.goodsList = this.goodsList.concat(res.result.list);
                    this.loading = false;
                    this.query = true;
                    if(res.result.count < this.pageSize){
                        this.hasfinish = true;
                        this.unbind();
                    }else{
                       this.hasfinish = false;
                    }
                  }else{
                    this.goodsList = res.result.list;
                  }
                 
               }else{
                this.goodsList = [];
               }
            })
          },
          iscur(index){
              this.ischecked = index;
            },
            isAll(){
              this.ischecked = 'all';
            },
            filtershow(){
              this.filterbyshow = !this.filterbyshow; 
              this.overlayflag = !this.overlayflag;
            },
        },
          

          mounted:function(){
          alert(1)
            this.getGoodsList();
            alert(4)
            this.addScroll();
            alert(5)
            
         },
   } 
</script>
