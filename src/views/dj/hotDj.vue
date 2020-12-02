<template>
  <div class="hotDj">hello</div>
</template>

<script>
import { hotDj, catelist2 } from "@/api/dj";

export default {
  name: "hotDj",
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
        this.getHotData();
        this.headerData = this.catelist.filter(r => r.categoryId === value)[0].radios;
        console.log(this.headerData);
      }
    }
  },
  methods: {
    getCatelist() {
      catelist2().then(r => {
        this.catelist = r.data;
        this.selectCateId = r.data[0].categoryId;
        console.log(this.selectCateId)
      });
    },
    getHotData() {
      hotDj(this.selectCateId, this.page.pageNub - 1).then(r => {
        this.page.total ? "" : (this.page.total = r.count);
        this.hotData = this.djRadios;
      });
    }
  }
};
</script>

<style lang="less">
.hotDj {
}
</style>
