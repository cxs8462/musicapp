<template>
  <el-card
    :body-style="{ padding: '0px' }"
    @click.native="
      () => {
        $emit('onCard', id);
      }
    "
  >
    <el-image :src="img+'?param=300y300'" class="image" lazy/>
    <div style="padding: 14px;">
      <div>
        <span class="title">{{ title }}</span>
        <p class="ms">{{ ms }}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "cardItem",
  props: ["img", "title", "ms", "id"]
};
</script>

<style scoped>
.title {
  font-size: 20px;
}
.ms {
  font-size: 22px;
  color: darkgray;
}
</style>
