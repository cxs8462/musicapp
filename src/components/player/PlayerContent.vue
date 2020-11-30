<template>
  <div class="playerContent" :class="{ playerContentShow: player.isShow }">
    <div class="contentLeft">
      <h3 class="title" v-if="Object.keys(data).length">
        {{ data.name }}--{{ data.ar.join("|") }}
      </h3>
      <div class="set">
        <i
          class="el-icon-star-off"
          @click="
            () => {
              add(data.id);
            }
          "
        />
        <i class="el-icon-chat-line-round" />
        <i class="el-icon-share" />
        <i class="el-icon-download" @click="downMp3" />
      </div>
      <div class="playerContentBox" ref="playerContentBox">
        <div>
          <p
            v-for="(item, index) in lry.lines"
            :class="{ select: index === currTime }"
            :key="item.time"
          >
            {{ item.txt }}
          </p>
        </div>
      </div>
    </div>
    <div class="contentRight">
      <el-scrollbar style="height: 100%;">
        <el-tabs>
          <el-tab-pane label="评论">
            <to-comments
              @onSend="onSend"
              :avatar="$store.state.myConfig.avatarUrl"
              v-if="$store.state.isLogin"
            />
            <comments-list :data="pl" />
            <div class="fy">
              <el-pagination
                :page-size="page.pageSize"
                :current-page.sync="page.pageNub"
                layout="prev, pager, next"
                :total="page.total"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Lyric from "@/until/lryParse";
import BScroll from "@better-scroll/core";
import { getPl } from "@/api/player";
import CommentsList from "@/components/comments/commentsList";
import { fsPl } from "@/api/my";
import ToComments from "@/components/comments/toComments";
import axios from "axios";
import { songSet } from "@/until/mixin";

export default {
  name: "PlayContent",
  components: { ToComments, CommentsList },
  mixins: [songSet],
  data() {
    return {
      lry: {},
      currTime: 0,
      betterScroll: null,
      config: {
        maxY: 0,
        itemHeiht: 0
      },
      pl: [],
      page: {
        total: 0,
        pageNub: 1,
        pageSize: 20
      }
    };
  },
  mounted() {
    this.betterScroll = new BScroll(this.$refs.playerContentBox, {
      probeType: 2, // 因为默认是不会调用 scroll 回调的，所以需要设置
      swipeTime: 30
    });
  },
  computed: {
    player() {
      return this.$store.state.player;
    },
    data() {
      return this.$store.state.player.selectItem;
    }
  },
  watch: {
    "data.id": {
      handler() {
        if (Object.keys(this.lry).length) this.lry.stop();
        this.lry = new Lyric(this.data.lry, this.handlerLrc);
        this.lry.play();
        this.page.pageNub = 1;
        this.getPl(this.data.id);
        this.betterScroll.scrollTo(0, 0);
        this.$nextTick(() => {
          this.betterScroll.refresh();
          this.config.maxY = this.betterScroll.maxScrollY;
          this.config.itemHeiht = this.config.maxY / this.lry.lines.length;
        });
      }
    },
    "player.currentTime": {
      handler(value) {
        this.lry.play();
        this.lry.seek(value * 1000);
        this.lry.stop();
      }
    },
    "page.pageNub": {
      handler() {
        this.getPl(this.data.id);
      }
    }
  },
  methods: {
    handlerLrc({ lineNum }) {
      this.currTime = lineNum;
      if (lineNum > 9) {
        this.betterScroll.scrollTo(0, this.currTime * this.config.itemHeiht);
      }
    },
    getPl(id) {
      getPl(id, this.page.pageNub - 1).then(r => {
        this.pl = r.comments;
        this.page.total = r.total;
      });
    },
    onSend(content) {
      fsPl(0, this.data.id, content).then(r => {
        if (r.code === 200) {
          this.$message.success("发表成功！");
          this.getPl(this.data.id);
        }
      });
    },
    downMp3() {
      axios({
        method: "get",
        url: this.data.url,
        responseType: "blob"
      }).then(res => {
        const href = URL.createObjectURL(res.data); //根据二进制对象创造新的链接
        const a = document.createElement("a");
        a.setAttribute("href", href);
        a.setAttribute("download", this.data.name);
        a.click();
        URL.revokeObjectURL(href);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.playerContent {
  position: fixed;
  top: 100vh;
  height: 84vh;
  width: 100vw;
  background-color: var(--sider-color);
  transition: all 0.5s ease-in-out;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  .contentLeft {
    width: 45vw;
    height: 84vh;
    .title {
      text-align: center;
      font-size: 30px;
      color: var(--header-color);
      height: 7vh;
      line-height: 7vh;
    }
    .set {
      height: 13vh;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 35px;
      color: var(--header-color);
      i {
        cursor: pointer;
      }
    }
  }
  .contentRight {
    margin-left: 4vw;
    width: 50vw;
    height: 84vh;
    overflow-y: hidden;
    padding-right: 1vw;
  }
  .playerContentBox {
    width: 45vw;
    height: 64vh;
    overflow: hidden;
    .select {
      color: indianred;
      font-size: 30px;
    }
    p {
      text-align: center;
      font-size: 25px;
      color: var(--header-color);
      transition: all 0.2s ease-in-out;
      margin-top: 20px;
    }
  }
}
.playerContentShow {
  top: 8vh;
}
</style>
