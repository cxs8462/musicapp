<template>
  <div class="loginBox">
    <el-dialog
      title="登入"
      :visible="$store.state.loginBox"
      width="40%"
      :show-close="true"
      @close="close"
    >
      <el-tabs v-model="activeName" type="card" stretch>
        <el-tab-pane style="padding: 20px" label="邮箱" name="email">
          <el-form
            ref="email"
            :model="email"
            :rules="emailRules"
            size="medium"
            label-width="100px"
          >
            <el-form-item label="邮箱" prop="username">
              <el-input
                v-model="email.username"
                placeholder="请输入邮箱"
                clearable
                prefix-icon="el-icon-message"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="email.password"
                placeholder="请输入密码"
                clearable
                prefix-icon="el-icon-key"
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="emailSubmit">提交</el-button>
              <el-button @click="emailReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号" name="phone">
          <el-form
            ref="phone"
            :model="phone"
            :rules="phoneRules"
            size="medium"
            label-width="100px"
            style="padding: 20px"
          >
            <el-form-item label="手机号" prop="username">
              <el-input
                v-model="phone.username"
                placeholder="请输入手机号"
                :maxlength="11"
                show-word-limit
                clearable
                prefix-icon="el-icon-mobile"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="phone.password"
                placeholder="请输入密码"
                clearable
                prefix-icon="el-icon-key"
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="phoneSubmit">提交</el-button>
              <el-button @click="phoneReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
      },
      phoneRules: {
        username: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      emailRules: {
        username: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      const obj = this.activeName === "phone" ? this.phone : this.email;
      this.$store.commit("setLoginBtn", true);
      this.$store.dispatch("login", { type: this.activeName, data: obj });
    },
    emailSubmit() {
      this.$refs["email"].validate(valid => {
        if (!valid) return;
        this.submit();
      });
    },
    emailReset() {
      this.$refs["email"].resetFields();
    },
    phoneSubmit() {
      this.$refs["phone"].validate(valid => {
        if (!valid) return;
        this.submit();
      });
    },
    phoneReset() {
      this.$refs["phone"].resetFields();
    },
    close(){
      this.$store.commit('setLoginBox',false);
    }
  }
};
</script>

<style lang="less" scoped>
.loginBox {
}
</style>
