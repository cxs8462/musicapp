<template>
  <div class="palyDetail">
    <div class="playDetailHead" v-if="Object.keys(data).length">
      <div class="left">
        <img v-lazy="data.coverImgUrl + '?param=400y400'" />
      </div>
      <div class="right">
        <el-scrollbar style="height: 100%;">
          <div class="btn">
            <h3>{{ data.name }}</h3>
            <el-button @click="sc" :disabled="data.subscribed">{{data.subscribed?'已收藏':'收藏'}}</el-button>
          </div>
          <div class="creator" @click="$store.commit('user/setUserId',data.creator.userId)">
            <el-avatar :size="50" :src="data.creator.avatarUrl"></el-avatar>
            <div>
              <p>作者：{{ data.creator.nickname }}</p>
              <p>创建时间：{{ getTime(data.createTime) }}</p>
            </div>
          </div>
          <p class="tags" v-if="data.tags.length">
            标签：{{ data.tags.join("、") }}
          </p>
          <p class="ms">{{ data.description }}</p>
        </el-scrollbar>
      </div>
    </div>
    <div>
      <el-tabs>
        <el-tab-pane label="歌曲列表">
          <song-list
            :data="songList"
            set="添加到我喜欢"
            @set="add"
            @onSong="onSong"
          />
        </el-tab-pane>
        <el-tab-pane label="评论">
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSongDetail, plPlayList } from "@/api/playlist";
import { getCreateTime } from "@/until/time";
import { scPlayList } from "@/api/my";
import SongList from "@/components/comments/songList";
import CommentsList from "@/components/comments/commentsList";
import ToComments from "@/components/comments/toComments";
import { fsPl } from "@/api/my";
import { songSet } from "@/until/mixin";

export default {
  name: "detail",
  components: { ToComments, CommentsList, SongList },
  mixins: [songSet],
  created() {
    this.id = this.$route.params.id;
    this.getData(this.id);
    this.getComments(this.id);
  },
  data() {
    return {
      id: "",
      songList: [],
      data: [],
      page: {
        total: 0,
        pageNub: 1,
        pageSize: 30
      },
      comments: []
    };
  },
  methods: {
    getData(id) {
      if (!this.isLogin) {
        this.$message.info("登录即可查看所有歌曲，当前歌曲列表不完整。");
      }
      getSongDetail(id).then(r => {
        this.data = r.playlist;
        this.songList = r.playlist.tracks.map(r => {
          r.song = {
            artists: r.ar,
            album: r.al
          };
          r.picUrl = r.al.picUrl;
          return r;
        });
      });
    },
    getComments(id) {
      plPlayList(id, this.page.pageNub - 1).then(r => {
        if (!this.page.total) this.page.total = r.total;
        this.comments = r.comments;
      });
    },
    getTime(t) {
      return getCreateTime(t);
    },
    sc() {
      scPlayList(1, this.data.id).then(r => {
        if (r.code === 200) {
          this.$message.success("收藏成功！");
        }
        this.getData(this.id);
      });
    },
    onSend(content) {
      fsPl(2, this.id, content).then(r => {
        if (r.code === 200) {
          this.$message.success("发表成功！");
          this.getComments(this.id);
        }
      });
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
  watch: {
    isLogin() {
      this.getData(this.id);
    },
    "page.pageNub": {
      handler() {
        this.getComments(this.id);
      }
    }
  }
};
</script>

<style lang="less">
.palyDetail {
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
      .creator {
        margin-top: 10px;
        display: flex;
        cursor: pointer;
        min-width: 300px;
        max-width: 500px;
        p {
          margin-top: 0;
          font-size: 20px;
        }
        div {
          margin-top: 10px;
          display: flex;
          margin-left: 10px;
          height: 100%;
          flex-direction: column;
          justify-content: space-evenly;
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
