<template>
  <div class="commentsList">
    <div class="itemBox" v-for="item in data" :key="item.time">
      <div class="left">
        <el-avatar :src="item.user.avatarUrl" :size="50" />
      </div>
      <div class="right">
        <p class="itemContent">{{ item.user.nickname }}：{{ item.content }}</p>
        <p class="time">{{ getTime(item.time) }}</p>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import { getCreateTime } from "@/until/time";

export default {
  name: "commentsList",
  props: ["data"],
  methods: {
    getTime(t) {
      return getCreateTime(t);
    }
  }
};
</script>

<style lang="less" scoped>
.commentsList {
  .itemBox {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    &:hover {
      background-color: rgb(245, 247, 250);
    }
    .right {
      width: 80%;
      margin-left: 20px;
      .itemContent {
        font-size: 20px;
      }
      .time {
        margin-top: 30px;
        font-size: 20px;
        color: #4c4c4c99;
      }
    }
  }
}
</style>
