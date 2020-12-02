<template>
  <el-table
    :data="data"
    :show-header="false"
    @row-click="
      row => {
        $emit('onDj', row.id);
      }
    "
  >
    <el-table-column type="index"> </el-table-column>
    <el-table-column width="80">
      <template slot-scope="scope">
        <el-image :src="scope.row.coverUrl + '?param=300y300'" />
      </template>
    </el-table-column>
    <el-table-column prop="name" fit> </el-table-column>
    <el-table-column prop="description" min-width="400"> </el-table-column>
    <el-table-column v-if="set" align="right">
      <template slot-scope="scope">
        <el-button
          @click.stop="
            () => {
              $emit('setdj', scope.row.id);
            }
          "
          >{{ set }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "djProList",
  props: ["data", "set"]
};
</script>

<style scoped></style>
