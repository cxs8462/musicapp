<template>
  <div class="mv">
    <ui-tag
      :tags="areaList"
      :tag="area"
      @change="changeArea"
      style="text-align: left"
    />
    <ui-tag
      :tags="orderList"
      :tag="order"
      @change="changeOrder"
      style="text-align: left"
    />
    <ui-tag
      :tags="typeList"
      :tag="type"
      @change="changeType"
      style="text-align: left"
    />
    <div class="mvAll">
      <mv-item
        v-for="item in data"
        :key="item.id"
        :name="item.name"
        :img="item.cover"
        :id="item.id"
        :ms="item.copywriter"
        :duration="item.duration"
        class="timvItem"
        @onMv="onMV"
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
import mixin from "@/until/mixin";
import UiTag from "@/components/UiTag";
import { mvAll } from "@/api/Mv";
import MvItem from "@/components/MvItem";
export default {
  components: { UiTag, MvItem },
  created() {
    this.getData();
  },
  name: "mvall",
  mixins: [mixin],
  watch: {
    "page.pageNub": {
      handler() {
        this.getData();
      }
    },
    area() {
      this.page.pageNub = 1;
      this.getData();
    },
    type() {
      this.page.pageNub = 1;
      this.getData();
    },
    order() {
      this.page.pageNub = 1;
      this.getData();
    }
  },
  data() {
    return {
      page: {
        pageNub: 1,
        total: 0,
        pageSize: 48
      },
      data: []
    };
  },
  methods: {
    changeArea(name) {
      this.area = name;
    },
    changeType(name) {
      this.type = name;
    },
    changeOrder(name) {
      this.order = name;
    },
    getData() {
      mvAll(this.area, this.order, this.page.pageNub - 1, this.type).then(r => {
        this.page.total ? "" : (this.page.total = r.count);
        this.data = r.data;
      });
    },
    onMV(id) {
      this.$store.commit("mv/setMvId", id);
    }
  }
};
</script>

<style lang="less" scoped>
.mv {
  .mvAll {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .timvItem {
      width: 22%;
      margin-top: 20px;
      align-self: flex-start;
    }
  }
}
</style>
