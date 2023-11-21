<template>
<div class="reg" id="reg">
	<h1>新用户注册</h1>
	<form>
		<div class="reg-field">
		<input type="text" v-model="username" placeholder="请输入账号" oninput="value=value.replace(/[^\d]/g,'')">
		<label>用户名</label>
		</div>
		<div class="reg-field">
		<input type="text" v-model="nickname" placeholder="请输入昵称">
		<label>昵称</label >
		</div>
		<div class="reg-field">
		<input type="password" v-model="pwd" placeholder="请输入密码"> 
		<label>密码</label>
		</div>
		<div class="reg-field">
		<input type="password" v-model="pwd2" placeholder="请输入密码"> 
		<label>再次输入</label>
		</div>
		<div class="reg-button">
		<b-button type="submit" @click="reg">注册</b-button>
		<router-link to="/login">已有账号，登录 ></router-link>  
		</div>
	</form>
</div>
</template>
  
<script>
import axios from "axios";
export default {
	name: 'Login',
	data(){
		return{
			username:'',
			nickname:"",
			pwd:"",
			pwd2:"",
		}
	},
	methods:{
		clearpwd(){
			this.pwd='';
			this.pwd2='';
		},
		rule(){
			if(this.pwd !=this.pwd2){
				alert("两次密码不一致");
				this.clearpwd();
				return false;
			}else{
			if(this.pwd.length>15 || this.pwd.length<8){
				this.clearpwd();
				alert("密码长度应在8到15");
				return false;
			}
			else{
				return true;
			}
		}
		},
		reg(){
			let flag=this.rule()
			let that = this
			if(flag){
				axios({
				url:"http://192.168.137.230:10086/user/register",
				method:'post',
				headers:{'accept': "application/json"},
				data:{
				account:this.username,
				userName:this.nickname,
				password:this.pwd,
			}
				}
				)
			.then(function(res){
			if(res.data.data.retCode == "0000"){
				alert("注册成功，点击确定跳转登录");
				setTimeout(function(){that.$router.push({path:"/Login"})}, 2000);
			}			
			if(res.data.data.retCode == "9901"){
				alert("用户名重复")
			}
			})
		}
	}
}
}
</script>

<style scoped>
	.reg{
		position: absolute;
		top: 52%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 600px;
		padding: 10px 40px 40px;
		background: rgba(0,0,0,.8);
		box-sizing: border-box;
		box-shadow: 0 15px 25px rgba(0,0,0,.5);
		border-radius: 10px;
	}
	
	.reg h1 {
		margin: 20px 0 50px 0;
		padding: 0;
		text-align: center;
		color: #fff;
	}
	
	.reg .reg-field {
		position: relative;
		
	}
	
	.reg .reg-field input {
		width: 100%;
		padding: 10px 0;
		font-size: 16px;
		color: #fff;
		margin-bottom: 50px;
		border: none;
		border-bottom: 1px solid #fff;
		outline: none;
		background: transparent;
	}
	
	.reg .reg-field label {
		position: absolute;
		top: 0;
		left: 0;
		letter-spacing: 1px;
		padding:  0;
		font-size: 16px;
		color: #fff;
		pointer-events: none;
		transition: .5s;		
	}
	
	.reg .reg-field input:focus ~ label,
	.reg .reg-field input:valid ~ label {
		top: -24px;
		left: 0;
		color: orange;
		font-size: 16px;
	}
	
	.reg button{
		border-color: #000;
		background-color:orange;
		color: #fff;
		width: 250px;
		padding: 10px;
		cursor: pointer;
		transition: 0s;
	}

	.reg button:hover {
		background-color: orange;
		border-color: #000;
		padding: 10px;
		cursor: pointer;
		color: #000;
		font-weight: bold;
	}

	#reg a{
		color: #fff;
		font-size: 14px;
	}

	#reg a:hover{
		color: orange;
	}

	.reg-button{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}
</style>