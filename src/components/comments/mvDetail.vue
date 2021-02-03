<template>
  <el-dialog
    top="8vh"
    width="80vw"
    title="mv详情"
    :visible.sync="mvShow"
    destroy-on-close
    @close="close"
    @open="open"
  >
    <div class="mvDetail" v-if="mvShow" v-loading="loading">
      <el-scrollbar style="height: 100%;">
        <p class="title"><i class="el-icon-s-platform" />{{ info.name }}</p>
        <div class="video">
          <video :src="url" controls="controls">
            您的浏览器不支持 video 标签。
          </video>
          <div class="description">
            <h5>简介</h5>
            <p>作者：{{ info.artistName }}</p>
            <p>公布时间:{{ info.publishTime }}</p>
            <p>
              标签：<el-tag
                style="margin-right: 10px;margin-top: 5px;"
                v-for="item in info.videoGroup"
                :key="item.id"
                >{{ item.name }}</el-tag
              >
            </p>
            <p>{{ info.desc }}</p>
          </div>
        </div>
        <div class="cd">
          <p
            class="cdItem"
            @click="
              () => {
                likeMv(info.id, count.liked ? 0 : 1);
              }
            "
          >
            <i
              :class="count.liked ? 'el-icon-star-on' : 'el-icon-star-off'"
            />{{ count.liked ? "已" : "" }}喜欢:{{ count.likedCount }}
          </p>
          <p class="cdItem">
            <i class="el-icon-chat-line-round" />评论:{{ count.commentCount }}
          </p>
          <p class="cdItem">
            <i class="el-icon-share" />分享:{{ count.shareCount }}
          </p>
        </div>
        <el-tabs>
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
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import CommentsList from "@/components/comments/commentsList";
import { mv, plMv } from "@/api/Mv";
import { fsPl, likeMv } from "@/api/my";
import ToComments from "@/components/comments/toComments";
export default {
  name: "mvDetail",
  props: {
    mvShow: {
      default: false
    },
    mvId: {
      default: 0
    }
  },
  components: { CommentsList, ToComments },
  computed: {
    avatar() {
      return this.$store.state.myConfig.avatarUrl;
    }
  },
  created() {},
  data() {
    return {
      info: {},
      url: "",
      count: {},
      loading: false,
      page: {
        pageSize: 20,
        pageNub: 1,
        total: 0
      },
      comments: []
    };
  },
  methods: {
    async getMvData(id) {
      this.loading = true;
      const r = await mv(id);
      this.info = r[0].data;
      this.count = r[1];
      this.url = r[2].data.url;
      const s = await plMv(id, this.page.pageNub - 1);
      this.page.total = s.total;
      this.comments = s.comments;
      this.loading = false;
    },
    async onSend(content) {
      this.loading = true;
      await fsPl(1, this.info.id, content);
      this.$message.success("发表成功！");
      await this.getMvData(this.info.id);
    },
    close() {
      this.$emit("update:mvId", 0);
      this.$emit("update:mvShow", false);
      this.page.pageNub = 1;
    },
    open() {
      if (this.mvId) {
        this.getMvData(this.mvId);
      }
    },
    likeMv(id, t) {
      if (!this.$store.state.isLogin) {
        this.$message.info("请登入后操作！");
        return;
      }
      likeMv(id, t).then(() => {
        this.getMvData(id);
      });
    }
  },
  watch: {
    "page.pageNub": {
      handler() {
        this.loading = true;
        plMv(this.info.id, this.page.pageNub - 1).then(s => {
          this.page.total = s.total;
          this.comments = s.comments;
          this.loading = false;
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mvDetail {
  height: 75vh;
  overflow: hidden;
  .title {
    font-size: 25px;
  }
  .video {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    video {
      width: 70%;
    }
    .description {
      width: 28%;
      h5 {
        font-size: 25px;
      }
      p {
        margin-top: 10px;
      }
    }
  }
  .cd {
    display: flex;
    width: 70%;
    justify-content: space-evenly;
    .cdItem {
      text-align: center;
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      border: 1px solid var(--header-color);
      padding: 10px;
      border-radius: 10px;
      color: var(--header-color);
      cursor: pointer;
      &:hover {
        background-color: var(--selectSide-color);
      }
      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
