<template>
  <div class="dtitem">
    <div v-if="$store.state.myConfig.userId === data.userId" class="btn">
      <el-tag @click="$emit('pl', data)">评论</el-tag>
      <el-tag style="margin-left: 20px" @click="$emit('del', data)"
        >删除</el-tag
      >
    </div>
    <div v-else class="btn">
      <el-tag @click="$emit('pl', data)">评论</el-tag>
      <el-popover placement="left" title="转发" width="200" trigger="click">
        <div style="text-align: center;">
          <el-input v-model="zfText" placeholder="您的感受"/>
          <el-button @click="zf" style="margin-top: 10px;">发送</el-button>
        </div>
        <el-tag slot="reference" style="margin-left: 20px">转发</el-tag>
      </el-popover>
    </div>
    <div class="itemHead">
      <div class="headLeft">
        <el-avatar
            :size="50"
          fit="contain"
          :src="data.avatar"
          @click.native="$store.commit('user/setUserId', data.userId)"
        />
      </div>
      <div class="headRight">
        <p class="title">
          <span>{{ data.player }}</span
          ><el-tag style="margin-left: 10px;">{{ data.tag }}</el-tag>
        </p>
        <p class="time">{{ data.time }}</p>
      </div>
    </div>
    <div class="itemContent">
      {{ data.msg }}
      <div
        v-if="(data.tag === '分享单曲' || data.tag === '分享歌单'||/转发/.test(data.tag)) && data.name"
        class="dq"
        @click="$emit('onContent', { type: data.tag, id: data.id })"
      >
        <div class="img">
          <el-image fit="contain" :src="data.pic" />
        </div>
        <div class="contentRight">
          <p class="name">{{ data.name }}</p>
          <p class="nickname">{{ data.nickname }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dtItem",
  props: ["data"],
  data() {
    return {
      zfText: ""
    };
  },
  methods:{
    zf(){
      this.$emit('zf', { text:this.zfText, data:this.data })
      this.zfText = ''
    }
  }
};
</script>

<style lang="less" scoped>
.dtitem {
  margin-top: 20px;
  position: relative;
  .btn {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .itemHead {
    display: flex;
    height: 70px;
    align-items: center;
    .headRight {
      margin-left: 10px;
      height: 70px;
      .title {
        font-size: 20px;
      }
      .time {
        font-size: 15px;
        color: var(--header-color);
      }
    }
  }
  .itemContent {
    cursor: pointer;
    background-color: var(--sider-color);
    padding: 10px;
    margin-top: 10px;
    .dq {
      display: flex;
      height: 80px;
      background-color: var(--selectSide-color);
      padding: 10px;
      margin: 10px;
      .img {
        width: 80px;
      }
      .contentRight {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        .name {
          font-size: 20px;
        }
        .nickname {
          font-size: 15px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
