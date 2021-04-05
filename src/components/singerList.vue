<template>
  <div class="singerList">
    <el-table
      :data="leftData"
      :show-header="false"
      @row-click="
        row => {
          $emit('onSinger', row.id);
        }
      "
      class="singerBox"
      :row-style="{ height: '80px' }"
    >
      <el-table-column type="index" :index="1"> </el-table-column>
      <el-table-column width="80">
        <template slot-scope="scope">
          <img
            :draggable="true"
            @dragstart="
              el => {
                drag(el, scope.row);
              }
            "
            @dragend="dragend"
            v-lazy="scope.row.picUrl + '?param=100y100'"
          />
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <p class="name">{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="set" align="right">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.followed"
            @click.stop="
              () => {
                $emit('set', scope.row.id);
              }
            "
            >{{ scope.row.followed ? "已" + set : "" + set }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-if="rightData"
      :data="rightData"
      :show-header="false"
      @row-click="
        row => {
          $emit('onSinger', row.id);
        }
      "
      class="singerBox"
      :row-style="{ height: '80px' }"
    >
      <el-table-column type="index" :index="index"> </el-table-column>
      <el-table-column width="80">
        <template slot-scope="scope">
          <img
            :draggable="true"
            @dragstart="
              el => {
                drag(el, scope.row);
              }
            "
            @dragend="dragend"
            v-lazy="scope.row.picUrl + '?param=100y100'"
          />
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <p class="name">{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="set" align="right">
        <template slot-scope="scope">
          <el-button
            @click.stop="
              () => {
                $emit('set', scope.row.id);
              }
            "
            >{{ set }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { drag } from "@/until/mixin";

export default {
  name: "singerList",
  props: ["leftData", "rightData", "index", "set"],
  mixins: [drag],
  methods: {
    drag(el, data) {
      this.dragStart({ ...data, type: "歌手" });
    }
  }
};
</script>

<style lang="less" scoped>
.singerList {
  display: flex;
  width: 100%;
}
</style>
