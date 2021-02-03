<template>
  <el-card
    :body-style="{ padding: '0px' }"
    @click.native="
      () => {
        $emit('onCard', id);
      }
    "
    class="cardItem"
  >
    <img :draggable="true" @dragstart="el=>{drag(el)}" v-lazy="img+'?param=300y300'" class="image" lazy/>
    <div style="padding: 14px;">
      <div>
        <span class="title">{{ title }}</span>
        <p class="ms">{{ ms }}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "cardItem",
  props: ["img", "title", "ms", "id"],
  methods:{
    drag(el){
      this.$store.commit('shareChat/setSong', {id:this.id,name:this.title,img:this.img,type:'歌单'})
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
}
.ms {
  font-size: 22px;
  color: darkgray;
}
.cardItem{
  border-radius: 5px;
  box-shadow: 0 0 4px 0px var(--header-color);
  &:hover{
    box-shadow: 0 0 4px 2px var(--header-color);
  }
}
</style>
