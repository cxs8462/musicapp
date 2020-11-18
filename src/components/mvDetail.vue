<template>
  <el-dialog
    top="8vh"
    width="80vw"
    title="mv详情"
    :visible="mvShow"
    destroy-on-close
    @close="
      () => {
        $emit('closeMvBox');
      }
    "
  >
    <div class="mvDetail" v-if="mvShow">
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
                $emit('likeMv', info.id, count.liked ? 0 : 1);
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
import CommentsList from "@/components/commentsList";
import { plMv } from "@/api/Mv";
import { fsPl } from "@/api/my";
import ToComments from "@/components/toComments";
export default {
  name: "mvDetail",
  props: ["mvShow", "mvData"],
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
      page: {
        pageSize: 20,
        pageNub: 1,
        total: 0
      },
      comments: []
    };
  },
  methods: {
    setData() {
      this.info = this.mvData.info;
      this.url = this.mvData.url;
      this.count = this.mvData.count;
    },
    getComments(id) {
      plMv(id, this.page.pageNub - 1).then(r => {
        this.page.total = r.total;
        this.comments = r.comments;
      });
    },
    onSend(content) {
      fsPl(1, this.info.id, content).then(r => {
        if (r.code === 200) {
          this.$message.success("发表成功！");
          this.getComments(this.info.id);
        }
      });
    }
  },
  watch: {
    mvShow(value) {
      if (value) {
        this.setData();
        this.getComments(this.info.id);
      }
    },
    "mvData.url": {
      handler() {
        this.setData();
        this.page.pageNub = 1;
      }
    },
    "page.pageNub": {
      handler() {
        this.getComments(this.info.id);
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
      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
