<template>
  <div class="dragBox" :class="{ dragOpen: dragConfig.dragShow }">
    <div
      class="item"
      @dragover.stop="el => dragUp(el, index)"
      @dragleave.stop="el => dragLeave(el, index)"
      @drop="el => drop(el, index)"
      v-for="(item, index) in list"
      :key="index + item.title"
      :class="{ show: !item.show }"
    >
      <div class="title" v-show="item.show">
        {{ item.title }}
      </div>
      <div class="hover">
        <i class="el-icon-plus" />
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
import { addSongTo, getMyplayList } from "@/api/playlist";
import {likeMv, scPlayList} from "@/api/my";
import {scSinger} from "@/api/singer";

export default {
  name: "DragBox",
  data() {
    return {
      list: []
    };
  },
  watch: {
    "dragConfig.dragShow": {
      handler(value) {
        if (value) {
          const key = this.dragConfig.song;
          let arr = [];
          switch (key.type) {
            case "歌单":
              arr.push({ title: "收藏歌单", type: "歌单" });
              break;
            case "音乐":
              arr = arr.concat(
                this.playList.map(r => {
                  return {
                    title: r.name,
                    type: "音乐",
                    id: r.id
                  };
                })
              );
              break;
            case "mv":
              arr.push({ title: "收藏MV", type: "mv" });
              break;
            case "歌手":
              arr.push({ title: "收藏歌手", type: "歌手" });
              break;
            default:
              break;
          }
          arr.push({ title: "分享到聊天室", type: "分享" });
          arr = arr.map(r => {
            r.show = true;
            return r;
          });
          this.list = arr;
        }
      }
    }
  },
  computed: {
    dragConfig() {
      return this.$store.state.shareChat;
    },
    my() {
      return this.$store.state.myConfig;
    },
    user() {
      return this.$store.state.myConfig;
    },
    playList() {
      return this.$store.state.playList;
    }
  },
  methods: {
    getData() {
      getMyplayList(this.my.userId).then(r => {
        const data = r.playlist.filter(i => i.userId === this.my.userId);
        this.$store.commit("setPlayList", data);
      });
    },
    dragUp(el, index) {
      el.preventDefault();
      if (this.list[index].show) {
        this.list[index].show = false;
      }
    },
    dragLeave(el, index) {
      el.preventDefault();
      if (el.target.className === "hover") {
        this.list[index].show = true;
      }
    },
    drop(el, index) {
      el.preventDefault();
      this.list[index].show = true;
      const data = this.list[index];
      const id = this.dragConfig.song.id
      switch (data.type) {
        case "歌单":
          scPlayList(1, id).then(r => {
            if (r.code === 200) {
              this.$message.success("收藏成功！");
            }
          });
          break;
        case "音乐":
          addSongTo(data.id, id).then(r => {
            this.$message.success("添加成功！");
          });
          break;
        case "歌手":
          scSinger(id).then(r => {
            if (r.code === 200) {
              this.$message.success("收藏成功！");
            } else {
              this.$message.info("已在收藏中！");
            }
          });
          break;
        case "mv":
          likeMv(id, 1).then(() => {
            this.$message.success("添加成功！");
          });
          break;
        case "分享":
          this.toConnect();
          this.$socket.emit("message", this.shareCreate(this.dragConfig.song));
          break;
      }
    },
    shareCreate(data) {
      const obj = { name: data.name, id: data.id, type: data.type };
      switch (data.type) {
        case "歌单":
          obj.img = data.img || data.coverImgUrl;
          break;
        case "音乐":
          obj.img = data.picUrl || data.album.blurPicUrl;
          break;
        case "歌手":
          obj.img = data.picUrl;
          break;
        case "mv":
          obj.img = data.img;
          break;
      }
      obj.img += "?param=300y300";
      return obj;
    },
    toConnect() {
      this.$socket.emit("login", {
        name: this.user.nickname,
        avatar: this.user.avatarUrl,
        id: this.user.userId
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dragBox {
  position: fixed;
  top: 10vh;
  right: -20vw;
  width: 20vw;
  height: 80vh;
  overflow: hidden;
  z-index: 9999;
  transition: 0.4s all ease-in-out;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0 0 2px 2px var(--header-color);
  .item {
    width: 15vw;
    height: 10vh;
    margin: 15px auto;
    overflow: hidden;
    font-size: 25px;
    color: var(--header-color);
    transition: 0.4s all ease-in-out;
    box-shadow: 0 0 2px 2px var(--header-color);
    border-radius: 30px;
    .title {
      width: 15vw;
      line-height: 10vh;
      height: 10vh;
      text-align: center;
      background: var(--content-color);
    }
    .hover {
      width: 15vw;
      line-height: 10vh;
      height: 10vh;
      text-align: center;
      background: var(--selectSide-color);
    }
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 20vw;
    height: 100vh;
    background-color: var(--header-color);
    opacity: 0.6;
    z-index: -1;
  }
}
.dragOpen {
  right: 20px;
}
.show {
  transform: scale(1.2);
}
</style>
