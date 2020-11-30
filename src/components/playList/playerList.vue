<template>
  <div class="playerList" ref="playerList" :class="{ playerListShow: show }">
    <div class="listHead">
      <h5 class="title">播放列表</h5>
      <p>共{{ data.length }}首</p>
      <el-divider></el-divider>
    </div>
    <div class="listbox">
      <el-scrollbar style="height: 100%;">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          class="playerListItem"
          :class="{ select: item.id === select.id }"
          @click="
            () => {
              if (item.id !== select.id) $emit('setSelect', item);
            }
          "
        >
          <div style="display: flex;">
            <p class="name">{{ index + 1 }}、{{ item.name }}</p>
            <p class="ar">{{ item.ar.join("|") }}</p>
          </div>
          <div>
            <p
              class="del"
              @click.stop="
                () => {
                  del(index, item.id === select.id);
                }
              "
            >
              删除
            </p>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "playerList",
  props: ["show", "data", "select"],
  mounted() {
    document.addEventListener("click", e => {
      e.preventDefault();
      if (this.show) {
        if (!this.$refs.playerList.contains(e.target)) {
          this.close();
        }
      }
    });
  },
  methods: {
    close() {
      this.$store.commit("player/setListShow", false);
    },
    del(index, is) {
      if (is) {
        this.$message.info("不允许删除正在播放的曲目！");
        return;
      }
      this.$store.commit("player/delList", index);
    }
  }
};
</script>

<style lang="less" scoped>
.playerList {
  position: fixed;
  padding: 10px;
  bottom: -100vh;
  right: 0;
  width: 30vw;
  height: 90vh;
  background-color: var(--sider-color);
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 10000;
  opacity: 0.9;
  .listHead {
    height: 12%;
    .title {
      text-align: center;
      font-size: 30px;
      color: var(--header-color);
    }
    p {
      margin-left: 20px;
      font-size: 25px;
      color: var(--header-color);
    }
  }
  .listbox {
    height: 88%;
    .playerListItem {
      cursor: pointer;
      padding: 10px;
      display: flex;
      color: var(--header-color);
      justify-content: space-between;
      align-items: center;
      .del:hover {
        color: var(--content-color);
      }
      p {
        font-size: 20px;
      }
      .ar {
        margin-left: 30px;
      }
      &:hover {
        background-color: var(--selectSide-color);
      }
    }
    .select {
      background-color: var(--selectSide-color);
    }
  }
}
.playerListShow {
  bottom: 9vh;
}
</style>
