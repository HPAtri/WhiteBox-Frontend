<template>
    <div class="main">
    <div class="m_container">
        <h4 style="padding-left: 30px; padding-bottom: 20px;">发布帖子</h4>
      <div class="m_content">
        <el-form ref="editForm" status-icon :model="editForm" :rules="rules1"  label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="editForm.description"></el-input>
          </el-form-item>
          <el-form-item label="分类专栏" prop="type_id">
            <el-select v-model="editForm.type_id" placeholder="请选择分类专栏">
              <el-option v-for="(item,index) in getalltype" :key="index" :label="item.name" :value="item.id + ''"></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="dialog2= true" style="margin-left: 10px;">新建分类专栏</el-button>
          </el-form-item>
          <el-form-item label="发布板块" prop="flag">
            <el-select v-model="editForm.flag" placeholder="请选择文章类型，默认为杂谈">
              <el-option label="杂谈" value="杂谈"></el-option>
              <el-option label="攻略" value="攻略"></el-option>
            </el-select>
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
          <el-form-item style="margin: auto;">
            <el-button type="primary" @click="submitForm('editForm')">保存发布</el-button>
            <router-link to="/admin/allblogs">
              <el-button style="margin-left: 10px;">返回</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
  
      <el-dialog
        title="新建分类专栏"
        :visible.sync="dialog2"
        width="30%"
        >
        <el-form status-icon :model="type" ref="type" :rules="rules2" label-width="120px">
          <el-form-item label="分类专栏名" prop="name">
            <el-input v-model="type.name" placeholder="请输入要新建的分类专栏名"></el-input>
          </el-form-item>
        </el-form>
         <span slot="footer" class="dialog-footer">
            <el-button @click="dialog2 = false">取 消</el-button>
            <el-button type="primary" @click="submitType('type')">确 定</el-button>
          </span>
      </el-dialog>
    </div>
      </div>
</template>
<script>
export default {
      name: "EditBlog",
      data() {
        return {
          // id:'',
          editForm: {  //博客文章表单
            id: null,
            title: '',
            description: '',
            content: '',
            type_id: '',
            flag:'',
            published: null,
            tags:null,
          },
          oldtags:'',  //字符串类型的标签
          type:{  //分类专栏
             name:''
          },
          getalltype:[], // 所有分类专栏
          dialogFormVisible: false,  //控制发布博客对话框
          dialog2: false,  //控制新增分类专栏对话框
          rules1: {  //表单校验
            title: [
              {required: true, message: '请输入标题', trigger: 'blur'},
              {min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur'}
            ],
            description: [
              {required: true, message: '请输入摘要', trigger: 'blur'}
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

        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.editForm.tags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        },

        addNewType(){
          const _this = this 
          this.postRequest('/type/saveType',this.type).then(resp=>{
            if(resp){
              _this.type.name = ''
              this.initType()
              _this.dialog2 = false
            }
          })
        },
        //校验添加分类专栏表单
        submitType(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addNewType()
            } else {
              return false;
            }
          });
        },
        //校验博客基本内容表单
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //发布博客
                this.putRequest('/blog/updateBlog',this.editForm).then(resp=>{
                    if(resp){
                      alert("更新成功，点击确定跳转到博客列表页面!")
                      this.$router.push('/admin/allblogs')
                    }
                })
            } else {
              return false;
            }
          });
        },

      }
    }
  </script>
  
  <style>
.main{
    height: 800px;
}
.m_container{
    padding-top:25px;
    padding-bottom:25px;
    padding-right:100px;
    margin: 100px auto;
    width: 80%;
    border-radius: 20px 20px 20px 20px;
    background-color: white;
    }
.m_content{
    padding-top:20px;
    padding-left:60px;
    padding-right:100px;
    }
  </style>
  
