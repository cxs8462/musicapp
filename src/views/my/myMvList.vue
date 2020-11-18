<template>
  <div class="myPlayList">
    <mv-item
      v-for="item in data"
      :key="item.id"
      :name="item.title"
      :img="item.coverUrl"
      :id="item.vid"
      :ms="item.creator.map(r => r.userName).join('|')"
      class="myMvItem"
      @onMv="onMV"
      set="取消收藏"
      @set="del"
    />
  </div>
</template>

<script>
import { getMyMvList, likeMv } from "@/api/my";
import MvItem from "@/components/MvItem";

export default {
  components: { MvItem },
  name: "myPlayList",
  created() {
    this.getData();
  },
  data() {
    return {
      data: []
    };
  },
  computed:{
    mvIsShow() {
      return this.$store.state.mv.mvBox;
    }
  },
  watch:{
    mvIsShow(value){
      if(!value) this.getData();
    }
  },
  methods: {
    getData() {
      getMyMvList().then(r => {
        this.data = r.data;
      });
    },
    onMV(id) {
      this.$store.commit("mv/setMvId", id);
    },
    del(id) {
      likeMv(id, 0).then(r => {
        if (r.code === 200) {
          this.getData();
          this.$message.success(r.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.myPlayList {
  display: flex;
  flex-wrap: wrap;
  .myMvItem {
    width: 19%;
    margin-left: 1%;
  }
}
</style>
