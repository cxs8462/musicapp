<template>
  <div class="mySinger">
    <h3 class="count">收藏总数：{{ count }}</h3>
    <singer-list
      :left-data="data"
      set="取消收藏"
      @set="qxscSinger"
      @onSinger="onSinger"
    />
  </div>
</template>

<script>
import { mySinger } from "@/api/my";
import SingerList from "@/components/singerList";
import { setSinger } from "@/until/mixin";

export default {
  name: "mySinger",
  components: { SingerList },
  mixins: [setSinger],
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
      mySinger().then(r => {
        this.data = r.data;
        this.count = r.count;
      });
    }
  }
};
</script>

<style lang="less">
.mySinger {
  width: 100%;
  .count {
    font-size: 30px;
    color: var(--header-color);
    text-align: center;
  }
}
</style>
