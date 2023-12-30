<template>
    <div class="main">
    <div class="m_container">
        <h4 style="padding-bottom: 20px;">发布帖子</h4>
      <div class="m_content">
        <el-form ref="editForm" status-icon :model="editForm" :rules="rules1"  label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="分类专栏" prop="type_id">
            <el-select v-model="editForm.type" placeholder="请选择分类专栏">
              <el-option v-for="(item,index) in getalltype" :key="index" :label="item.name" :value="item.id + ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布板块" prop="flag">
            <el-radio v-model="editForm.flag" label="2">杂谈</el-radio>
            <el-radio v-model="editForm.flag" label="3">攻略</el-radio>
          </el-form-item>
          <el-form-item label="发布形式" prop="published">
            <el-select v-model="editForm.published" placeholder="请选择发布形式，默认为私密">
              <el-option label="私密" value="false"></el-option>
              <el-option label="公开" value="true"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <mavon-editor v-model="editForm.content"/>
          </el-form-item>
          <el-switch v-model="editForm.original" active-text="原创" inactive-text="转载">
        </el-switch>
          <el-form-item style="margin: auto; padding-top: 20px;">
            <el-button type="primary" @click="submitForm()">保存发布</el-button>
            <router-link to="/admin/allblogs">
              <el-button style="margin-left: 10px;">返回</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
      </div>
</template>
<script>
import axios from "axios";
export default {
      name: "EditBlog",
      data() {
        return {
          editForm: {
            id: null,
            title: '',
            content: '',
            type:'2',
            flag:'杂谈',
            original: true,
            published: null,
          },
          rules1: {  //表单校验
            title: [
              {required: true, message: '请输入标题', trigger: 'blur'},
              {min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur'}
            ],
            content: [
              {required: true, message: '请输入文章内容', trigger: 'blur'}
            ],
            type_id: [
              {required: true, message: '分类专栏不能为空', trigger: 'blur'}
            ],
            flag: [
              {required: true, message: '文章类型不能为空', trigger: 'blur'}
            ],
            published: [
              {required: true, message: '发布形式不能为空', trigger: 'blur'}
            ],
          },
          rules2:{ //表单校验
            name: [
              {required: true, message: '分类专栏名不能为空', trigger: 'blur'}
            ],
          },
          formLabelWidth: '120px' ,
          inputVisible: false,
          inputValue: '',
          btags: null,
          tblogTags: [],
        }
      },
      props:['id'],
      methods: {
        showInput() {
          this.inputVisible = true;
          this.$nextTick(
            this.$refs.saveTagInput.$refs.input.focus()
          );
        },

        submitForm() {
          const token =  localStorage.getItem("token");
          const userId =  localStorage.getItem("userId");
          axios({
          url:"http://192.168.137.44:10086/information/addarticle",
          method:'post',
          headers:{
          'accept': "application/json",
          'token':token,
          },
          data:{
            userId: userId,
            title: this.editForm.title,
            content: this.editForm.content,
            gameId:this.editForm.type,
            classification:this.editForm.flag,
            // original: this.editForm.original,
            // published: this.editForm.published,
          }})
          .then(
            alert("发布成功!")
          );
          },

        }
    }
  </script>
  
  <style>
.main{
    height: 800px;
}
.m_container{
    padding-top:30px;
    padding-bottom:25px;
    padding-left:30px;
    padding-right:30px;
    margin: 100px auto;
    width: 70%;
    border-radius: 20px 20px 20px 20px;
    background-color: white;
    }
.m_content{
    padding-top:20px;
    padding-left:60px;
    padding-right:100px;
    }
  </style>
  
