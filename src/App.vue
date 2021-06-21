<template>
  <div
    id="q-app"
    :class="`bg-${bgColor}`"
  >
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      bgColor: 'secondary',
    };
  },
};
</script>
