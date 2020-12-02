<template>
  <div class="djItem" @click="$emit('onDj',data.id)">
    <div class="itemLeft">
      <img :src="data.picUrl+'?param=300y300'"/>
      <div class="cover">
        <p v-if="data.lastProgramName">又名：{{data.lastProgramName}}</p>
        <p>分类：{{data.category}}</p>
        <p>作者：{{data.dj.nickname}}</p>
        <p>节目数量：{{data.programCount}}</p>
      </div>
    </div>
    <div class="itemRight">
      <p>{{data.name}}</p>
      <p>{{data.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "djItem",
  props:["data"]
}
</script>

<style lang="less" scoped>
.djItem{
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover{
    background-color: var(--selectSide-color);
  }
  .itemLeft{
    width: 200px;
    height: 200px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    &:hover{
      .cover{
        left: 0;
      }
    }
    img{
      width: 200px;
      height: 200px;

    }
    .cover{
      position: absolute;
      left: 200px;
      top: 0;
      width: 200px;
      height: 200px;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #4c4c4c99;
      transition: all 0.3s ease-in-out;
      p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: white;
        font-size: 22px;
        margin-top: 10px;
      }
    }
  }
  .itemRight{
    width: 40%;
    font-size: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 200px;
    p{
      margin-top: 10px;
    }
    p:nth-child(2){
      max-height: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }
    color: var(--header-color);
  }
}
</style>
