<template>
  <div class="AsideBar">
    <el-scrollbar style="height: 100%;">
      <div class="loginAvatar" :class="{hideAvatar:this.$store.state.hideBar}">
        <div
          v-if="!$store.state.isLogin"
          @click="
            () => {
              $store.commit('setLoginBox', true);
            }
          "
          class="avatarT"
        >
          <el-avatar :size="40"><i class="el-icon-user"/></el-avatar>
          <p v-if="!this.$store.state.hideBar">未登录</p>
        </div>
        <div @click="zx" v-else class="avatarT">
          <el-avatar :size="40" :src="My.avatarUrl"></el-avatar>
          <p v-if="!this.$store.state.hideBar">{{ My.nickname }}</p>
          <span v-if="!this.$store.state.hideBar" @click.stop="setUser" class="set"
            ><i class="el-icon-setting"
          /></span>
        </div>
      </div>
      <el-menu :collapse="this.$store.state.hideBar" :default-active="RouteName" class="el-menu-vertical-side">
        <el-menu-item
          v-for="item in route"
          :key="item.name"
          :index="item.name"
          :class="{ itemSelect: RouteName === item.name }"
          @click="
            () => {
              RouteName === item.name ? '' : $router.push({ name: item.name });
            }
          "
          class="sideBarItem"
        >
          <i :class="item.icon"></i>
          <span style="margin: 0" slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu v-for="item in subMenu" :key="item.name" :index="item.name">
          <template slot="title"
            ><i :class="item.icon"></i><span slot="title">{{ item.name }}</span></template
          >
          <el-menu-item
            v-for="i in item.children"
            :key="i.name"
            :index="i.name"
            :class="{ itemSelect: RouteName === item.name }"
            @click="
              () => {
                RouteName === i.name ? '' : $router.push({ name: i.name });
              }
            "
            ><p style="margin: 0">
              <i :class="i.icon"></i>{{ i.name }}
            </p></el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-scrollbar>
    <set-user :show.sync="setUserShow" :data="userInfo" @submit="submit" />
  </div>
</template>

<script>
import SetUser from "@/components/user/setUser";
import { getUserInfo, setUser, upAvar } from "@/api/user";
export default {
  name: "AsideBar",
  components: { SetUser },
  methods: {
    zx() {
      this.$store.commit("user/setUserId", this.My.userId);
    },
    setUser() {
      getUserInfo(this.My.userId).then(r => {
        this.userInfo = r.profile;
        this.setUserShow = true;
      });
    },
    async submit(s) {
      const { gender, birthday, nickname, signature } = s;
      const { upAva } = s;
      const savaIni = await setUser({ gender, birthday, nickname, signature });
      if (upAva.formData) {
        const savaAva = await upAvar(upAva.imgSize, upAva.formData);
        if (savaAva.code === 200) {
          this.$message.success("修改用户头像成功！");
          this.setUserShow = false;
        }
      }
      if (savaIni.code === 200) {
        this.$message.success("修改用户信息成功！");
        this.setUserShow = false;
      }
      this.$store.dispatch("getState");
    }
  },
  data() {
    return {
      route: [
        {
          name: "首页",
          icon: "el-icon-house"
        },
        {
          name: "推荐歌单",
          icon: "el-icon-notebook-2"
        },
        {
          name: "榜单",
          icon: "el-icon-upload2"
        },
        {
          name: "全部歌手",
          icon: "el-icon-user"
        },
        {
          name: "新歌速递",
          icon: "el-icon-sort-up"
        },
        {
          name: "全部mv",
          icon: "el-icon-video-camera"
        }
      ],
      subMenu: [
        {
          name: "电台",
          icon: "el-icon-sunrise",
          children: [
            { name: "电台首页", icon: "el-icon-house" },
            { name: "全部热门电台", icon: "el-icon-upload2" }
          ]
        }
      ],
      setUserShow: false,
      userInfo: {}
    };
  },
  computed: {
    RouteName() {
      return this.$route.name;
    },
    My() {
      return this.$store.state.myConfig;
    }
  }
};
</script>

<style lang="less" scoped>
.AsideBar {
  height: 100%;
  .el-menu-vertical-side {
    background-color: var(--sider-color) !important;
    overflow: hidden;
  }
  .itemSelect {
    background-color: var(--selectSide-color) !important;
  }
  .sideBarItem {
    font-size: 17px;
    height: 50px;
    display: flex;
    align-items: center;
  }
  .loginAvatar {
    padding: 20px;
    cursor: pointer;
    .avatarT {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      position: relative;
      .set {
        position: absolute;
        right: -10px;
        top: 0;
        cursor: pointer;
        font-size: 20px;
        &:hover {
          color: var(--selectSide-color);
        }
      }
      p {
        font-size: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 180px;
        margin-left: 10px;
      }
    }
  }
}
.hideAvatar{
  padding: 5px !important;
  width: 50px !important;
  overflow: hidden;
}
</style>
