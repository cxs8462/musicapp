<template>
  <el-table
    :data="data"
    :show-header="false"
    @row-click="
      row => {
        $emit('onSong', row);
      }
    "
  >
    <el-table-column type="index" :index="index ? index : 1"> </el-table-column>
    <el-table-column width="80">
      <template slot-scope="scope">
        <img :draggable="true" @dragstart="el=>{drag(el,scope.row)}" v-lazy="scope.row.picUrl + '?param=300y300'" />
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <p class="name">{{ scope.row.name }}</p>
        <span
          class="artists"
          @click.stop="
            () => {
              $router.push({
                path: '/singerdetail/' + scope.row.song.artists[0].id
              });
            }
          "
        >
          {{ scope.row.song.artists.map(r => r.name).join("|") }}
        </span>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <p class="artists">
          {{ scope.row.song.album.name }}
        </p>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <slot name="set" :id="scope.row.id"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "songList",
  props: ["data", "index"],
  methods:{
    drag(el,data){
      this.$store.commit('shareChat/setSong', {...data,type:'音乐'})
    }
  }
};
</script>

<style scoped>
.name {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.artists {
  margin-top: 20px;
  font-size: 18px;
  color: darkgray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
