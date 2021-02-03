<template>
  <div class="playlist">
    <play-l-ist-header
      @onPlayList="onPlayList"
      :data="item"
      v-for="item in topPlayList"
      :key="item.id"
    />
    <ui-tag :tag="tag" :tags="tags" @change="change" />
    <div class="playBox">
      <play-item
        class="playItem"
        v-for="item in playList"
        :key="item.id"
        :data="item"
        @onPlayItem="onPlayItem"
      />
    </div>
    <div class="fy">
      <el-pagination
        :page-size="page.pageSize"
        :current-page.sync="page.currentPage"
        layout="prev, pager, next"
        :total="page.pageNub"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { cat, playList, topPlayList } from "@/api/playlist";
import PlayLIstHeader from "@/components/playList/playLIstHeader";
import playItem from "@/components/playList/playItem";
import UiTag from "@/components/comments/UiTag";
import { setPlayList } from "@/until/mixin";

export default {
  components: { PlayLIstHeader, playItem, UiTag },
  mixins: [setPlayList],
  created() {
    this.getTags();
  },
  data() {
    return {
      tags: [],
      tag: "",
      topPlayList: [],
      page: {
        pageNub: 0,
        offset: 0,
        pageSize: 50,
        currentPage: 1
      },
      playList: []
    };
  },
  watch: {
    tag(value) {
      this.page.offset = 0;
      this.page.currentPage = 1;
      this.getData(value);
    },
    "page.currentPage": {
      handler: function() {
        playList(this.page.currentPage - 1, this.tag).then(r => {
          this.page.pageNub = r.total;
          this.playList = r.playlists;
        });
      }
    }
  },
  methods: {
    getTags() {
      cat().then(r => {
        this.tags = r.tags;
        this.tag = r.tags[0].name;
        //id name
      });
    },
    change(tag) {
      this.tag = tag;
    },
    getData(tag) {
      topPlayList(tag).then(r => {
        this.topPlayList = r.playlists;
      });
      playList(this.page.offset, tag).then(r => {
        this.page.pageNub = r.total;
        this.playList = r.playlists;
      });
    },
    onPlayList(id) {
      this.$router.push({ path: "playlistdetail/" + id });
    }
  }
};
</script>

<style lang="less">
.playlist {
  .playBox {
    display: flex;
    flex-wrap: wrap;
    .playItem {
      width: 19%;
      margin-left: 1%;
    }
  }
}
</style>
