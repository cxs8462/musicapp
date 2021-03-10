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
    <mv-detail :mvShow.sync="mvShow" :mvId.sync="mvId" />
  </div>
</template>

<script>
import { getMyMvList, likeMv } from "@/api/my";
import MvItem from "@/components/MvItem";
import MvDetail from "@/components/comments/mvDetail";

export default {
  components: {MvDetail, MvItem },
  name: "myPlayList",
  created() {
    this.getData();
  },
  data() {
    return {
      data: [],
      mvShow:false,
      mvId:0
    };
  },
  methods: {
    getData() {
      getMyMvList().then(r => {
        this.data = r.data;
      });
    },
    onMV(id) {
      this.mvId = id
      this.mvShow = true
    },
    del(id) {
      likeMv(id, 0).then(r => {
        if (r.code === 200) {
          this.getData();
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
    margin-top: 10px;
  }
}
</style>
