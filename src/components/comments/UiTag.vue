<template>
  <ul class="tags">
    <li v-for="item in tags" :key="item.id">
      <a
        @click="$emit('change', item.name)"
        :class="{ select: item.name === tag }"
        >{{ item.name }}</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "UiTag",
  props: ["tags", "tag"]
};
</script>

<style lang="less" scoped>
.tags {
  text-align: right;
  li {
    list-style: none;
    display: inline-block;
    margin-right: 30px;
    a {
      text-decoration: none;
      font-size: 20px;
      cursor: pointer;
      color: black;
      &:hover {
        color: var(--selectSide-color);
      }
    }
    .select {
      color: var(--header-color);
    }
  }
}
</style>
