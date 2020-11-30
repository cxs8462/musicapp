<template>
  <div class="fansList">
    <div class="btn">
      <el-button
        :disabled="page.pageNub === 1"
        icon="el-icon-back"
        circle
        @click="page.pageNub--"
      ></el-button>
      <el-button
        @click="page.pageNub++"
        :disabled="!page.more"
        icon="el-icon-right"
        circle
      ></el-button>
    </div>
    <el-divider></el-divider>
    <div class="fans">
      <user-item
        class="item"
        v-for="item in data"
        :key="item.id"
        :data="item"
        @onUserItem="onUserItem"
      />
    </div>
  </div>
</template>

<script>
import { getFans } from "@/api/user";
import UserItem from "@/components/user/userItem";

export default {
  name: "fansList",
  components: { UserItem },
  created() {
    this.getData();
  },
  watch: {
    "page.pageNub": {
      handler() {
        this.getData();
      }
    }
  },
  data() {
    return {
      data: [],
      page: {
        pageNub: 1,
        more: false
      }
    };
  },
  methods: {
    getData() {
      getFans(this.$store.state.myConfig.userId, this.page.pageNub - 1).then(
        r => {
          this.page.more = r.more;
          this.data = r.follow;
        }
      );
    },
    onUserItem(id) {
      this.$store.commit("user/setUserId", id);
    }
  }
};
</script>

<style lang="less">
.fansList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .fans {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-top: 10px;
      width: 20%;
    }
  }
  .btn {
    width: 50%;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
