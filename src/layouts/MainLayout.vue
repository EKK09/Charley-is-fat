<template>
  <q-layout view="hHh lpR fFf">
    <Header />
    <q-drawer
      v-model="right"
      side="right"
    >
      <div
        class="bg-red"
      >
        test
      </div>
    </q-drawer>

    <q-page-container>
      <Dashboard />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'src/components/Header.vue';
import Dashboard from 'src/pages/Dashboard.vue';

export default {
  components: { Header, Dashboard },
  data() {
    return {
      right: false,
    };
  },
};
</script>
