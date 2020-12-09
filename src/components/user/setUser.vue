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
        <el-radio-group v-model="userDetail.gender">
          <el-radio :label="0">保密</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
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
  watch: {
    show(value) {
      if (value && Object.keys(this.data).length) {
        const { gender, birthday, nickname, signature } = this.data;
        this.userDetail.gender = gender;
        this.userDetail.birthday = birthday;
        this.userDetail.nickname = nickname;
        this.userDetail.signature = signature;
      }
    }
  },
  data() {
    return {
      userDetail: {
        gender: 0,
        birthday: 0,
        nickname: 0,
        signature: 0
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
</style>
