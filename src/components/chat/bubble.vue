<template>
  <div class="bubble">
    <div class="self" v-if="isSelf">
      <avatar :name="user.name" :src="user.avatar">
        <template v-slot:time>
          <p>{{ time.time }}</p>
        </template>
        <template v-slot:content>
          <div @click="onDetail" v-if="detail" class="detail">
            <img :src="detail.img"/>
            <div class="right">
              <p><el-tag>分享{{detail.type}}</el-tag></p>
              <p>{{detail.name}}</p>
            </div>
          </div>
          <div v-else class="messagebox">
            {{ message }}
          </div>
        </template>
      </avatar>
    </div>
    <div class="other" v-else>
      <avatar :name="user.name" :src="user.avatar">
        <template v-slot:time>
          <p>{{ time.time }}</p>
        </template>
        <template v-slot:content>
          <div @click="onDetail" v-if="detail" class="detail">
            <img :src="detail.img"/>
            <div class="right">
              <p><el-tag>分享{{detail.type}}</el-tag></p>
              <p>{{detail.name}}</p>
            </div>
          </div>
          <div v-else class="messagebox">
            {{ message }}
          </div>
        </template>
      </avatar>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/chat/avatar";
export default {
  name: "bubble",
  components: { Avatar },
  props: {
    user: {
      default: {
        name: "默认名",
        avatar: ""
      }
    },
    message: {
      default: ""
    },
    time: {
      default: {
        date: "",
        time: ""
      }
    },
    isSelf: {
      default: false
    },
    detail:{
      default:false
    }
  },
  methods:{
    onDetail(){
      this.$emit('onDetail',this.detail)
    }
  }
};
</script>

<style lang="less" scoped>
.bubble {
  & /deep/ .avatar-h {
    width: fit-content;
  }
  .other {
    .messagebox {
      background-color: var(--selectSide-color);
      padding: 20px;
      border-radius: 10px;
      margin-left: 40px;
      position: relative;
      font-size: 20px;
      width: fit-content;
      min-width: 200px;
      text-align: center;
      &:after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        top: -20px;
        left: 20px;
        border-bottom: 10px solid var(--selectSide-color);
        border-top: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
    }
  }
  .self {
    & /deep/ .avatar {
      align-items: flex-end;
    }
    .messagebox {
      background-color: var(--selectSide-color);
      padding: 20px;
      border-radius: 10px;
      position: relative;
      font-size: 20px;
      width: fit-content;
      margin-right: 40px;
      min-width: 200px;
      text-align: center;
      &:after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        top: -20px;
        right: 150px;
        border-bottom: 10px solid var(--selectSide-color);
        border-top: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
    }
  }
  .detail{
    display: flex;
    padding: 20px;
    cursor: pointer;
    box-sizing: border-box;
    background-color: var(--selectSide-color);
    border-radius: 10px;
    width: 100%;
    opacity: 0.9;
    img{
      width: 100px;
    }
    .right{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      font-size: 30px;
      margin-left: 20px;
      p{
        max-width: 400px;
      }
    }
  }
}
</style>
