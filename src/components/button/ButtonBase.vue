<template>
  <q-btn
    size="16px"
    padding="6px"
    unelevated
    class="btn-bg"
  >
    <div class="row no-wrap">
      <q-icon
        v-if="icon"
        :name="icon"
        size="20px"
      />
      <slot />
    </div>
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
