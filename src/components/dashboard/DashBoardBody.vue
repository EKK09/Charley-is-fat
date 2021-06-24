<template>
  <div class="window-width row no-wrap wrapper">
    <DashList />
    <DashList />
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
};
</script>
<style lang="scss" scoped>
div:first-child {
  margin-left: 8px;
}
</style>
