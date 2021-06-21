<template>
  <q-btn
    size="md"
    padding="6px"
    unelevated
    class="btn-bg"
  >
    <q-icon
      v-if="icon"
      :name="icon"
      size="20px"
    />
    <slot />
  </q-btn>
</template>
<script>
export default {
  name: 'ButtonBase',
  props: {
    icon: {
      type: String,
      default: undefined,
    },
  },
};
</script>
