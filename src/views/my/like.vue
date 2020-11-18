<template>
  <div class="like">
    <song-list :data="data" set="取消我喜欢" @onSong="onSong" @set="del" />
  </div>
</template>

<script>
import {likeList, getSongs, likeSong} from "@/api/my";
import SongList from "@/components/songList";

export default {
  name: "like",
  components: { SongList },
  created() {
    this.getData();
  },
  computed: {
    uid() {
      return this.$store.state.myConfig.userId;
    }
  },
  data() {
    return {
      ids: [],
      data: []
    };
  },
  methods: {
    getData() {
      likeList(this.uid).then(item => {
        this.ids = item.ids;
        getSongs(this.ids).then(res => {
          console.log(res);
          this.data = res.songs.map(r => {
            r.picUrl = r.al.picUrl;
            r.song = {
              artists: r.ar,
              album: r.al
            };
            return r;
          });
        });
      });
    },
    onSong(item) {
      this.$store.dispatch("player/getSong",item.id)
    },
    del(id) {
      likeSong(id, false).then(r => {
        if (r.code === 200) {
          if (r.songs) {
            this.$message.success("删除成功！");
            this.getData()
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
