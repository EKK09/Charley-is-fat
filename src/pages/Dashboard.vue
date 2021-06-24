<template>
  <q-page class="column">
    <DashboardHeader />
    <DashBoardBody class="col" />
  </q-page>
</template>

<script>
import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue';
import DashBoardBody from 'src/components/dashboard/DashBoardBody.vue';

export default {
  name: 'Dashboard',
  components: { DashboardHeader, DashBoardBody },
};
</script>
