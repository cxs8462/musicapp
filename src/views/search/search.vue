<template>
  <div class="search">
    <div class="input">
      搜索:<el-autocomplete
        v-model="search"
        :fetch-suggestions="searchRes"
        placeholder="请输入内容"
        @select="handleSelect"
        :debounce="600"
        style="width: 60%;margin-left: 20px;"
      ></el-autocomplete>
    </div>
    <div class="result">
      <el-tabs v-model="tabSelect" @tab-click="tabClick">
        <el-tab-pane label="歌曲" name="song">
          <song-list
            :data="data.song"
            set="添加到我喜欢"
            @set="add"
            @onSong="onSong"
          />
        </el-tab-pane>
        <el-tab-pane label="歌手" name="singer">
          <singer-list
            :left-data="data.singer"
            set="收藏"
            @set="scSinger"
            @onSinger="onSinger"
          />
        </el-tab-pane>
        <el-tab-pane label="歌单" name="songList">
          <div class="playBox">
            <play-item
              class="playItem"
              v-for="item in data.songList"
              :key="item.id"
              :data="item"
              @onPlayItem="onPlayItem"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="mv" name="mv">
          <div class="mvAll">
            <mv-item
              v-for="item in data.mv"
              :key="item.id"
              :name="item.name"
              :img="item.cover"
              :id="item.id"
              :ms="item.copywriter"
              :duration="item.duration"
              class="timvItem"
              @onMv="onMV"
            />
          </div>
        </el-tab-pane>
        <div class="fy">
          <el-pagination
            :page-size="page.pageSize"
            :current-page.sync="page.pageNub"
            layout="prev, pager, next"
            :total="page.total"
          >
          </el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSuggest, getSearch } from "@/api/search";
import SongList from "@/components/comments/songList";
import PlayItem from "@/components/playList/playItem";
import MvItem from "@/components/MvItem";
import { songSet, setMv, setPlayList, setSinger } from "@/until/mixin";
import SingerList from "@/components/singerList";

export default {
  name: "search",
  components: { SingerList, MvItem, PlayItem, SongList },
  mixins: [songSet, setMv, setPlayList, setSinger],
  created() {
    this.search = this.$route.params.search;
    this.handleSelect();
  },
  watch: {
    "$route.params.search": {
      handler() {
        this.search = this.$route.params.search;
      }
    },
    "page.pageNub": {
      handler() {
        this.getData(this.tabSelect);
      }
    }
  },
  data() {
    return {
      search: "",
      data: {
        song: [],
        songList: [],
        mv: [],
        singer: []
      },
      suggest: {},
      tabSelect: "song",
      page: {
        pageNub: 1,
        pageSize: 30,
        total: 0
      }
    };
  },
  methods: {
    handleSelect() {
      this.tabClick({ name: this.tabSelect });
    },
    searchRes(e, cb) {
      if (e) {
        getSuggest(e).then(r => {
          if (!Object.keys(r.result).length) {
            cb([]);
            return;
          }
          let arr = [];
          r.result.order.forEach(item => {
            const result = r.result[item].map(i => {
              i.value = i.name;
              return i;
            });
            this.suggest[item] = result;
            arr = arr.concat(result);
          });
          cb(arr);
        });
      }
    },
    getSong(name) {
      getSearch(name, 1, this.page.pageNub - 1).then(r => {
        const { result } = r;
        this.data.song = result.songs.map(r => {
          r.song = {
            artists: r.artists,
            album: r.album
          };
          r.picUrl = r.artists[0].img1v1Url;
          return r;
        });
        this.page.total = result.songCount;
      });
    },
    getSinger(name) {
      getSearch(name, 100, this.page.pageNub - 1).then(r => {
        const { result } = r;
        this.data.singer = result.artists;
        this.page.total = result.artistCount;
      });
    },
    getSongList(name) {
      getSearch(name, 1000, this.page.pageNub - 1).then(r => {
        const { result } = r;
        this.data.songList = result.playlists;
        this.page.total = result.playlistCount;
      });
    },
    getMv(name) {
      getSearch(name, 1004, this.page.pageNub - 1).then(r => {
        const { result } = r;
        this.data.mv = result.mvs;
        this.page.total = result.mvCount;
      });
    },
    tabClick({ name }) {
      this.data = {
        song: [],
        songList: [],
        mv: [],
        singer:[]
      };
      this.page.pageNub = 1;
      this.getData(name);
    },
    getData(name) {
      switch (name) {
        case "song":
          this.getSong(this.search);
          return;
        case "mv":
          this.getMv(this.search);
          return;
        case "songList":
          this.getSongList(this.search);
          return;
        case "singer":
          this.getSinger(this.search);
          return;
        default:
          return;
      }
    }
  }
};
</script>

<style lang="less">
.el-autocomplete-suggestion__wrap {
  margin-bottom: 0 !important;
}
.search {
  .input {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    font-size: 25px;
  }
  .result {
  }
  .playBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .playItem {
      width: 19%;
      margin-top: 20px;
    }
  }
}
</style>
