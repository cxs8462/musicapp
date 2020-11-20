<template>
  <div class="allSinger">
    <div class="tag">
      <new-ui-tag
        :tags="initial"
        :tag="select.initial"
        @change="initialChange"
      />
      <new-ui-tag :tags="type" :tag="select.type" @change="typeChange" />
      <new-ui-tag :tags="area" :tag="select.area" @change="areaChange" />
    </div>
    <singer-list
      :left-data="data.slice(0, parseInt(data.length / 2))"
      :right-data="data.slice(parseInt(data.length / 2), data.length)"
      :index="data.length / 2 + 1"
      set="收藏"
      @set="scSinger"
      @onSinger="onSinger"
    />
    <div class="btn">
      <el-button
        v-if="page.pageNub !== 1"
        @click="
          () => {
            page.pageNub--;
          }
        "
        >上一页</el-button
      >
      <el-button
        v-if="page.more"
        @click="
          () => {
            page.pageNub++;
          }
        "
        >下一页</el-button
      >
    </div>
  </div>
</template>

<script>
import { singerFl } from "@/until/mixin";
import NewUiTag from "@/components/newUiTag";
import SingerList from "@/components/singerList";
import { singerFl as getSingerFl } from "@/api/singer";
import { setSinger } from "@/until/mixin";

export default {
  name: "allSinger",
  components: { SingerList, NewUiTag },
  mixins: [singerFl, setSinger],
  created() {
    this.getData();
  },
  data() {
    return {
      select: {
        initial: -1,
        type: -1,
        area: -1
      },
      page: {
        pageNub: 1,
        more: true
      },
      data: []
    };
  },
  watch: {
    "select.initial": {
      handler() {
        this.handleChange();
      }
    },
    "select.type": {
      handler() {
        this.handleChange();
      }
    },
    "select.area": {
      handler() {
        this.handleChange();
      }
    },
    "page.pageNub": {
      handler() {
        this.getData();
      }
    }
  },
  methods: {
    initialChange(item) {
      this.select.initial = item.value;
    },
    typeChange(item) {
      this.select.type = item.value;
    },
    areaChange(item) {
      this.select.area = item.value;
    },
    getData() {
      getSingerFl(
        this.page.pageNub - 1,
        this.select.initial,
        this.select.type,
        this.select.area
      ).then(r => {
        console.log(r);
        this.page.more = r.more;
        this.data = r.artists;
      });
    },
    handleChange() {
      this.page.pageNub = 1;
      this.getData();
    }
  }
};
</script>

<style lang="less">
.allSinger {
  .tag {
    font-size: 20px;
  }
  .btn {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
