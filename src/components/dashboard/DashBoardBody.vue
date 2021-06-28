<template>
  <div class="row no-wrap list-wrapper">
    <DashList
      v-for="(column, index) in columns"
      :key="index"
      :column="column"
      :index="index"
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

.list-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 12px;
    width: 12px;
  }
  &::-webkit-scrollbar-button {
    background: transparent;
    display: block;
    height: 4px;
    width: 4px;
  }

  &::-webkit-scrollbar-track-piece {
   background: rgba(0,0,0,.15);
    &:vertical:start {
      border-radius: 4px 4px 0 0;
    }
    &:vertical:end {
      border-radius: 0 0 4px 4px;
    }
    &:horizontal:start {
      border-radius: 4px 0 0 4px;
    }
    &:horizontal:end {
      border-radius: 0 4px 4px 0;
    }
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.5);
    border-radius: 4px;
    display: block;
    height: 48px;
  }

}
.list-wrapper > div:first-child {
  margin-left: 8px;
}
</style>
