<template>
  <div class="albumList">
    <div class="item" v-for="item in data" :key="item.id" @click="()=>{$emit('onAlbum',item.id)}">
      <div class="img">
        <img :src="item.picUrl+ '?param=300y300'"/>
      </div>
      <div class="coverTit">
        <p>{{item.name}}</p>
      </div>
      <div class="itemContent">
        <p>专辑名称：{{item.name}}</p>
        <p>版本：{{item.subType}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "albumList",
  props:["data"]
}
</script>

<style lang="less" scoped>
.albumList{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .item{
    width: 300px;
    height: 300px;
    margin: 10px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover{
      .coverTit{
        background-color: #00000000;
      }
      height: 350px;
    }
    .img{
      width: 300px;
      height: 300px;
    }
    .coverTit{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000077;
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        color: white;
        font-size: 35px;
        text-align: center;
      }
    }
    .itemContent{
      height: 50px;
      p{
        height: 25px;
        line-height: 25px;
        color: var(--header-color);
        font-size: 20px;
        width: 300px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow:hidden;
      }
    }
  }
}
</style>
