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
import PlayItem from "@/components/playItem";
import { getTopList } from "@/api/playlist";
export default {
  name: "toplist",
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
    },
    onPlayItem(id) {
      this.$router.push({ path: "playlistdetail/" + id });
    }
  }
};
</script>

<style lang="less">
.toplist {
  display: flex;
  flex-wrap: wrap;
  .topListItem {
    width: 19%;
    margin-left: 1%;
    margin-top: 10px;
  }
}
</style>
