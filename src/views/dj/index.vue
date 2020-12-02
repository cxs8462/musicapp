<template>
  <div class="djIndex">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in banner" :key="item.url">
        <el-image :src="item.pic"></el-image>
      </el-carousel-item>
    </el-carousel>
    <h3 class="title">分类推荐</h3>
    <div class="catelist">
      <div
        class="cateItem"
        v-for="item in catelist"
        :key="item.id"
        @click="selectCate = item.id"
      >
        <img
          :src="
            item.id === selectCate ? item['pic84x84IdUrl'] : item['pic96x96Url']
          "
        />
        <p :class="{ select: item.id === selectCate }">{{ item.name }}</p>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="recommendType">
      <dj-item
        style="width: 50%"
        v-for="item in recommendType"
        :key="item.id"
        :data="item"
        @onDj="onDj"
      />
    </div>
    <el-divider></el-divider>
    <h3 class="title">个性推荐</h3>
    <el-divider></el-divider>
    <div class="recommendType">
      <dj-item
        style="width: 33%"
        v-for="item in recommendPersonality"
        :key="item.id"
        :data="item"
        @onDj="onDj"
      />
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import {
  banner,
  catelist,
  recommendPersonality,
  recommendType
} from "@/api/dj";
import DjItem from "@/components/dj/djItem";

export default {
  name: "djIndex",
  components: { DjItem },
  created() {
    this.getData();
  },
  watch: {
    selectCate(value) {
      this.getRecommend(value);
    }
  },
  data() {
    return {
      banner: [],
      catelist: [],
      selectCate: 0,
      recommendType: [],
      recommendPersonality: [],
    };
  },
  methods: {
    getData() {
      banner().then(r => {
        this.banner = r.data;
      });
      catelist().then(r => {
        this.catelist = r.categories;
        this.selectCate = r.categories[0].id;
      });
      recommendPersonality().then(r => {
        this.recommendPersonality = r.data;
      });
    },
    getRecommend(type) {
      recommendType(type).then(r => {
        this.recommendType = r.djRadios;
      });
    },
    onDj(id) {
      this.$router.push("djdetail/" + id);
    }
  }
};
</script>

<style lang="less">
.djIndex {
  .title {
    text-align: center;
    color: var(--header-color);
    margin: 10px 0;
  }
  .catelist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--selectSide-color);
    padding: 10px;
    .cateItem {
      width: 96px;
      p {
        font-size: 20px;
        text-align: center;
        color: var(--header-color);
      }
      .select {
        color: #e74c3c;
      }
    }
  }
  .recommendType {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .dayGoods{

  }
}
</style>
