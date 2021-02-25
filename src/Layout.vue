<template>
  <div id="layout">
    <el-container>
      <el-header class="header">
        <header-bar />
      </el-header>
      <el-container>
        <el-aside class="sider">
          <aside-bar />
        </el-aside>
        <el-main
          class="content"
          v-loading="$store.state.isLoading"
          element-loading-text="数据加载中"
          element-loading-customClass="loading"
        >
          <el-scrollbar style="height: 100%;">
            <transition name="router">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
            </transition>
            <transition name="router">
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
          </el-scrollbar>
        </el-main>
      </el-container>
      <el-footer class="footer">
        <player-mini />
      </el-footer>
    </el-container>
    <!--    全局登录框-->
    <login-box />
    //播放器
    <audio
      @ended="
        () => {
          $store.commit('player/next');
        }
      "
      ref="audioPlay"
      :src="player.selectItem.url"
      autoplay
    />
    <!--    播放器背景板-->
    <player-content />
    <!--    播放器列表-->
    <player-list
      :show="player.listShow"
      :data="player.list"
      :select="player.selectItem"
      @setSelect="setSelect"
    />
    <!--    用户信息-->
    <user-info />
    <!--    聊天室-->
    <chat />
    <!--    右键菜单-->
    <context-menu>
      <li @click="$router.forward()">前进</li>
      <li @click="$router.back()">后退</li>
    </context-menu>
    <!--    登录功能-->
    <user-menu />
  </div>
</template>

<script>
import HeaderBar from "@/components/layout/HeaderBar";
import AsideBar from "@/components/layout/AsideBar";
import loginBox from "@/components/loginBox";
import playerMini from "@/components/player/playerMini";
import playerContent from "@/components/player/PlayerContent";
import PlayerList from "@/components/playList/playerList";
import Toast from "@/until/message";
import UserInfo from "@/components/user/userInfo";
import Chat from "@/views/chat/chat";
import ContextMenu from "@/components/ContextMenu";
import UserMenu from "@/components/UserMenu";
export default {
  components: {
    UserMenu,
    ContextMenu,
    Chat,
    UserInfo,
    PlayerList,
    playerContent,
    HeaderBar,
    AsideBar,
    loginBox,
    playerMini
  },
  mounted() {
    this.$store.dispatch("getState");
    this.$store.commit("player/setPlayer", this.$refs.audioPlay);
    Toast(this);
  },
  data() {
    return {};
  },
  computed: {
    player() {
      return this.$store.state.player;
    }
  },
  methods: {
    setSelect(item) {
      this.$store.commit("player/setSelectItem", item);
    }
  }
};
</script>

<style lang="less">
* {
  transition: background-color 0.5s ease-in-out;
}
.el-dialog__wrapper,
.el-message-box,
.el-message-box__wrapper,
.el-image-viewer__wrapper {
  transition-duration: 0.3s;
}
.el-image-viewer__canvas {
  img {
    width: auto;
  }
}
#layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  --sider-color: rgb(253, 226, 226);
  --header-color: #f56c6c;
  --content-color: rgb(254, 240, 240);
  --footer-color: "#d74d45";
  --selectSide-color: #f1dcdc;
}
.header {
  height: 8vh !important;
  background-color: var(--header-color) !important;
}
.content {
  height: 84vh !important;
  padding: 10px 10px 0px 10px;
  background-color: var(--content-color) !important;
}
.sider {
  width: 16vw !important;
  height: 84vh !important;
  background-color: var(--sider-color) !important;
}
.footer {
  height: 8vh !important;
  padding: 0 !important;
  background-color: var(--footer-color) !important;
}
.el-progress-bar__outer {
  background-color: var(--selectSide-color) !important;
}
.number,
.btn-prev,
.btn-next,
.more {
  background-color: #ffffff00 !important;
}
img {
  width: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-table__row {
  cursor: pointer;
}
.el-tabs__item:hover {
  color: var(--header-color) !important;
}
.is-active {
  color: var(--header-color) !important;
}
.el-table__row {
  background-color: var(--content-color) !important;
}

.el-button:hover,
.el-button:active,
.el-button:focus {
  color: var(--header-color) !important;
  border-color: var(--selectSide-color) !important;
  background: var(--selectSide-color) !important;
}
.el-tabs__active-bar,
.el-slider__bar {
  background-color: var(--header-color) !important;
}
.volbar {
  .el-slider__button-wrapper {
    top: -0.14rem !important;
  }
}

h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
  padding: 0;
}
.fy {
  margin-top: 30px;
  text-align: right;
  li {
    font-size: 20px !important;
    margin-left: 30px !important;
    &.active {
      color: var(--header-color) !important;
    }
  }
}
.el-loading-spinner,
.el-dropdown-menu__item {
  color: var(--header-color) !important;
}
.el-loading-text {
  color: var(--header-color) !important;
}
.el-tag {
  cursor: pointer;
}
.mvAll {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .timvItem {
    width: 22%;
    margin-top: 20px;
    align-self: flex-start;
  }
}

.router-enter,.router-enter-to,.router-leave-to{
  transition: all 0.6s ease-in-out!important;
  position: absolute;
}
.router-enter{
  transform: translateX(-100%)!important;
}
.router-enter-to{
  transform: translateX(0)!important;
}
.router-leave-to{
  transform: translateX(100%)!important;
}
//.router-leave{
//  opacity: 0;
//  transform: translateX(0)!important;
//}
</style>
