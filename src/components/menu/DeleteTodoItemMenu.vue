<template>
  <BaseMenu
    ref="menu"
    title="項目動作"
  >
    <div class="wrapper">
      <div class="list-item">
        轉換為卡片
      </div>
      <div
        class="list-item"
        @click="handleDelete"
      >
        刪除
      </div>
    </div>
  </BaseMenu>
</template>
<script>
import BaseMenu from 'src/components/menu/BaseMenu.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'DeleteTodoItemMenu',
  components: { BaseMenu },
  props: {
    todoIndex: {
      type: Number,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },

  methods: {
    ...mapMutations('dashboard', ['removeDialogCardTodoItem']),
    handleDelete() {
      this.removeDialogCardTodoItem({ todoIndex: this.todoIndex, itemIndex: this.itemIndex });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper{
  color: #172b4d;

.list-item{
  color: #172b4d;
  height: 32px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(9,30,66,.04);
  }
  &:active {
    background-color: #e4f0f6;
  }
}
}
</style>
