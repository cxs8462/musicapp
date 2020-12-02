<template>
  <div
    class="hotSearch"
    v-if="isShow"
    @click="
      () => {
        $emit('update:isShow', false);
      }
    "
  >
    <h3>热搜列表</h3>
    <el-tag
      effect="plain"
      v-for="item in data"
      :key="item"
      class="tagItem"
      @click.stop="
        () => {
          $emit('update:isShow', false);
          $emit('onHot', item);
        }
      "
    >
      {{ item }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "hotSearch",
  props: {
    data: Array,
    isShow: Boolean
  }
};
</script>

<style lang="less" scoped>
.hotSearch {
  position: fixed;
  top: 8vh;
  right: 15vh;
  width: 500px;
  z-index: 10;
  opacity: 0.9;
  background-color: var(--sider-color);
  h3 {
    text-align: center;
    color: var(--header-color);
    font-size: 25px;
  }
  .tagItem,
  h3 {
    margin: 20px;
    cursor: pointer;
  }
}
</style>
