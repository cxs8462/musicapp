<template>
  <div class="singer">
    <div class="playDetailHead" v-if="Object.keys(head).length">
      <div class="left">
        <el-image :src="head.picUrl + '?param=400y400'" />
      </div>
      <div class="right">
        <el-scrollbar style="height: 100%;">
          <div class="btn">
            <h3>{{ head.name }}</h3>
            <el-button @click="()=>{scSinger(head.id)}">收藏</el-button>
          </div>
          <p class="tags" v-if="head.alias.length">
            其他名字：{{ head.alias.join("、") }}
          </p>
          <p class="ms">{{ head.briefDesc }}</p>
        </el-scrollbar>
      </div>
    </div>
    <div>
      <el-tabs>
        <el-tab-pane label="歌手介绍">
          <el-collapse
            accordion
            v-model="selectOpen"
            v-if="Object.keys(detail).length"
          >
            <el-collapse-item
              v-for="(activity, index) in detail.introduction"
              :key="index + activity.ti"
              :title="activity.ti"
              :name="index"
            >
              <p>{{ activity.txt }}</p>
            </el-collapse-item>
            <el-collapse-item
              :name="
                detail.introduction.length ? detail.introduction.length + 1 : 0
              "
              title="热门资讯"
              v-if="detail.topicData"
            >
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in detail.topicData"
                  :key="index"
                  :timestamp="activity.topic.startText"
                >
                  <p>{{ activity.topic.title }}</p>
                  <p>标签：{{ activity.topic.tags.join("、") }}</p>
                </el-timeline-item>
              </el-timeline>
            </el-collapse-item>
            <el-collapse-item title="简介">
              <p>{{ detail.briefDesc }}</p>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="热门歌曲">
          <song-list
            :data="topSong"
            set="添加到我喜欢"
            @set="add"
            @onSong="onSong"
          />
        </el-tab-pane>
        <el-tab-pane label="相关mv">
          <div class="mvAll">
            <mv-item
              v-for="item in mv"
              :key="item.id"
              :name="item.name"
              :img="item.imgurl"
              :id="item.id"
              :ms="item.copywriter"
              :duration="item.duration"
              class="timvItem"
              @onMv="onMV"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑">
          <album-list :data="album" @onAlbum="onAlbum" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSinger, getSingerHead } from "@/api/singer";
import SongList from "@/components/comments/songList";
import { songSet, setMv, setAlbum, setSinger } from "@/until/mixin";
import MvItem from "@/components/MvItem";
import AlbumList from "@/components/comments/albumList";

export default {
  name: "singer",
  components: { AlbumList, MvItem, SongList },
  mixins: [songSet, setMv, setAlbum, setSinger],
  created() {
    this.id = this.$route.params.id;
    this.getData();
  },
  data() {
    return {
      id: 0,
      detail: {},
      mv: [],
      topSong: [],
      album: [],
      head: {},
      selectOpen: 0
    };
  },
  methods: {
    getData() {
      getSinger(this.id).then(r => {
        const { detail, mv, topSong, album } = r;
        this.detail = detail;
        this.mv = mv.mvs;
        this.topSong = topSong.songs.map(r => {
          r.song = {
            artists: r.ar,
            album: r.al
          };
          r.picUrl = r.al.picUrl;
          return r;
        });
        this.album = album.hotAlbums;
      });
      getSingerHead(this.id).then(r => {
        this.head = r.artist;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.singer {
  .playDetailHead {
    display: flex;
    height: 300px;
    overflow: hidden;
    .left {
      display: flex;
      align-items: center;
      width: 300px;
    }
    .right {
      margin-top: 10px;
      margin-left: 20px;
      width: 90%;
      height: 290px;
      .btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
          font-size: 30px;
          color: var(--header-color);
        }
      }
      p {
        margin-top: 6px;
        font-size: 20px;
        color: #4c4c4c;
      }
    }
  }
}
</style>
