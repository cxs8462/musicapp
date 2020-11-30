<template>
  <div class="headerBar">
    <div class="left">
      <el-dropdown @command="changeStyle">
        <span class="el-dropdown-link" style="color: white">
          主题色<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :command="item"
            v-for="item in color"
            :key="item.color"
          >
            <p :style="{color:getColor(item.color)}">{{ item.title }}</p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        icon="el-icon-back"
        @click="
          () => {
            $router.back();
          }
        "
        circle
      ></el-button>
      <el-button
        icon="el-icon-right"
        @click="
          () => {
            $router.forward();
          }
        "
        circle
      ></el-button>
    </div>
    <div class="right">
      <el-input
        placeholder="请输入关键词"
        prefix-icon="el-icon-search"
        v-model="search"
        @focus="openHot"
        @keydown.enter.native="onSearch"
        @input="searchChange"
        ref="search"
      >
      </el-input>
      <el-button
        v-if="!isFullScreen"
        icon="el-icon-full-screen"
        circle
        @click="full"
      ></el-button>
      <el-button
        @click="exit"
        v-else
        icon="el-icon-switch-button"
        circle
      ></el-button>
    </div>
    <hot-search :isShow.sync="isHotSearch" :data="hotData" @onHot="onHot" />
  </div>
</template>

<script>
import styleChange,{SYTLE} from "@/until/styleChange";
import fullScreen from "screenfull";
import HotSearch from "@/components/hotSearch";
import { getHot } from "@/api/search";

export default {
  name: "HeaderBar",
  components: { HotSearch },
  mounted() {
    styleChange("white");
  },
  data() {
    return {
      search: "",
      color: [
        { color: "red", title: "红色" },
        { color: "white", title: "白色" },
        { color: "blue", title: "蓝色" },
        { color: "orange", title: "橘黄色" },
        { color: "violet", title: "紫色" }
      ],
      isHotSearch: false,
      hotData: []
    };
  },
  computed: {
    isFullScreen() {
      return this.$store.state.isFullScreen;
    }
  },
  methods: {
    full() {
      fullScreen.toggle();
      this.$store.commit("setFullScreen", true);
    },
    exit() {
      fullScreen.exit();
      this.$store.commit("setFullScreen", false);
    },
    changeStyle(item) {
      styleChange(item.color);
    },
    getColor(color){
      return SYTLE[color]['--header-color']
    },
    async openHot() {
      if (this.search) return;
      if (this.hotData.length === 0) {
        const res = await getHot();
        this.hotData = res.result.hots.map(r => r.first);
      }
      this.isHotSearch = true;
    },
    onHot(title) {
      this.search = title;
      this.$refs.search.focus();
    },
    onSearch() {
      if (this.search) {
        this.$router.push("/search/" + this.search);
      }
    },
    searchChange(e) {
      if (e) this.isHotSearch = false;
      else this.openHot();
    }
  }
};
</script>

<style lang="less" scoped>
.headerBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  .left {
    width: 15vw;
    margin-left: 40px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 20px;
    color: white;
  }
  .right {
    margin-right: 40px;
    display: flex;
    align-items: center;
    width: 24vw;
    justify-content: space-evenly;
    .el-input {
      width: 15vw;
    }
  }
}
</style>
