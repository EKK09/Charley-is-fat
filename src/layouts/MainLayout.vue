<template>
  <q-layout view="hHh lpR fFf">
    <Header />
    <Drawer />

    <q-page-container>
      <Dashboard />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'src/components/Header.vue';
import Drawer from 'src/components/drawer/Drawer.vue';
import Dashboard from 'src/pages/Dashboard.vue';

export default {
  components: { Header, Dashboard, Drawer },
};
</script>
