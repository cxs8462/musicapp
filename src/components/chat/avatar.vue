<template>
  <div class="avatar">
    <div class="avatar-h">
      <el-avatar :size="30" :src="src" />
      <p class="name">{{ name }}</p>
      <slot name="time"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "avatar",
  props: {
    src: {
      default:
        "http://p3.music.126.net/18MpXS2s_GRxKTf0ASkmUQ==/109951165559325866.jpg"
    },
    name: {
      default: "小猫咪"
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .avatar-h{
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    height: 70px;
    &:hover{
      background-color: var(--selectSide-color);
    }
    .name{
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  p {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
