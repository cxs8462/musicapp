<template>
  <div class="myPlayList">
    <div class="playBox">
      <play-item
        class="playItem"
        v-for="item in data"
        :key="item.id"
        :data="item"
        @onPlayItem="onPlayItem"
        :set="uid !== item.creator.userId ? '取消收藏' : '不可取消'"
        @set="del"
      />
    </div>
    <div class="fy">
      <el-pagination
        :page-size="page.pageSize"
        :current-page.sync="page.pageNub"
        layout="prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMyplayList, scPlayList } from "@/api/my";
import playItem from "@/components/playList/playItem";
export default {
  name: "myPlayList",
  components: { playItem },
  created() {
    this.getData();
  },
  data() {
    return {
      data: [],
      page: {
        pageSize: 30,
        total: 0,
        pageNub: 1
      }
    };
  },
  watch: {
    "page.pageNub": {
      handler() {
        this.getData();
      }
    }
  },
  computed: {
    uid() {
      return this.$store.state.myConfig.userId;
    }
  },
  methods: {
    getData() {
      getMyplayList(this.uid, this.page.pageNub - 1).then(r => {
        if (!this.page.total) {
          this.page.total = r.count ? r.count : r.playlist.length;
        }
        this.data = r.playlist;
      });
    },
    onPlayItem(id) {
      this.$router.push({ path: "playlistdetail/" + id });
    },
    del(item) {
      if (this.uid === item.creator.userId) {
        this.$message.info("此歌单为默认歌单，不可删除！");
        return;
      }
      scPlayList(2, item.id).then(r => {
        if (r.code === 200) {
          this.$message.success("删除成功！");
          this.getData();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.myPlayList {
  .playBox {
    display: flex;
    flex-wrap: wrap;
    .playItem {
      margin-top: 20px;
      width: 19%;
      margin-left: 1%;
    }
  }
}
</style>
