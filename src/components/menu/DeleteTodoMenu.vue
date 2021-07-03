<template>
  <BaseMenu
    ref="menu"
    :title="`要刪除 ${title} 嗎？`"
  >
    <div class="wrapper">
      <div class="q-mb-sm">
        刪除待辦清單是永久性的，無法復原。
      </div>
      <div
        class="btn flex flex-center"
        @click="handleDelete"
      >
        刪除待辦清單
      </div>
    </div>
  </BaseMenu>
</template>
<script>
import BaseMenu from 'src/components/menu/BaseMenu.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'DeleteTodoMenu',
  components: { BaseMenu },
  props: {
    title: {
      type: String,
      required: true,
    },
    todoIndex: {
      type: Number,
      required: true,
    },
  },

  methods: {
    ...mapMutations('dashboard', ['removeDialogCardTodo']),
    handleDelete() {
      this.removeDialogCardTodo(this.todoIndex);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper{
  padding: 0 12px;
  color: #172b4d;

  .btn {
    background-color: #b04632;
    color: #fff;
    border-radius: 3px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background-color: #933b27;
    }

    &:active {
      background-color: #6e2f1a;
    }
  }
}
</style>
