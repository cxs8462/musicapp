<template>
  <div class="playListHeader">
    <img class="bg" v-lazy="data.coverImgUrl" />
    <div class="playcontent">
      <div
        class="left"
        @click="
          () => {
            $emit('onPlayList', data.id);
          }
        "
      >
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
      </div>
      <div class="right">
        <el-scrollbar style="height: 100%;">
          <el-tag size="medium " effect="plain" type="danger">精品歌单</el-tag>
          <h4>{{ data.copywriter + " | " + data.name }}</h4>
          <p>{{ data.description }}</p>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { drag } from "@/until/mixin";

export default {
  name: "playLIstHeader",
  props: ["data"],
  mixins: [drag],
  methods: {
    drag(el, data) {
      this.dragStart({ ...data, type: "歌单" });
    }
  }
};
</script>

<style lang="less" scoped>
.playListHeader {
  width: 100%;
  height: 300px;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    filter: blur(10px);
    position: absolute;
    top: 0;
    left: 0;
  }
  .playcontent {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    position: absolute;
    .left {
      width: 240px;
      margin: 20px;
      img {
        width: 100%;
        border-radius: 30px;
        cursor: pointer;
      }
    }
    .right {
      width: 1200px;
      height: 260px;
      color: white;
      overflow-y: auto;
      .el-tag {
        font-size: 25px;
        display: flex;
        width: 180px;
        align-items: center;
        justify-content: center;
        height: 40px;
      }
      h4 {
        margin-top: 10px;
        font-size: 25px;
      }
      p {
        margin-top: 10px;
        font-size: 20px;
      }
    }
  }
}
</style>
