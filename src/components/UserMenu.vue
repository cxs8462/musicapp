<template>
  <div class="UserMenu">
    <div class="userBtn" v-show="!menuShow" @click="changeMenu">
      <i class="el-icon-s-custom"></i>
    </div>
    <div class="userMenu" v-show="menuShow">
      <div class="bg" @click="leave"></div>
      <div
        class="iconBox animate__animated"
        ref="iconBox"
        :class="{ animate__zoomOut: change }"
      >
        <div
          v-for="item in menuInfo"
          class="iconItem animate__animated"
          :class="{ animate__flipInX: menuShow }"
          :style="{ background: item.meta.color }"
          :key="item.name"
          @click="()=>toGo(item.name)"
        >
          <el-tooltip effect="dark" :content="item.name" placement="left">
            <i :class="item.meta.icon"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from "@/router/index";
export default {
  name: "UserMenu",
  mounted() {
    console.log(this.$refs.iconBox);
    this.$refs.iconBox.addEventListener("animationend", e => {
      if (e.target === this.$refs.iconBox) this.menuShow = false;
    });
  },
  data() {
    return {
      menuShow: false,
      change: false
    };
  },
  computed: {
    menuInfo() {
      return routes[0].children.filter(r => r.meta.isUser);
    }
  },
  methods: {
    changeMenu() {
      this.menuShow = true;
      this.change = false;
    },
    leave() {
      this.change = true;
    },
    toGo(name){
      this.$router.push({name})
      this.change = true;
    }
  }
};
</script>

<style lang="less" scoped>
.UserMenu {
  .userBtn {
    width: 80px;
    height: 80px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: var(--header-color);
    position: fixed;
    right: 30px;
    bottom: 200px;
    cursor: pointer;
    &:hover {
      background-color: var(--selectSide-color);
    }
    i {
      font-size: 30px;
      color: white;
    }
  }
  .userMenu {
    .bg {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
    }
    .iconBox {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 800px;
      height: 350px;
      transform: translate(-50%, -50%);
      z-index: 1000;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      overflow: hidden;
    }
    .iconItem {
      width: 120px;
      height: 120px;
      display: flex;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 30px;
      i {
        font-size: 30px;
        color: white;
      }
    }
  }
}
</style>
