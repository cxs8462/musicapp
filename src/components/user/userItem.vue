<template>
  <div class="userItem" @click="$emit('onUserItem', data.userId)">
    <div class="avatar">
      <div class="avatarText">
        查看
      </div>
      <img class="img" :src="data.avatarUrl" />
    </div>
    <p class="name">{{ data.nickname }}</p>
  </div>
</template>

<script>
export default {
  name: "userItem",
  props: ["data"]
};
</script>

<style lang="less" scoped>
.userItem {
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover{
    .avatar{
      .avatarText{
        background-color: #4c4c4c77;
        opacity: 1;
      }
    }
  }
  .avatar {
    text-align: center;
    width: 80px;
    height: 80px;
    overflow: hidden;
    position: relative;
    .img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .avatarText{
      position: absolute;
      width: 80px;
      height: 80px;
      top: 0;
      left: 0;
      transition: all 0.3s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 20px;
      border-radius: 50%;
      opacity: 0;
    }
  }
  .name {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
