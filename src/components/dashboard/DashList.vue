<template>
  <div class="dash-list-wraper">
    <div class="dash-list">
      <DashListHeader />
      <div class="dash-card-list-wrapper">
        <DashCard
          v-for="(id, index) in cardIds"
          :id="id"
          :key="index"
        />
      </div>
      <DashListFooter />
    </div>
  </div>
</template>

<script>
import DashListHeader from 'src/components/dashboard/DashListHeader.vue';
import DashListFooter from 'src/components/dashboard/DashListFooter.vue';
import DashCard from 'src/components/dashboard/DashCard.vue';

export default {
  name: 'DashList',
  components: { DashListHeader, DashListFooter, DashCard },
  props: {
    cardIds: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.dash-list-wraper {
  width: 272px;
  margin: 0 4px;
  // white-space: nowrap;
}
.dash-list {
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
}
.dash-card-list-wrapper {
  padding: 0 4px;
  margin: 0 4px;
}
</style>
