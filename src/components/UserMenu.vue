<template>
  <div class="UserMenu">
    <div class="userBtn" v-show="!menuShow" @click="changeMenu">
      <i class="el-icon-s-custom"></i>
    </div>
    <div class="userMenu">
      <div class="bg" @click="leave" v-show="menuShow"></div>
      <transition name="iconBoxTra">
        <div class="iconBox" ref="iconBox" v-show="menuShow">
          <div
            v-for="item in menuInfo"
            class="iconItem animate__animated"
            :class="{ animate__flipInX: menuShow }"
            :style="{ background: item.meta.color }"
            :key="item.name"
            @click="() => toGo(item.name)"
          >
            <el-tooltip effect="dark" :content="item.name" placement="left">
              <div style="font-size: 16px;color: white;">
                <i :class="item.meta.icon" style="font-size: 16px"></i>
                <span style="margin-left: 5px">{{item.name}}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { routes } from "@/router/index";
export default {
  name: "UserMenu",
  mounted() {
    // console.log(this.$refs.iconBox);
    // this.$refs.iconBox.addEventListener("animationend", e => {
    //   if (e.target === this.$refs.iconBox) this.menuShow = false;
    // });
  },
  data() {
    return {
      menuShow: false
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
    },
    leave() {
      this.menuShow = false;
    },
    toGo(name) {
      this.$router.push({ name });
      this.menuShow = false;
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
      background-color: #7f8c8d;
      opacity: 0.5;
    }
    .iconBox {
      position: fixed;
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
.iconBoxTra-enter,
.iconBoxTra-enter-to,
.iconBoxTra-leave-to {
  transition: all 0.3s ease-in-out;
}
.iconBoxTra-enter {
  transform: translate(-50%, -50%) scale(0.1) !important;
}
.iconBoxTra-enter-to {
  transform: translate(-50%, -50%) scale(1) !important;
}
.iconBoxTra-leave-to {
  transform: translate(-50%, -50%) scale(0.1) !important;
}
</style>
