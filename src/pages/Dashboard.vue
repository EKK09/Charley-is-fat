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
  mounted() {
    const { cardId } = this.$route.params;
    if (cardId) {
      this.$store.commit('dashboard/showCardDialog', cardId);
    }
  },
  created() {
    window.addEventListener('beforeunload', (e) => {
      this.setDashBoard();
      e.preventDefault();
      delete e.returnValue;
    });
  },
  methods: {
    setDashBoard() {
      this.$store.dispatch('dashboard/setDashboardAction');
    },
  },
};
</script>
