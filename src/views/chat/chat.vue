<template>
  <div class="chat">
    <el-dialog
      title="聊天室"
      :visible.sync="show"
      width="80%"
      :before-close="handleClose"
    >
      <div class="chatmain">
        <el-row :gutter="8">
          <el-col :offset="1" :span="16">
            <el-card class="left">
              <el-scrollbar ref="chatbox" style="height: 100%;">
                <bubble
                  v-for="item in messageList"
                  :key="item.time.init"
                  v-bind="item"
                  @onDetail="onDetail"
                />
              </el-scrollbar>
            </el-card>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-card class="right">
              <el-scrollbar style="height: 60vh;">
                <avatar
                  v-for="item in personList"
                  :name="item.name"
                  :src="item.avatar"
                  :key="item.id"
                  @click.native="
                    () => {
                      zx(item.id);
                    }
                  "
                />
              </el-scrollbar>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="foot" v-if="isConnect">
        <el-input @keyup.enter.native="send" v-model="message" />
        <el-button
          @click="send"
          type="primary"
          icon="el-icon-s-promotion"
          circle
        ></el-button>
      </div>
      <div slot="footer" class="foot" v-else>
        <p><i class="el-icon-loading"></i>{{ toast }}</p>
      </div>
    </el-dialog>
    <div
      class="mini"
      v-if="!show"
      @click="mainShow"
    >
      <el-badge :hidden="toastNum === 0" :value="toastNum" class="item">
        <i class="el-icon-s-promotion"></i>
      </el-badge>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/chat/avatar";
import Bubble from "@/components/chat/bubble";
export default {
  name: "chat",
  components: { Bubble, Avatar },
  computed: {
    isLoagin() {
      return this.$store.state.isLogin;
    },
    user() {
      return this.$store.state.myConfig;
    }
  },
  watch: {
    show() {
      if (this.show) {
        if (!this.isConnect) this.toConnect();
        this.toastNum = 0;
      }
    }
  },
  data() {
    return {
      show: false,
      message: "",
      isConnect: false,
      toast: "连接中",
      messageList: [],
      personList: [],
      toastNum: 0
    };
  },
  methods: {
    mainShow() {
      if (this.isLoagin) {
        this.show = true;
      } else {
        this.$message.warning("未登录状态无法进入聊天室！");
      }
    },
    toConnect() {
      this.$socket.emit("login", {
        name: this.user.nickname,
        avatar: this.user.avatarUrl,
        id: this.user.userId
      });
    },
    handleClose() {
      console.log("close");
      this.show = false;
    },
    send() {
      if (!this.message) return;
      this.$socket.emit("message", this.message);
      this.message = "";
    },
    zx(id) {
      this.$store.commit("user/setUserId", id);
    },
    onDetail(data) {
      switch (data.type) {
        case "歌单":
          this.show = false;
          this.$router.push({ path: "/playlistdetail/" + data.id });
          break;
        case "音乐":
          this.$store.dispatch("player/getSong", data.id);
          break;
        case "歌手":
          this.show = false;
          this.$router.push({ path: "/singerdetail/" + data.id });
          break;
        case "mv":
          this.$store.commit("mv/setMvId", data.id);
          break;
      }
    }
  },
  sockets: {
    person(data) {
      console.log(data);
      this.personList = data;
    },
    enter(data) {
      this.$message.info(data);
    },
    message(data) {
      data.isSelf = data.user.id === this.user.userId;
      this.messageList.push(data);
      console.log(data);
      if (!this.show) this.toastNum++;
      this.$nextTick(() => {
        const chatbox = this.$refs.chatbox.$el.children[0];
        chatbox.scrollTo(0, chatbox.scrollHeight);
      });
    },
    loginComplete() {
      this.toast = "连接完成！";
      setTimeout(() => {
        this.isConnect = true;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.chat {
  .chatmain {
    height: 60vh;
    padding: 10px;
    .left {
      & /deep/ .el-card__body {
        height: 60vh;
      }
      height: 62vh;
      overflow-y: hidden;
    }
    .right {
      height: 62vh;
      overflow-y: hidden;
    }
  }
  .mini {
    width: 80px;
    height: 80px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: var(--header-color);
    position: fixed;
    right: 30px;
    bottom: 100px;
    cursor: pointer;
    &:hover {
      background-color: var(--selectSide-color);
    }
    i {
      font-size: 30px;
      color: white;
    }
  }
  .foot {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 30px;
    p {
      font-size: 30px;
      color: cornflowerblue;
      i {
        font-size: 30px;
      }
    }
    .el-input {
      margin: 0 20px;
    }
  }
  .big {
    transform: scale(1.3);
  }
}
</style>
