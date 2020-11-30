<template>
  <div class="toComments">
    <div class="avatar">
      <el-avatar :size="50" :src="avatar" />
    </div>
    <div class="textArea">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4 }"
        placeholder="请输入内容"
        v-model="contentText"
      >
      </el-input>
      <div style="text-align: right">
        <el-button type="primary" @click="onSend">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toComments",
  props: ["avatar"],
  data() {
    return {
      contentText: ""
    };
  },
  methods: {
    onSend() {
      if (this.contentText === "") {
        this.$message.warning("评论不能为空！");
        return;
      }
      this.$emit("onSend", this.contentText);
      this.contentText = "";
    }
  }
};
</script>

<style lang="less" scoped>
.toComments{
  display: flex;
  .avatar{
    margin-right: 20px;
    width: 80px;
    margin-top: 10px;
  }
  .textArea{
    width: 90%;
    div{
      margin: 10px 0;
    }
  }
}
</style>
