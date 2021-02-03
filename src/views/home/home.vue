<template>
  <div class="home">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in banner" :key="item.imageUrl">
        <el-image :src="item.imageUrl"></el-image>
      </el-carousel-item>
    </el-carousel>
    <h2 class="itemTitle">推荐歌单</h2>
    <div class="personalized">
      <card-item
        v-for="item in personalized"
        :key="item.id"
        :img="item.picUrl"
        :id="item.id"
        :ms="item.copywriter"
        :title="item.name"
        class="personalizedItem"
        @onCard="onPersonalized"
      />
    </div>
    <h2 class="itemTitle">最新歌曲</h2>
    <div class="newSong">
      <song-list
        style="width: 45%"
        :data="newSong.slice(0, 5)"
        @onSong="onSong"
      />
      <song-list
        style="width: 45%"
        :data="newSong.slice(5, 10)"
        :index="6"
        @onSong="onSong"
      />
    </div>
    <h2 class="itemTitle">推荐MV</h2>
    <div class="tjmv">
      <mv-item
        v-for="item in tjMv"
        :key="item.id"
        :name="item.name"
        :img="item.picUrl"
        :id="item.id"
        :ms="item.copywriter"
        :duration="item.duration"
        class="timvItem"
        @onMv="onMV"
      />
    </div>
    <mv-detail :mvShow.sync="mvShow" :mvId.sync="mvId"/>
  </div>
</template>

<script>
import { banner, tjpersonalized, tjnewsong, tjmv } from "@/api/home";
import cardItem from "@/components/comments/cardItem";
import songList from "@/components/comments/songList";
import MvItem from "@/components/MvItem";
import MvDetail from "@/components/comments/mvDetail";
export default {
  created() {
    this.getData();
  },
  components: {
    MvDetail,
    cardItem,
    songList,
    MvItem
  },
  data() {
    return {
      banner: [],
      personalized: [],
      newSong: [],
      tjMv: [],
      mvShow:false,
      mvId:0
    };
  },
  methods: {
    getData() {
      banner().then(r => {
        this.banner = r.banners;
      });
      tjpersonalized().then(r => {
        this.personalized = r.result;
      });
      tjnewsong().then(r => {
        this.newSong = r.result;
      });
      tjmv().then(r => {
        this.tjMv = r.result;
      });
    },
    onPersonalized(id) {
      this.$router.push({ path: "playlistdetail/" + id });
    },
    onMV(id) {
      this.mvId = id
      this.mvShow = true
    },
    onSong(row) {
      this.$store.dispatch("player/getSong",row.id)
    }
  }
};
</script>

<style lang="less">
.home {
  .personalized {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .personalizedItem {
      width: 18%;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  .itemTitle {
    color: #4c4c4c;
    margin: 20px 0 20px 20px;
  }
  .newSong {
    display: flex;
    justify-content: space-evenly;
  }
  .tjmv {
    display: flex;
    margin-bottom: 20px;
    flex-wrap: wrap;
    .timvItem {
      width: 22%;
      margin-left: 3%;
    }
  }
}
</style>
