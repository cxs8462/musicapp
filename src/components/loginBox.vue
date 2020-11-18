<template>
  <div class="loginBox">
    <el-dialog
      title="登入"
      :visible="$store.state.loginBox"
      width="300px"
      :show-close="false"
    >
      <el-tabs v-model="activeName" type="card" stretch>
        <el-tab-pane label="邮箱" name="email">
          <div class="box">
            <el-input placeholder="邮箱" type="email" v-model="email.username">
              <i slot="prefix" class="el-icon-folder"></i>
            </el-input>
            <el-input placeholder="密码" type="password" v-model="email.password">
              <i slot="prefix" class="el-icon-unlock"></i>
            </el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="手机号" name="phone">
          <div class="box">
            <el-input placeholder="手机号码" type="phone" v-model="phone.username">
              <i slot="prefix" class="el-icon-phone"></i>
            </el-input>
            <el-input placeholder="密码" type="password" v-model="phone.password">
              <i slot="prefix" class="el-icon-unlock"></i>
            </el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="btn">
        <el-button
          :loading="$store.state.loginBtn"
          style="width: 100%;margin: 0"
          @click="submit"
          >登录</el-button
        >
        <el-button
          style="width: 100%;margin:10px 0;"
          @click="
            () => {
              $store.commit('setLoginBox', false);
            }
          "
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "loginBox",
  data() {
    return {
      activeName: "email",
      email: {
        username: "",
        password: ""
      },
      phone: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      const obj = this.activeName === "phone" ? this.phone : this.email;
      if (obj.username === "" && obj.password === "") {
        this.$message.error("不能有空！");
        return;
      } else {
        this.$store.commit("setLoginBtn",true)
        this.$store.dispatch("login", {type:this.activeName,data:obj})
      }
    }
  }
};
</script>

<style lang="less" scoped>
.loginBox {
  .box {
    padding: 20px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .btn {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    height: 100px;
  }
}
</style>
