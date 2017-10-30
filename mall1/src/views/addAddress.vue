  <template>
  <div>
  	<pageheader></pageheader>
  	  <breadcrumb>
        <span slot="bread">添加地址</span>
      </breadcrumb>
      <div class="container">
      		<label for="userName">收货人姓名</label><input type="" name="userName" 
      		v-model="userName"><br>
	      	<label for="postCode">邮政编码</label><input type="" name="postCode"
	      		v-model="postCode"><br>
	      	<label for="tel">联系电话</label><input type="" name="tel"
	      		v-model="tel"><br>
	      	<label for="streetName">地址</label><textarea name="streetName"
	      		v-model="streetName"></textarea><br>
	      	<a @click="addAddress">提交</a>
      </div>
    <modal v-bind:mdShow="submitModal" @close="changemdshow" >
        <p slot="message">
           <a href="javascript:;"  >
            <span>提交成功</span>
          </a> 
        </p>
        <div slot = "btnGroup">
           <router-link to="/address" class="btn btn--m">返回地址页</router-link>
        </div>
    </modal>
  	<pagefooter></pagefooter>
  </div>
  </template>
  <script type="text/javascript">
 	  import pageheader from '@/components/pageheader.vue';
	  import pagefooter from '@/components/pagefooter.vue';
	  import breadcrumb from '@/components/breadcrumb.vue';
	  import modal from '@/components/modal.vue';
	  import axios from 'axios';

	  export default{
	  	data(){
	  		return{
	  			addressId :'',
	            userName : '',
	            streetName : '',
	            postCode : '',
	            tel : '',
	            submitModal:'',
	            
	  		}
	  	},
	  	components:{
          pageheader:pageheader,
          pagefooter,
          breadcrumb,
          modal
      },
      methods:{
      	addAddress(){
          axios.post("/users/addAddress",{	
          	
            "userName" : this.userName,
            "streetName" : this.streetName,
            "postCode" : this.postCode,
            "tel" : this.tel,
            
	        }
	        ).then((res)=>{
	        	if(res.data.status =='0'){
	        		this.submitModal=true;
	        	}
	        });
        },
        changemdshow(){
        	this.submitModal=false;
        },
      },
	  }
  </script>
 