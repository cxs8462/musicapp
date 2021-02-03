<template>
  <div class="hotDj">
    <h3 class="headtitle">推荐</h3>
    <div class="headList" v-if="headerData.length">
      <div
        @click="
          () => {
            onDj(item.id);
          }
        "
        class="tj"
        v-for="item in headerData"
        :key="item.id"
      >
        <img v-lazy="item.picUrl + '?param=300y300'" />
        <div class="context">
          <p class="type">{{ type }}</p>
          <p>节目：{{ item.name }}</p>
          <p>又名：{{ item.lastProgramName }}</p>
          <p>描述：{{ item.rcmdText }}</p>
          <p>节目数：{{ item.programCount }}</p>
        </div>
      </div>
    </div>
    <new-ui-tag style="text-align: right;" @change="onCate" :tags="catelist" :tag="selectCateId" />
    <div class="recommendType">
      <dj-item
        style="width: 50%"
        v-for="item in hotData"
        :key="item.id"
        :data="item"
        @onDj="onDj"
      />
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
  </div>
</template>

<script>
import { hotDj, catelist2 } from "@/api/dj";
import NewUiTag from "@/components/newUiTag";
import DjItem from "@/components/dj/djItem";

export default {
  name: "hotDj",
  components: { DjItem, NewUiTag },
  created() {
    this.getCatelist();
  },
  data() {
    return {
      hotData: [],
      headerData: [],
      catelist: [],
      selectCateId: 0,
      page: {
        pageNub: 1,
        total: 0,
        pageSize: 30
      }
    };
  },
  watch: {
    selectCateId(value) {
      if (value) {
        this.page.pageNub = 1;
        this.page.total = 0;
        this.getHotData();
        this.headerData = this.catelist.filter(
          r => r.categoryId === value
        )[0].radios;
      }
    },
    "page.pageNub": {
      handler() {
        this.getHotData();
      }
    }
  },
  computed: {
    type() {
      if (this.catelist.length)
        return this.catelist.filter(r => r.categoryId === this.selectCateId)[0]
          .categoryName;
      return "";
    }
  },
  methods: {
    getCatelist() {
      catelist2().then(r => {
        this.catelist = r.data.map(i => {
          i.name = i.categoryName;
          i.value = i.categoryId;
          i.value = i.categoryId;
          return i;
        });
        this.selectCateId = r.data[0].categoryId;
      });
    },
    getHotData() {
      hotDj(this.selectCateId, this.page.pageNub - 1).then(r => {
        this.page.total ? "" : (this.page.total = r.count);
        this.hotData = r.djRadios;
      });
    },
    onCate(value) {
      this.selectCateId = value.categoryId;
    },
    onDj(id) {
      this.$router.push("djdetail/" + id);
    }
  }
};
</script>

<style lang="less">
.hotDj {
  .headtitle {
    color: var(--header-color);
    font-size: 20px;
  }
  .headList {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    .tj {
      display: flex;
      width: 30%;
      padding: 10px;
      border: 1px solid var(--header-color);
      transition: all 0.3s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
      img {
        width: 150px;
        height: 150px;
      }
      .context {
        .type {
          padding: 5px;
          border: 1px solid var(--header-color);
          width: 100px;
          text-align: center;
          color: var(--header-color);
          font-size: 17px;
          border-radius: 5px;
        }
        p {
          margin-top: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        width: 60%;
        font-size: 15px;
        margin-left: 10px;
      }
    }
  }
  .recommendType {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
}
</style>
