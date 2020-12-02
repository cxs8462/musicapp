<template>
  <div class="djdetail">
    <div class="playDetailHead" v-if="Object.keys(data).length">
      <div class="left">
        <el-image :src="data.picUrl + '?param=400y400'" />
      </div>
      <div class="right">
        <el-scrollbar style="height: 100%;">
          <div class="btn">
            <h3>{{ data.name }}</h3>
            <el-button @click="sc" :disabled="data.subed">{{
              data.subed ? "已订阅" : "订阅"
            }}</el-button>
          </div>
          <div
            class="creator"
            @click="$store.commit('user/setUserId', data.dj.userId)"
          >
            <el-avatar :size="50" :src="data.dj.avatarUrl"></el-avatar>
            <div>
              <p>作者：{{ data.dj.nickname }}</p>
              <p>创建时间：{{ getTime(data.createTime) }}</p>
            </div>
          </div>
          <p class="tags">分类：{{ data.category }}</p>
          <p class="ms">{{ data.desc }}</p>
        </el-scrollbar>
      </div>
    </div>
    <div class="list">
      <dj-pro-list :data="list" @onDj="onDj" />
    </div>
    <div class="fy">
      <el-pagination
        :page-size="page.pageSize"
        :current-page.sync="page.pageNub"
        layout="prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <el-dialog
      v-if="Object.keys(programDetail).length"
      title="节目详情"
      :visible.sync="detailShow"
      width="50%"
      :before-close="detailClose"
    >
      <div class="detail">
        <el-scrollbar style="height: 100%;">
          <div class="detailHeader">
            <div class="headerLeft">
              <p>节目名：{{ programDetail.name }}</p>
              <p>简介：{{ programDetail.description }}</p>
              <p>
                作者：
                <el-avatar :src="programDetail.dj.avatarUrl" />
                <span>{{ programDetail.dj.nickname }}</span>
              </p>
              <p>创建时间：{{ createTime(programDetail.createTime) }}</p>
            </div>
            <div class="headerRight">
              <img :src="programDetail.coverUrl + '?param=300y300'" />
              <el-button
                  style="width: 100%;"
                @click="
                  () => {
                    onSong(programDetail.mainSong);
                  }
                "
                >试听</el-button
              >
            </div>
          </div>
          <div class="set">
            <p>分享：{{ programDetail.shareCount }}</p>
            <p>喜欢：{{ programDetail.likedCount }}</p>
            <p>评论：{{ programDetail.commentCount }}</p>
          </div>
          <div class="pl">
            <to-comments @onSend="onSend" :avatar="avatar" v-if="isLogin" />
            <comments-list :data="programPl" />
          </div>
          <div class="comment">
            <div class="fy">
              <el-pagination
                :page-size="detailPage.pageSize"
                :current-page.sync="detailPage.pageNub"
                layout="prev, pager, next"
                :total="detailPage.total"
              >
              </el-pagination>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCreateTime } from "@/until/time";
import { detail, dyDj, program, programDetail, programPl, pl } from "@/api/dj";
import DjProList from "@/components/dj/djProList";
import { songSet } from "@/until/mixin";
import moment from "moment";
import ToComments from "@/components/comments/toComments";
import CommentsList from "@/components/comments/commentsList";
export default {
  name: "djdetail",
  components: { CommentsList, ToComments, DjProList },
  mixins: [songSet],
  created() {
    this.id = this.$route.params.id;
    this.getData(this.id);
    this.getList();
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
    "page.pageNub": {
      handler() {
        this.getList();
      }
    },
    "detailPage.pageNub": {
      handler() {
        if (this.programDetail.id) {
          this.getDetailPl(this.programDetail.id);
        }
      }
    }
  },
  data() {
    return {
      data: {},
      commentDatas: [],
      id: 0,
      list: [],
      page: {
        pageNub: 1,
        total: 0,
        pageSize: 30
      },
      detailPage: {
        pageNub: 1,
        total: 0,
        pageSize: 20
      },
      programDetail: {},
      programPl: [],
      detailShow: false
    };
  },
  methods: {
    getTime(t) {
      return getCreateTime(t);
    },
    getData(id) {
      detail(id).then(r => {
        this.data = r.data;
        this.commentDatas = r.data.commentDatas;
      });
    },
    getList() {
      program(this.id, this.page.pageNub - 1).then(r => {
        this.list = r.programs;
        this.page.total ? "" : (this.page.total = r.count);
      });
    },
    sc() {
      dyDj(this.id).then(r => {
        if (r.code === 200) {
          this.$message.success("订阅成功！");
          this.getData(this.id);
        }
      });
    },
    onDj(id) {
      programDetail(id).then(async r => {
        const res = await programPl(id, this.detailPage.pageNub - 1);
        this.programPl = res.comments;
        this.detailPage.total ? "" : (this.detailPage.total = res.total);
        this.programDetail = r.program;
        this.detailShow = true;
      });
    },
    getDetailPl(id) {
      programPl(id, this.detailPage.pageNub - 1).then(r => {
        this.programPl = r.comments;
        this.detailPage.total ? "" : (this.detailPage.total = r.total);
      });
    },
    detailClose() {
      this.detailShow = false;
      this.programDetail = {};
      this.detailPage.total = 0;
      this.detailPage.pageNub = 1;
    },
    createTime(time) {
      return moment(time).format("YYYY年MM月DD日");
    },
    onSend(content) {
      pl(this.programDetail.id, content).then(r => {
        if (r.code === 200) {
          this.$message.success("发送成功！");
        }
        this.getDetailPl(this.programDetail.id);
      });
    }
  }
};
</script>

<style lang="less">
.djdetail {
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
  .detail {
    height: 60vh;
    overflow-y: auto;
    .detailHeader {
      display: flex;
      justify-content: space-between;
      .headerLeft {
        width: 60%;
        p {
          cursor: pointer;
          font-size: 20px;
          margin-top: 10px;
        }
      }
      .headerRight {
        padding: 10px;
        width: 30%;
        text-align: center;
      }
    }
    .set {
      margin-top: 20px;
      display: flex;
      justify-content: space-evenly;
      font-size: 20px;
      p {
        padding: 15px;
        border: 1px solid var(--header-color);
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: var(--selectSide-color);
        }
      }
    }
    .pl {
      padding: 10px;
    }
  }
}
</style>
