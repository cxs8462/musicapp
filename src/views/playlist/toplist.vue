<template>
  <div class="toplist">
    <play-item
      v-for="item in data"
      :key="item.id"
      class="topListItem"
      :data="item"
      @onPlayItem="onPlayItem"
    />
  </div>
</template>

<script>
import PlayItem from "@/components/playList/playItem";
import { getTopList } from "@/api/playlist";
import { setPlayList } from "@/until/mixin";

export default {
  name: "toplist",
  mixins: [setPlayList],
  created() {
    this.getData();
  },
  components: { PlayItem },
  data() {
    return {
      data: []
    };
  },
  methods: {
    getData() {
      getTopList().then(r => {
        this.data = r.list;
      });
    }
  }
};
</script>

<style lang="less">
.toplist {
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .topListItem {
    width: 19%;
    margin-left: 1%;
    margin-top: 10px;
  }
}
</style>
