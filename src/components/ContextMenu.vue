<template>
  <div class="ContextMenu" @click="close" v-show="show">
    <ul class="menuMain" ref="menuMain" :style="{ top: y, left: x }">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  mounted() {
    document.addEventListener("contextmenu", this.contextClick);
  },
  data() {
    return {
      x: "0px",
      y: "0px",
      show: false
    };
  },
  methods: {
    //右键事件
    contextClick(e) {
      //阻止默认事件
      console.log(e.target)
      e.preventDefault();
      this.show = true;
      this.x = e.clientX + "px";
      this.y = e.clientY + "px";
    },
    close(e) {
      //判断点击区域是否是menuMain的子元素 如果不是则关闭菜单
      // if (!this.$refs.menuMain.contains(e.target)) {
        this.show = false;
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.ContextMenu {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  .menuMain {
    position: fixed;
    z-index: 100000;
    list-style: none;
    border-radius: 10px;
    padding: 0;
    margin: 0;
    background-color: #f5f5f5;
    overflow: hidden;
    box-shadow: 0px 0px 2px 1px var(--selectSide-color);
    li{
      padding: 20px;
      cursor: pointer;
      &:hover{
        background-color: #bdbdbd;
      }
    }
  }
}
</style>
