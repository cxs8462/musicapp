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
      <img :draggable="true" @dragstart="el=>{drag(el)}" class="img" v-lazy="img + '?param=500y300'" />
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
  },
  methods:{
    drag(el){
      this.$store.commit('shareChat/setSong', {img:this.img,id:this.id,name:this.name,type:'mv'})
    }
  }
};
</script>

<style lang="less" scoped>
.MvItem {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 2px 2px 3px 2px var(--header-color);
  border-radius: 10px;
  overflow: hidden;
  &:hover{
    box-shadow: 0 0 4px 3px var(--header-color);
    transform: translateY(-10px);
  }
  .duration {
    position: absolute;
    right: 5px;
    top: 0;
    color: white;
    font-size: 10px;
  }
  .foot {
    padding: 10px;
  }
  .title {
    font-size: 20px;
    text-align: center;
    color: var(--header-color);
  }
  .bfBox {
    position: relative;
    overflow: hidden;
    height: 75%;
    .bf {
      position: absolute;
      font-size: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(5);
      opacity: 0;
      color: brown;
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      .set {
        transform: translateY(0);
      }
      .bf {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
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
