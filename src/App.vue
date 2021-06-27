<template>
  <div
    id="q-app"
    :style="`background-color: #${bgColorCode}`"
  >
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('dashboard', ['bgColorCode']),
  },
};
</script>
