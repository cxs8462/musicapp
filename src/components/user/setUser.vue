<template>
  <el-dialog
    title="修改资料"
    :visible="show"
    :before-close="
      () => {
        $emit('update:show', false);
      }
    "
    center
  >
    <el-form :model="userDetail" class="demo-form-inline" label-width="80px">
      <el-form-item label="头像">
        <div class="upava">
          <el-avatar :src="userDetail.avatar" :size="50" />
          >>>>>>
          <el-avatar
            @click.native="upStart"
            :src="
              userDetail.upAva.url ? userDetail.upAva.url : userDetail.avatar
            "
            :size="50"
          />
        </div>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userDetail.nickname" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="签名">
        <el-input v-model="userDetail.signature" placeholder="签名"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="userDetail.birthday"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userDetail.gender" placeholder="请选择">
          <el-option label="保密" :value="0"></el-option>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="btn">
        <el-button class="submit" @click="submit">提交</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "setUser",
  props: ["show", "data"],
  mounted() {},
  watch: {
    show(value) {
      this.userDetail.upAva = {
        url: null,
        imgSize: 0,
        formData: null
      };
      if (value && Object.keys(this.data).length) {
        const { gender, birthday, nickname, signature, avatarUrl } = this.data;
        this.userDetail.gender = gender;
        this.userDetail.birthday = birthday;
        this.userDetail.nickname = nickname;
        this.userDetail.signature = signature;
        this.userDetail.avatar = avatarUrl;
      }
    }
  },
  data() {
    return {
      userDetail: {
        gender: 0,
        birthday: 0,
        nickname: 0,
        signature: 0,
        avatar: "",
        upAva: {
          url: null,
          imgSize: 0,
          formData: null
        }
      }
    };
  },
  methods: {
    submit() {
      if (this.userDetail.nickname && this.userDetail.signature) {
        this.$emit("submit", this.userDetail);
      } else {
        this.$message.info("不能有空！");
      }
    },
    setFile(e) {
      //获取文件
      const file = e.path[0].files[0];
      //将其放入formdata中方便上传
      this.userDetail.upAva.formData = new FormData();
      this.userDetail.upAva.formData.append("imgFile", file);
      const ImgUrl = window.URL.createObjectURL(file);
      const img = new Image();
      img.src = ImgUrl;
      img.onload = () => {
        //只有在图片完成加载的时候才能拿到图片的宽高
        this.userDetail.upAva.imgSize = img.width;
      };
      this.userDetail.upAva.url = ImgUrl;
    },
    upStart() {
      //创建input
      const upload = document.createElement("input");
      //设置type为file
      upload.type = "file";
      //类型
      upload.accept = "image/png, image/jpeg";
      //添加onchange事件
      upload.onchange = this.setFile;
      //模拟点击
      upload.click();
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  text-align: center;
  margin: 10px 0;
  .submit {
    width: 100px;
  }
}
.upava {
  display: flex;
  align-items: center;
}
</style>
