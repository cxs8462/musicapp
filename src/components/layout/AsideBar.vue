<template>
  <div class="AsideBar">
    <el-scrollbar style="height: 100%;">
      <div class="loginAvatar">
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
          <p>未登录</p>
        </div>
        <div @click="zx" v-else class="avatarT">
          <el-avatar :size="50" :src="My.avatarUrl"></el-avatar>
          <p>{{ My.nickname }}</p>
        </div>
      </div>
      <el-menu :default-active="RouteName" class="el-menu-vertical-side">
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
          <p style="margin: 0"><i :class="item.icon"></i>{{ item.name }}</p>
        </el-menu-item>
        <el-submenu v-for="item in subMenu" :key="item.name" :index="item.name">
          <template slot="title"
            ><i :class="item.icon"></i>{{ item.name }}</template
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
  </div>
</template>

<script>
export default {
  name: "AsideBar",
  methods: {
    zx() {
      this.$store.commit("user/setUserId", this.$store.state.myConfig.userId);
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
        },
        {
          name: "我喜欢",
          icon: "el-icon-apple"
        },
        {
          name: "MV收藏",
          icon: "el-icon-files"
        },
        {
          name: "歌单收藏",
          icon: "el-icon-s-management"
        },
        {
          name: "歌手收藏",
          icon: "el-icon-user-solid"
        }
      ],
      subMenu: [
        {
          name: "用户",
          icon: "el-icon-s-custom",
          children: [
            { name: "我创建的歌单", icon: "el-icon-s-management" },
            { name: "动态", icon: "el-icon-wind-power" },
            { name: "关注列表", icon: "el-icon-view" }
          ]
        }
      ]
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
</style>
