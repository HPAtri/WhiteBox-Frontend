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
            <el-select
                v-model="editForm.name"
                filterable
                remote
                reserve-keyword
                placeholder="请输入游戏板块"
                :remote-method="remoteMethod"
                :loading="loading">
              <el-option
                  v-for="item in options"
                  :key="item.key"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布板块" prop="flag">
            <el-radio v-model="editForm.flag" label="2">杂谈</el-radio>
            <el-radio v-model="editForm.flag" label="3">攻略</el-radio>
          </el-form-item>
          <el-form-item label="发布形式" prop="published">
            <el-select v-model="editForm.published" placeholder="请选择发布形式">
              <el-option label="私密" value="false"></el-option>
              <el-option label="公开" value="true"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <mavon-editor
                class="mavon"
                v-model="editForm.content"
                ref=md
                @imgAdd="$imgAdd"
                :imageFilter="uploadBefore"
                />
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
export default {
  name: "EditBlog",
  data() {
    return {
      editForm: {
        title: '',
        content: '',
        name:'',
        gameId:0,
        flag:0,
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
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [],
      formLabelWidth: '120px' ,
      inputVisible: false,
      inputValue: '',
      btags: null,
      tblogTags: [],
      poslist:[]
    }
  },
  mounted() {
    this.statesinit();
    //   // 如果原始md字符串中存在曾上传的图片， 则需要将对应<img>中的src替换为base64
    //   this.$nextTick(() => {
    //     // $vm.$imgUpdateByUrl 详情见本页末尾
    //     this.$refs.md.$imgUpdateByUrl(0, base64内容);
    //   })
  },
  props:['id'],
  methods: {
    uploadBefore(f) {
      if (f.size > 7355608) {
        this.$message({
          message: "图片过大",
          type: "error"
        });
        return false;
      } else {
        return true;
      }
    },

    $imgAdd(pos, $file){
      // 将图片上传到服务器
      //this.poslist.push(pos);
      //console.log(this.poslist)
      var formdata = new FormData();
      formdata.append('image', $file);
      const token =  localStorage.getItem("token");
      this.$axios({
        url: '/picture/save',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token':token
        },
        data:formdata,
      }).then((res) => {
        // 将返回的url替换到文本原位置![...](0) -> ![...](url)
        if (res.status === 200) {
          //this.poslist.push([pos, res.data.data.url]);
          this.$refs.md.$img2Url(pos, res.data.data.url);

          // var $vm = this;
          // var md = $vm.$refs.md;
          // // 从点击“上传”按钮打开的下拉列表里删除 './${pos}' 对应的选项
          // md.$refs.toolbar_left.$imgDelByFilename(pos)

// 向点击“上传”按钮打开的下拉列表里添加新的图片选项，对应真正的的url，和文件对象
          //this.$refs.md.$refs.toolbar_left.$imgAddByFilename(res.data.data.url, $file)
        } else {
          this.$message({
            message: "图片上传失败",
            type: "error"
          }).catch(() => {
            this.$message({
              message: "图片上传失败",
              type: "error"
            });
            this.$refs.md.$img2Url(pos, "");
          });
          this.$refs.md.$img2Url(pos, "");
        }
      })
    },

    // $imgDel(pos) {
    //   const pos0 = pos[0]
    //   for (let i=0;i<this.poslist.length;i++) {
    //     if (this.poslist[i][1]===pos0){
    //       console.log("12345678")
    //       this.$refs.md.$refs.toolbar_left.$imgDelByFilename(this.poslist[i][0])
    //     }
    //       //this.$refs.md.$refs.toolbar_left.$imgDelByFilename(pos[0])
    //   }
    //   //this.$refs.md.$refs.toolbar_left.$imgDelByFilename(pos)
    //   console.log(pos)
    // },

    statesinit(){
      var arr = []
      this.$axios({
        url:"/games/querygames",
        method:'post',
        headers:{
          'accept': "application/json",
        },
        data:{
          name:"",
          limit:"0",
          page:"1",
          tagId:0,
          needTag:false,
          releaseTime:"2020-01-01 00:00:00"
        }})
          .then(res=>{
            for(var i = 0 ;i < res.data.data.GameList.length ;i++){
              arr.push({name:res.data.data.GameList[i].name,id:res.data.data.GameList[i].id});
            }
            this.states = arr
            this.list = this.states.map(item => {
              return { value: `${item.name}`,key: `${item.id}`};
            });
          })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.value.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });console.log(this.options)
        }, 200);

      } else {
        this.options = [];
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(
          this.$refs.saveTagInput.$refs.input.focus()
      );
    },
    getGameId(){
      var name = this.editForm.name;
      console.log(this.options)
      for(var i = 0 ;i < this.options.length ;i++){
        if(this.options[i].value === name){
          this.editForm.gameId = this.options[i].key;
          break
        }
      }
    },

    submitForm() {
      const token =  localStorage.getItem("token");
      const userId =  localStorage.getItem("userId");
      this.getGameId()
      this.$axios({
        url:"/information/addarticle",
        method:'post',
        headers:{
          'accept': "application/json",
          'token':token,
        },
        data:{
          userId: userId,
          title: this.editForm.title,
          content: this.editForm.content,
          gameId:this.editForm.gameId,
          classification:this.editForm.flag,
          original: this.editForm.original,
          published: this.editForm.published,
        }})
          .then((res) => {
            if (res.data.code === "2001") {
              this.$router.push({
                path:"/login",
              })
              alert(res.data.msg)
            } else {
              if (res.data.data.retCode === "0000") {
                let id = res.data.data.articleId
                this.$router.push({
                  path:"/content",
                  query:{articleId:id}
                })
                alert(res.data.data.retMsg)
              } else {
                alert(res.data.data.retMsg)
              }
            }
              }
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