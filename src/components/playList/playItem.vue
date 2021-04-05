<template>
  <div
    class="playItem"
    @click="
      () => {
        $emit('onPlayItem', data.id);
      }
    "
  >
    <div class="img">
      <p class="playCount">播放量 : {{ playCount }}万</p>
      <img
        :draggable="true"
        @dragstart="
          el => {
            drag(el, data);
          }
        "
        @dragend="dragend"
        v-lazy="data.coverImgUrl + '?param=300y300'"
      />
      <p class="bofang"><i class="el-icon-video-play"></i></p>
      <p
        class="set"
        v-if="set"
        @click.stop="
          () => {
            $emit('set', data);
          }
        "
      >
        {{ set }}
      </p>
    </div>
    <h5>{{ data.name }}</h5>
    <p class="description">{{ data.description }}</p>
  </div>
</template>

<script>
import { drag } from "@/until/mixin";

export default {
  name: "playItem",
  computed: {
    playCount() {
      return Math.floor(this.data.playCount / 10000);
    }
  },
  mixins: [drag],
  props: ["data", "set"],
  methods: {
    drag(el, data) {
      this.dragStart({ ...data, type: "歌单" });
    }
  }
};
</script>

<style lang="less" scoped>
.playItem {
  overflow: hidden;
  padding: 10px;
  box-shadow: 0px 0px 2px 1px var(--header-color);
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 0px 3px 2px var(--header-color);
  }
  .img {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    .playCount {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      color: white;
      font-size: 15px;
      background-color: #4c4c4c55;
      padding: 10px 0 10px 10px;
      transition: all 0.5s ease-in-out;
      transform: translateY(-100%);
      margin-right: 30px;
      z-index: 1;
    }
    .bofang {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 90px;
      color: var(--header-color);
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }
    .set {
      position: absolute;
      text-align: center;
      width: 100%;
      color: white;
      background-color: #4c4c4c55;
      height: 40px;
      font-size: 22px;
      transition: all 0.5s ease-in-out;
      bottom: 0;
      transform: translateY(100%);
      &:hover {
        color: var(--header-color);
      }
    }
    &:hover {
      .playCount {
        transform: translateY(0);
      }
      .bofang {
        opacity: 1;
      }
      .set {
        transform: translateY(0);
      }
    }
  }
  h5 {
    font-size: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .description {
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
