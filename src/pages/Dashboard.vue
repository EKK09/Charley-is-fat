<template>
  <q-page class="column">
    <DashboardHeader />
    <div class="col relative-position">
      <DashBoardBody />
    </div>
    <CardDialog />
  </q-page>
</template>

<script>
import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue';
import DashBoardBody from 'src/components/dashboard/DashBoardBody.vue';
import CardDialog from 'src/components/dialog/CardDialog.vue';

export default {
  name: 'Dashboard',
  components: { DashboardHeader, DashBoardBody, CardDialog },
};
</script>
