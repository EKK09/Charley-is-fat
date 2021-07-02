<template>
  <BaseMenu
    ref="menu"
    title="新增待辦清單"
  >
    <div class="wrapper">
      <div class="label">
        標題
      </div>
      <input
        ref="input"
        v-model.trim="title"
        class="label-input"
      >
      <div class="label">
        從...複製項目
      </div>
      <select class="label-select">
        <option
          value
          selected
        >
          (無)
        </option>
      </select>
      <div
        class="save-btn square-border cursor-pointer text-weight-medium"
        tabindex="2"
        @click="handleSubmit"
      >
        新增
      </div>
    </div>
  </BaseMenu>
</template>
<script>
import BaseMenu from 'src/components/menu/BaseMenu.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'AddTodoMenu',
  components: { BaseMenu },

  data() {
    return {
      title: '待辦清單',
    };
  },
  methods: {
    ...mapMutations('dashboard', ['addDialogCardTodo']),
    handleSubmit() {
      if (!this.title) {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 20);
        return;
      }
      this.addDialogCardTodo(this.title);
      this.$refs.menu.$refs.menu.hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper{
  padding: 0 12px;

  .label {
    margin: 4px 0;
    font-weight: 700;
    color: #5e6c84;
    font-size: 12px;
    line-height: 16px;
    display: block;
  }

  .label-input {
    margin: 4px 0 12px;
    color: #172b4d;
    font-weight: 450;
    width: 100%;
    outline: none;
    border: none;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    background-color: #fafbfc;
    box-sizing: border-box;
    -webkit-appearance: none;
    border-radius: 3px;
    display: block;
    line-height: 20px;
    margin-bottom: 12px;
    padding: 8px 12px;
    transition-property: background-color,border-color,box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;

    &:hover {
      background-color: #ebecf0;
      box-shadow: inset 0 0 0 2px #dfe1e6;
    }
    &:focus{
      background-color: #fff;
      box-shadow: inset 0 0 0 2px #0079bf;
    }
  }

  .save-btn {
    background-color: #0079bf;
    color: #fff;
    margin: 8px 4px 0 0;
    padding: 6px 24px;
    display: inline-block;

    &:hover{
      background-color: #026aa7;
    }
  }
  .label-select {
    width: 100%;
    margin-bottom: 14px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }
}
</style>
