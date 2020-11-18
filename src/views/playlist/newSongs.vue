<template>
  <div class="newSongs">
    <ui-tag :tags="type" :tag="tag" @change="change" />
    <song-list
      :data="data"
      @onSong="onSong"
      set="添加到我喜欢"
      @set="addMyLove"
    />
  </div>
</template>

<script>
import { getNewSongs } from "@/api/playlist";
import UiTag from "@/components/UiTag";
import SongList from "@/components/songList";
import { likeSong } from "@/api/my";
export default {
  name: "newSongs",
  components: { SongList, UiTag },
  created() {
    this.getData(0);
  },
  data() {
    return {
      type: [
        {
          name: "全部",
          id: 0
        },
        {
          name: "华语",
          id: 7
        },
        {
          name: "欧美",
          id: 96
        },
        {
          name: "日本",
          id: 8
        },
        {
          name: "韩国",
          id: 16
        }
      ],
      tag: "全部",
      data: []
    };
  },
  methods: {
    getData(key) {
      getNewSongs(key).then(r => {
        this.data = r.data.map(r => {
          r.song = {
            artists: r.artists,
            album: r.album
          };
          r.picUrl = r.album.picUrl;
          return r;
        });
      });
    },
    change(name) {
      this.tag = name;
      const value = this.type.filter(r => r.name === name)[0].id;
      this.getData(value);
    },
    onSong(item) {
      this.$store.dispatch("player/getSong",item.id)
    },
    addMyLove(id) {
      likeSong(id, true).then(r => {
        if (r.code === 200) {
          if (r.songs) {
            this.$message.success("收藏成功！");
          } else {
            this.$message.warning("请不要重复添加！");
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
