<template>
  <div class="createPlayList">
    <div class="set">
      <p @click="create"><i class="el-icon-plus" />创建新歌单</p>
    </div>
    <el-table
      ref="multipleTable"
      :data="data"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="select"
      @row-click="onRow"
      class="table"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" fit label="歌单名"></el-table-column>
      <el-table-column prop="createTime" fit label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" fit label="更新时间">
      </el-table-column>
      <el-table-column prop="trackCount" fit label="歌曲数量">
      </el-table-column>
    </el-table>
    <p class="del" v-if="selectData.length">
      <el-button type="danger" @click="delgd">删除</el-button>
    </p>
    <el-dialog @close="getData" title="歌单编辑" :visible.sync="gdShow">
      <el-dialog
        title="编辑"
        :visible.sync="setSongShow"
        append-to-body
        @close="
          selectPlayListId = '';
          songList = [];
          bjItemList.itemSelect = [];
        ">
        <div v-if="add" v-loading="$store.state.isLoading">
          <p>
            从已收藏的歌单中选：<el-select
              v-model="selectPlayListId"
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in myPlayList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </p>
          <div style="height: 50vh;overflow-y: auto;">
            <el-table
              v-if="songList.length"
              :data="songList"
              tooltip-effect="dark"
              style="width: 100%;"
              class="table"
              :show-header="false"
            >
              <el-table-column type="index"> </el-table-column>
              <el-table-column prop="name" fit></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button
                    :disabled="scope.row.isSave"
                    @click="
                      () => {
                        addSong(scope.row.id);
                      }
                    "
                    >{{ scope.row.isSave ? "已添加" : "添加音乐" }}</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div
          style="height: 50vh;overflow-y: auto;"
          v-else
          v-loading="$store.state.isLoading"
        >
          <el-table
            :data="bjItemList.itemSongList"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="selectItem"
            class="table"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="name" fit label="歌曲名"></el-table-column>
          </el-table>
          <p
            style="text-align: right;margin-right: 20px;margin-top: 20px;"
            v-if="bjItemList.itemSelect.length"
          >
            <el-button type="danger" @click="delSong">删除</el-button>
          </p>
        </div>
      </el-dialog>
      <div class="gdform">
        <p>
          歌单名称：<el-input
            v-model="itemData.name"
            placeholder="请输入歌单名称"
          />
        </p>
        <p>
          歌单描述：<el-input
            v-model="itemData.description"
            placeholder="请输入歌单描述"
            type="textarea"
          />
        </p>
        <p>
          歌单标签：<el-select
            v-model="itemData.tags"
            multiple
            placeholder="请选择"
            :multiple-limit="3"
            size="medium"
          >
            <el-option
              v-for="item in tags"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </p>
        <span>歌曲数量：{{ itemData.trackCount }}</span>
        <p class="addSong" @click="setAddSong">
          <i class="el-icon-s-fold" />增加歌曲
        </p>
        <p class="addSong" @click="setSong">
          <i class="el-icon-s-fold" />编辑歌曲
        </p>
        <p>
          歌单封面：<img
            class="avatar-uploader"
            v-if="itemData.coverImgUrl"
            :src="itemData.coverImgUrl"
          /><span v-else>无封面</span>
          <input
            type="file"
            ref="upload"
            style="display: none;"
            @change="upload"
          />
          <el-button class="upBtn" @click="onUpload">上传</el-button>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gdShow = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMyplayList,
  createPlayList,
  getTags,
  updataPlayList,
  delPlayList,
  getSelectPlayList,
  getSongDetail,
  addSongTo,
  delSongTo,
  upAva
} from "@/api/playlist";

import moment from "moment";
export default {
  name: "createPlayList",
  created() {
    this.getData();
  },
  data() {
    return {
      data: [],
      selectData: [],
      newPlayList: {},
      gdShow: false,
      itemData: {},
      tags: [],
      setSongShow: false,
      myPlayList: [],
      selectPlayListId: "",
      songList: [],
      add: false,
      bjItemList: {
        itemSelect: [],
        itemSongList: []
      }
    };
  },
  watch: {
    selectPlayListId(value) {
      if (value) {
        this.getItemSong(value);
      }
    }
  },
  computed: {
    my() {
      return this.$store.state.myConfig;
    }
  },
  methods: {
    select(e) {
      this.selectData = e;
    },
    selectItem(e) {
      this.bjItemList.itemSelect = e;
    },
    onRow(e) {
      getSelectPlayList(this.my.userId).then(r => {
        this.myPlayList = r.playlist.filter(i => i.id !== e.id);
        this.itemData = e;
        this.gdShow = true;
        this.getItemSong();
      });
    },
    getData() {
      getMyplayList(this.my.userId).then(r => {
        this.data = r.playlist
          .filter(i => i.userId === this.my.userId)
          .map(s => {
            s.createTime = moment(s.createTime).format("YYYY年MM月DD日");
            s.updateTime = moment(s.updateTime).format("YYYY年MM月DD日");
            return s;
          });
      });
      getTags().then(r => {
        this.tags = r.sub.map(i => i.name);
      });
    },
    create() {
      this.$prompt("请输入歌单名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        if (!value) {
          this.$message.warning("不能填空");
          return;
        }
        createPlayList(value).then(r => {
          if (r.code === 200) this.$message.success("歌单创建成功！");
          this.getData();
        });
      });
    },
    save() {
      updataPlayList(
        this.itemData.id,
        this.itemData.name,
        this.itemData.description,
        this.itemData.tags.join(";")
      ).then(r => {
        if (r.code === 200) {
          this.$message.success("编辑成功！");
          this.gdShow = false;
        }
      });
    },
    setAddSong() {
      this.setSongShow = true;
      this.add = true;
    },
    setSong() {
      this.setSongShow = true;
      this.add = false;
    },
    delgd() {
      delPlayList(this.selectData.map(i => i.id).join(",")).then(r => {
        if (r.code === 200) {
          this.$message.success("删除成功！");
          this.getData();
        }
      });
    },
    delSong() {
      delSongTo(
        this.itemData.id,
        this.bjItemList.itemSelect.map(i => i.id).join(",")
      ).then(r => {
        if (r.body.code === 200) {
          this.$message.success("删除成功！");
          getSongDetail(this.itemData.id).then(i => {
            this.bjItemList.itemSongList = i.playlist.tracks;
          });
        }
      });
    },
    addSong(id) {
      addSongTo(this.itemData.id, id).then(r => {
        this.getItemSong(this.selectPlayListId);
        this.$message.success("添加成功！");
      });
    },
    getItemSong(id = 0) {
      getSongDetail(this.itemData.id).then(z => {
        this.bjItemList.itemSongList = z.playlist.tracks;
        if (!id) return;
        getSongDetail(id).then(r => {
          this.songList = r.playlist.tracks.map(s => {
            s.isSave = this.bjItemList.itemSongList.some(i => i.id === s.id);
            return s;
          });
        });
      });
    },
    upload(f) {
      const that = this;
      const formData = new FormData();
      const file = f.target.files[0];
      formData.append("imgFile", file);
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = function() {
        upAva(that.itemData.id, img.width, formData).then(r => {
          if (r.data.code === 200) {
            that.$message.success("上传成功！");
            that.itemData.coverImgUrl = r.data.url;
            that.$refs.upload.value = "";
          }
        });
      };
    },
    onUpload() {
      const imgUpload = this.$refs.upload;
      imgUpload.dispatchEvent(new MouseEvent("click"));
    }
  }
};
</script>

<style lang="less">
.createPlayList {
  .set {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    p {
      color: var(--header-color);
      cursor: pointer;
      &:hover {
        color: var(--selectSide-color);
      }
    }
  }
  .avatar-uploader {
    width: 300px;
  }
  .table {
    font-size: 20px;
  }
  .del {
    width: 80%;
    margin-top: 10px;
    text-align: right;
  }
  .upBtn {
    margin-left: 20px;
  }
  .gdform {
    p {
      margin-top: 15px;
      display: flex;
      align-items: center;
      font-size: 20px;
      cursor: pointer;
      .el-input,
      .el-textarea {
        width: 70%;
      }
    }
    .addSong {
      margin-top: 20px;
      display: inline-block;
      margin-left: 20px;
      &:hover {
        color: var(--selectSide-color);
      }
    }
  }
}
</style>
