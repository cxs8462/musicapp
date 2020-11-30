<template>
  <div class="userInfo">
    <el-dialog
      title="用户详情"
      :visible="show"
      width="30%"
      :before-close="close"
      center
    >
      <div class="userInfoBox">
        <div class="avatar">
          <el-avatar :size="50" :src="userInfo.avatarUrl" />
          <p style="margin-left: 20px">
            {{ userInfo.nickname }}
            <span v-if="login.isLogin && login.myConfig.userId !== userId">
              <el-tag v-if="userInfo.followed" @click="qxgz">已关注</el-tag>
              <el-tag v-else @click="gz">关注</el-tag>
            </span>
          </p>
        </div>
        <div class="userContent">
          <p>签名：{{ userInfo.signature }}</p>
          <p>性别：{{ userInfo.gender === 1 ? "男" : "女" }}</p>
          <p>生日：{{ time(userInfo.birthday) }}</p>
        </div>
        <div class="tag">
          <p>
            动态：<span>{{ userInfo.eventCount }}</span>
          </p>
          <p>
            关注：<span>{{ userInfo.follows }}</span>
          </p>
          <p>
            粉丝：<span>{{ userInfo.followeds }}</span>
          </p>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="login.isLogin && login.myConfig.userId === userId"
      >
        <el-button @click="qxdl">退出登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo, gzUser, qxgzUser } from "@/api/user";
import jscookie from "js-cookie";
import format from "moment";
export default {
  name: "userInfo",
  computed: {
    userId() {
      return this.$store.state.user.userId;
    },
    login() {
      return this.$store.state;
    }
  },
  watch: {
    userId(value) {
      this.getData(value);
    }
  },
  data() {
    return {
      userInfo: {},
      show: false
    };
  },
  methods: {
    getData(id) {
      if (!id) return;
      getUserInfo(id).then(r => {
        this.userInfo = r.profile;
        this.show = true;
      });
    },
    close() {
      this.$store.commit("user/setUserId", 0);
      this.show = false;
    },
    qxdl() {
      jscookie.remove("MUSIC_U");
      this.$store.commit("setIsLogin", false);
      this.close();
    },
    time(time) {
      return format(time).format("YYYY年MM月DD日");
    },
    gz() {
      gzUser(this.userId).then(r => {
        if (r.code === 200) {
          this.$message.success(r.followTimeContent);
          r.followContent
            ? this.$notify.info({
                title: r.followTimeContent,
                message: r.followContent,
                position: "top-right"
              })
            : "";
        }
        this.getData(this.userId);
      });
    },
    qxgz() {
      qxgzUser(this.userId).then(r => {
        if(r.code === 200){
          this.$message.success("取消关注成功！")
        }
        this.getData(this.userId);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.userInfo {
  .userInfoBox {
    .avatar {
      font-size: 25px;
      display: flex;
      align-items: center;
    }
    .userContent {
      font-size: 20px;
      p {
        margin-top: 10px;
      }
    }
    .tag {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      p {
        cursor: pointer;
        &:hover {
          color: var(--selectSide-color);
        }
      }
      span {
        font-size: 25px;
      }
    }
  }
}
</style>
