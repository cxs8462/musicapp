<template>
  <div class="loginBox">
    <div class="bg" @click="close" v-show="$store.state.loginBox"></div>
    <transition name="login">
      <div class="userBox" v-show="$store.state.loginBox">
        <img :src="loginBg" class="loginBg" />
        <h1>{{ loginType }}登录</h1>
        <div class="phone" v-if="activeName === 'phone'">
          <p class="loginInput">
            <label>
              <input placeholder="手机号" v-model="phone.username" />
            </label>
          </p>
          <p class="loginInput">
            <label>
              <input
                placeholder="密码"
                type="password"
                v-model="phone.password"
              />
            </label>
          </p>
        </div>
        <div class="email" v-else>
          <p class="loginInput">
            <label>
              <input placeholder="邮箱" v-model="email.username" />
            </label>
          </p>
          <p class="loginInput">
            <label>
              <input placeholder="密码" v-model="email.password" />
            </label>
          </p>
        </div>
        <p class="loginInput">
          <button class="loginBtn" @click="submit">登录</button>
        </p>
        <p class="loginInput">
          <a href="javascript:" @click="changeLoginType" class="loginChange"
            >切换{{ changeType }}登录</a
          >
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import loginBg from "@/assets/loginBg.png";
export default {
  name: "loginBox",
  computed: {
    changeType() {
      return this.activeName === "phone" ? "邮箱" : "手机";
    },
    loginType() {
      return this.activeName === "phone" ? "手机" : "邮箱";
    }
  },
  data() {
    return {
      activeName: "phone",
      loginBg,
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
      if (!this.yz(obj, this.activeName)) return;
      this.$store.commit("setLoginBtn", true);
      this.$store.dispatch("login", { type: this.activeName, data: obj });
    },
    close() {
      this.$store.commit("setLoginBox", false);
    },
    changeLoginType() {
      if (this.activeName === "phone") {
        this.activeName = "email";
      } else {
        this.activeName = "phone";
      }
    },
    yz(data, type) {
      if (type === "phone") {
        const phone = /^1(3|4|5|7|8|9)\d{9}$/;
        if (!phone.test(data.username)) {
          this.$message.warning("请输入正确的手机号！");
          return false;
        }
      } else {
        const email = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!email.test(data.username)) {
          this.$message.warning("请输入正确的邮箱！");
          return false;
        }
      }
      if (!data.password) {
        this.$message.warning("请输入密码！");
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
.loginBox {
  .bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #00000088;
    z-index: 1000;
  }
  .userBox {
    position: fixed;
    width: 30vw;
    height: 40vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    overflow: hidden;
    border-radius: 40px;
    box-shadow: 0px 0px 4px 10px #ffffff66;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 40px;
      color: white;
      margin-bottom: 20px;
    }
    .loginBg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(10px);
      z-index: -1;
    }
    .loginInput {
      padding: 10px;
      width: 20vw;
      text-align: center;
      input {
        transition: all 0.3s ease-in-out;
        width: 200px;
        height: 50px;
        border: 1px solid white;
        border-radius: 10px;
        background-color: #f39c1288;
        color: seashell;
        text-align: center;
        &:focus {
          width: 300px;
          background-color: #f39c12;
          font-size: 20px;
          color: white;
          outline: none;
          box-shadow: 0px 0px 4px 3px white;
        }
      }
      .loginBtn {
        width: 140px;
        height: 60px;
        border-radius: 10px;
        border: 0;
        color: white;
        background-color: #e67e22;
        box-shadow: 0px 0px 3px 3px #ffffff66;
        cursor: pointer;
        outline: none;
        &:hover {
          background-color: #f39c12;
        }
      }
      .loginChange {
        color: #ffffff;
      }
    }
  }
}
.login-enter,
.login-enter-to,
.login-leave-to {
  transition: all 0.3s ease-in-out;
}
.login-enter {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.1) !important;
}
.login-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1) !important;
}
.login-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.1) !important;
}
</style>
