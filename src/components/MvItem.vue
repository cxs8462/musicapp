<template>
  <div
    class="MvItem"
    @click="
      () => {
        $emit('onMv', id);
      }
    "
  >
    <div class="bfBox">
      <el-image class="img" :src="img + '?param=500y300'" />
      <span class="bf"><i class="el-icon-video-play"/></span>
      <p
        v-if="set"
        class="set"
        @click.stop="
          () => {
            $emit('set', id);
          }
        "
      >
        {{ set }}
      </p>
    </div>
    <span class="duration">{{ duration }}</span>
    <div class="foot">
      <p class="title">{{ name }}</p>
      <p class="ms">{{ ms }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvItem",
  props: ["img", "id", "name", "ms", "duration", "set"],
  data(){
    return{

    }
  }
};
</script>

<style lang="less" scoped>
.MvItem {
  position: relative;
  cursor: pointer;
  .duration {
    position: absolute;
    right: 5px;
    top: 0;
    color: white;
    font-size: 10px;
  }
  .foot {
    height: 25%;
  }
  .title {
    font-size: 15px;
  }
  .ms {
    font-size: 20px;
    color: darkgray;
  }
  .bfBox {
    position: relative;
    overflow: hidden;
    height: 75%;
    .img{
      border-radius: 12px;
    }
    .bf {
      position: absolute;
      font-size: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: brown;
    }
    &:hover {
      .set {
        transform: translateY(0);
      }
    }
    .set {
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      height: 30px;
      font-size: 20px;
      color: white;
      background-color: #4c4c4c55;
      transition: all 0.4s ease-in-out;
      transform: translateY(100%);
      &:hover {
        color: var(--header-color);
      }
    }
  }
}
</style>
