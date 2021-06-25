<template>
  <div class="absolute fit row no-wrap list-wrapper">
    <DashList
      v-for="(column, index) in columns"
      :key="index"
      :card-ids="column"
    />
    <AddColumn />
  </div>
</template>

<script>
import AddColumn from 'src/components/dashboard/AddColumn.vue';
import DashList from 'src/components/dashboard/DashList.vue';

export default {
  name: 'DashBoardBody',
  components: { AddColumn, DashList },
  data() {
    return {};
  },
  computed: {
    columns() {
      return this.$store.state.dashboard.columns;
    },
  },
};
</script>
<style lang="scss" scoped>
.list-wrapper > div:first-child {
  margin-left: 8px;
}
</style>
