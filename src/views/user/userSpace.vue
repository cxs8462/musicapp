<template>
  <div class="userSpace">
    <div v-infinite-scroll="load" :infinite-scroll-immediate="loadStart" :infinite-scroll-disabled="begin" infinite-scroll-distance="50" style="min-height: 50vh;">
      <dt-item
        v-for="item in data"
        :key="item.dtid"
        :data="item"
        @del="del"
        @onContent="onContent"
        @pl="pl"
        @zf="zf"
      />
    </div>
    <el-dialog title="评论" :visible.sync="showComment" width="600px" center>
      <div v-if="showComment">
        <to-comments
          @onSend="onSend"
          :avatar="avatar"
          v-if="$store.state.isLogin"
        />
        <comments-list :data="comments" />
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
    </el-dialog>
    <div class="refresh" @click="refresh" :class="{ setroute: isRefresh }">
      <i class="el-icon-refresh"></i>
    </div>
  </div>
</template>

<script>
import { getAllDt, delDt, getPlDt, zfDt, plDt } from "@/api/dt";
import DtItem from "@/components/dt/dtItem";
import { songSet, setPlayList } from "@/until/mixin";
import ToComments from "@/components/comments/toComments";
import CommentsList from "@/components/comments/commentsList";

export default {
  name: "userSpace",
  components: { CommentsList, ToComments, DtItem },
  mixins: [songSet, setPlayList],
  data() {
    return {
      data: [],
      lastTime: undefined,
      begin: true,
      showComment: false,
      comments: [],
      isRefresh: false,
      page: {
        pageSize: 20,
        pageNub: 1,
        total: 0
      },
      threadId: 0,
      loadStart:false,
    };
  },
  watch: {
    "page.pageNub": {
      handler() {
        getPlDt(this.threadId, this.page.pageNub - 1).then(r => {
          this.comments = r.comments;
        });
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    avatar() {
      return this.$store.state.myConfig.avatarUrl;
    }
  },
  created() {
    getAllDt().then(r => {
      this.data = r.event;
      this.lastTime = r.lasttime;
      this.begin = false;
    });
  },
  methods: {
    getData() {
      if (this.lastTime) {
        getAllDt(this.lastTime).then(r => {
          r.event.forEach(i => this.data.push(i));
          this.lastTime = r.lasttime;
        });
      } else {
        this.$message.info("到底啦！");
        return;
      }
    },
    del(item) {
      delDt(item.dtid).then(r => {
        if (r.code) {
          this.$message.success("删除成功！");
          getAllDt().then(r => {
            this.data = r.event;
            this.lastTime = r.lasttime;
          });
        }
      });
    },
    onContent({ type, id }) {
      switch (type) {
        case "分享单曲":
        case "转发单曲":
          this.onSong({ id });
          return;
        case "分享歌单":
        case "转发歌单":
          this.onPlayItem(id);
          return;
        case "分享电台节目":
          this.$router.push("djdetail/" + id);
          return;
        default:
          return;
      }
    },
    load() {
      this.getData();
    },
    zf({ text, data }) {
      zfDt(data.userId, data.dtid, text).then(r => {
        r.code === 200 ? this.$message.success("转发成功！") : "";
        getPlDt(this.threadId, this.page.pageNub - 1).then(r => {
          this.comments = r.comments;
        });
      });
    },
    pl(item) {
      this.page.pageNub = 1;
      this.threadId = item.threadId;
      getPlDt(item.threadId, this.page.pageNub - 1).then(r => {
        this.comments = r.comments;
        this.page.total = r.total;
        this.showComment = true;
      });
    },
    onSend(content) {
      plDt(this.threadId, content).then(r => {
        r.code === 200 ? this.$message.success("评论成功！") : "";
        getPlDt(this.threadId, this.page.pageNub - 1).then(r => {
          this.comments = r.comments;
        });
      });
    },
    refresh() {
      this.isRefresh = true;
      getAllDt().then(r => {
        this.data = r.event;
        this.lastTime = r.lasttime;
        this.begin = false;
        this.isRefresh = false;
      });
    }
  }
};
</script>

<style lang="less">
.userSpace {
  height: 80vh;
  overflow: auto;
  .refresh {
    position: fixed;
    top: 10vh;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    background-color: var(--header-color);
    cursor: pointer;
    transition: 0.5s all;
    opacity: 0.7;
    &:hover {
      background-color: var(--selectSide-color);
      transform: rotate(-180deg);
    }
    border-radius: 50%;
    i {
      font-size: 30px;
      color: white;
    }
  }
  @keyframes route {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(-720deg);
    }
  }
  .setroute {
    animation: route 2s linear infinite;
  }
}
</style>
