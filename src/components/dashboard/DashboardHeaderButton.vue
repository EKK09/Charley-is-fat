<template>
  <div
    class="button-base"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DashboardHeaderButton',
  props: {
    padding: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    style() {
      if (!this.padding) {
        return null;
      }
      return `padding: ${this.padding}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.button-base {
  display: inline-block;
  white-space: nowrap;
  height: 32px;
  padding: 6px 5px;
  color: white;
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
}

.button-base:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
