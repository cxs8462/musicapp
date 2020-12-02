<template>
  <div class="myDjList">
    <h3 class="title">已订阅：{{ count }}</h3>
    <el-table
      :data="data"
      :show-header="false"
      @row-click="
        row => {
          onDj(row.id);
        }
      "
    >
      <el-table-column type="index"> </el-table-column>
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-image :src="scope.row.picUrl + '?param=300y300'" />
        </template>
      </el-table-column>
      <el-table-column prop="name" fit> </el-table-column>
      <el-table-column prop="desc" min-width="400"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            @click.stop="
              () => {
                qxDj(scope.row.id);
              }
            "
            >取消订阅</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { dylist, qxDj } from "@/api/dj";

export default {
  name: "myDjList",
  created() {
    this.getData();
  },
  data() {
    return {
      data: [],
      count: 0
    };
  },
  methods: {
    getData() {
      dylist().then(r => {
        this.data = r.djRadios;
        this.count = r.count;
      });
    },
    qxDj(id) {
      qxDj(id).then(r => {
        if (r.code === 200) {
          this.$message.success("取消订阅成功！");
        }
        this.getData();
      });
    },
    onDj(id) {
      this.$router.push("/djdetail/" + id);
    }
  }
};
</script>

<style lang="less">
.myDjList {
  .title{
    text-align: center;
    margin: 10px 0;
    color: var(--header-color);
  }
}
</style>
