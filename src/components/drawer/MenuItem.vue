<template>
  <div class="wrapper">
    <div class="text-weight-bolder">
      <slot />
    </div>
    <div class="icon-wrapper absolute-top-left">
      <slot name="header" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 6px 6px 6px 40px;
  position: relative;
  border-radius: 3px;
  display: block;
  font-weight: 800;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  color: #172b4d;

  &:hover {
    background-color: rgba(9,30,66,.08);
    color: #091e42;
  }
}

.icon-wrapper {
  top: 6px;
  left: 12px;
}
</style>
