<template>
  <q-menu
    ref="menu"
    max-width="304px"
    max-height="100vh"
    :offset="[0,8]"
    transition-show="none"
    transition-hide="none"
  >
    <div class="menu-wrapper">
      <div class="menu-header relative-position flex flex-center">
        {{ title }}
        <div
          class="close-btn absolute-top-right row justify-end items-center"
          @click="hide"
        >
          <q-icon
            name="close"
            style="color:inherit"
            size="16px"
          />
        </div>
      </div>
      <slot />
    </div>
  </q-menu>
</template>
<script>
export default {
  name: 'BaseMenu',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    hide() {
      this.$refs.menu.hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  overflow: hidden;
  width: 304px;
  padding-bottom: 12px;
  user-select: none;
}

.menu-header{
  color: #5e6c84;
  line-height: 40px;
  border-bottom: 1px solid rgba(9,30,66,.13);
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 40px;
  margin-bottom: 8px;
  font-weight: 450;
}

.close-btn {
  color: #6b778c;
  padding: 10px 12px 10px 8px;
  height: 40px;
  font-size: 16px;
  line-height: 20px;
  width: 40px;
  cursor: pointer;

  &:hover{
    color: #172b4d;
  }
}
</style>
