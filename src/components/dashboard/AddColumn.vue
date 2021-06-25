<template>
  <div class="dash-column row items-center fz-md">
    <q-icon
      name="add"
      size="20px"
      style="margin-right: 2px"
    />
    新增其他列表
  </div>
</template>
<script>
export default {
  name: 'AddColumn',
};
</script>
<style lang="scss" scoped>
.dash-column {
  width: 272px;
  min-width: 272px;
  margin: 0 4px;
  white-space: nowrap;
  background-color: hsla(0,0%,100%,.24);
  color: white;
  cursor: pointer;
  border-radius: 3px;
  height: 40px;
  min-height: 32px;
  padding: 10px 12px;
  transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
  line-height: 20px;
}
.dash-column:hover {
   background-color: hsla(0,0%,100%,.32);
}
</style>
