<template>
  <div class="btn-wrapper">
    <span class="icon"><slot name="icon" /></span>
    <span class="label"><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'CardSideButton',
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 32px;
  margin-top: 8px;
  max-width: 300px;
  overflow: hidden;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  &:hover{
    background-color: rgba(9,30,66,.08);
    box-shadow: none;
    border: none;
  }

  &.revert {
    background-color: transparent;

    &:hover{
    background-color: rgba(9,30,66,.04);
    box-shadow: none;
    border: none;
  }
  }
}
.icon {
  margin: 0 6px 0 -4px;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  width: 20px;
}
</style>
