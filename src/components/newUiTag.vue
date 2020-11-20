<template>
  <ul class="tags">
    <li v-for="item in tags" :key="item.id">
      <a
        @click="$emit('change', item)"
        :class="{ select: item.value === tag }"
        >{{ item.name }}</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "newUiTag",
  props: ["tags", "tag"]
};
</script>

<style lang="less" scoped>
.tags {
  text-align: left;
  li {
    list-style: none;
    display: inline-block;
    margin-right: 30px;
    a {
      text-decoration: none;
      font-size: 20px;
      cursor: pointer;
      color: #000000;
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
