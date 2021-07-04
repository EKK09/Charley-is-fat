<template>
  <div
    v-if="todoItem"
    ref="wrapper"
    class="non-selectable"
    @mouseenter="handleMouseEnter"
  >
    <div
      ref="todo"
      class="todo-wrapper"
      :style="`top: ${top}px; left: ${left}px`"
    >
      <div
        class="todo-checkbox flex-center flex"
        :class="todoItem.isFinish?'checked': ''"
        @click="toggleItemIsFinish"
      >
        <q-icon
          name="done"
          color="white"
          class="checkbox-icon"
        />
      </div>
      <div>
        <div
          v-show="!isShowInput"
          class="todo-content-wrapper row"
        >
          <div
            class="todo-content col"
            :class="todoItem.isFinish?'checked': ''"
            tabindex="1"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @mousemove="handleMouseMove"
          >
            {{ todoItem.label }}
          </div>
          <div class="option row">
            <div class="option-item flex flex-center">
              <q-icon name="schedule" />
            </div>
            <div class="option-item flex flex-center round">
              <q-icon name="person_add_alt" />
            </div>
            <div class="option-item flex flex-center">
              <q-icon name="more_horiz" />
              <DeleteTodoItemMenu
                :todo-index="todoItem.todoIndex"
                :item-index="todoItem.itemIndex"
              />
            </div>
          </div>
        </div>
        <div
          v-show="isShowInput"
          style="padding-bottom: 9px;"
        >
          <textarea
            ref="textarea"
            v-model="label"
            rows="2"
            class="label-input"
            @blur="handleTextareaBlur"
            @input="handleTextareaInput"
          />
          <div class="row items-center">
            <div
              class="save-btn q-py-sm q-px-md square-border cursor-pointer text-weight-medium"
            >
              儲存
            </div>
            <q-icon
              tabindex="2"
              size="24px"
              name="close"
              style="color: #42526e; margin-left: 7px"
              class="cursor-pointer"
              @focus="handleCancelFocus"
              @click="handleCancelClick"
            />
            <q-space />
            <div class="row items-center check-option no-wrap">
              <q-icon
                name="person_add_alt"
              />
              <div class="check-option-label">
                指派
              </div>
            </div>
            <div class="row items-center check-option no-wrap">
              <q-icon
                name="schedule"
              />
              <div class="check-option-label">
                到期日
              </div>
            </div>
            <div class="row items-center check-option no-wrap">
              <q-icon
                name="sentiment_satisfied_alt"
              />
            </div>
            <div class="row items-center check-option no-wrap">
              <q-icon
                name="alternate_email"
              />
            </div>
            <div class="row items-center check-option no-wrap">
              <q-icon
                name="more_horiz"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="shadow"
      :style="`height: ${shadowHeight}px`"
    />
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import DeleteTodoItemMenu from 'src/components/menu/DeleteTodoItemMenu.vue';

export default {
  name: 'CardTodoItem',
  components: { DeleteTodoItemMenu },
  props: {
    todoItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowInput: false,
      label: '',
      inputHideTimer: null,

      shadowHeight: 0,
      top: 0,
      left: 0,
      isMousePressing: false,
      isDraggable: false,
      originY: 0,
      offsetY: 0,
    };
  },
  computed: {
    ...mapState('dashboard', ['draggingItem']),
  },

  methods: {
    ...mapMutations('dashboard', [
      'updateTodoItem',
      'setDraggingItem',
      'switchDraggingTodoItem',
      'removeEmptyTodoItem',
      'toggleTodoItemStatus',
    ]),

    showInput() {
      this.isShowInput = true;
      this.label = this.todoItem.label;
      setTimeout(() => {
        this.resetInputheight();
        this.$refs.textarea.focus();
      }, 20);
    },
    resetInputheight() {
      const { textarea } = this.$refs;
      textarea.style.height = 'auto';
      const textareaHeight = textarea.scrollHeight;
      textarea.style.height = `${textareaHeight}px`;
    },
    handleTextareaBlur() {
      this.inputHideTimer = setTimeout(() => {
        this.setItemLabel();
        this.isShowInput = false;
      }, 50);
    },
    setItemLabel() {
      const item = {
        ...this.todoItem,
        label: this.label,
      };
      this.updateItem(item);
    },
    toggleItemIsFinish() {
      this.toggleTodoItemStatus({
        todoIndex: this.todoItem.todoIndex,
        itemIndex: this.todoItem.itemIndex,
      });
    },
    handleTextareaInput() {
      setTimeout(() => {
        this.resetInputheight();
      }, 0);
    },
    updateItem(item) {
      this.updateTodoItem({
        todoIndex: this.todoItem.todoIndex,
        itemIndex: this.todoItem.itemIndex,
        item,
      });
    },
    handleCancelClick() {
      this.isShowInput = false;
    },
    handleCancelFocus() {
      window.clearTimeout(this.inputHideTimer);
    },

    handleMouseUp() {
      if (this.isMousePressing === false) {
        return;
      }
      console.log('handleMouseUp');
      this.isMousePressing = false;
      this.showInput();
    },
    handleMouseDown(event) {
      console.log('handleMouseDown');
      console.log({ todo: this.todoItem.todoIndex, index: this.todoItem.itemIndex });
      event.stopPropagation();
      event.preventDefault();
      this.isMousePressing = true;
      this.originY = event.clientY;
      this.offsetY = event.clientY - this.$refs.todo.getBoundingClientRect().top;
    },
    handleMouseMove(event) {
      if (!this.isMousePressing || this.isDraggable) {
        return;
      }
      console.log('handleMouseMove');
      const distance = this.getMoveDistanceY(event.y);
      if (distance > 1) {
        this.setCardDragable();
        window.addEventListener('mousemove', this.handleWindowMouseMove);
        window.addEventListener('mouseup', this.handleWindowMouseUp);
      }
    },
    handleWindowMouseUp() {
      console.log('handleWindowMouseUp');
      this.cancelCardDragable();
      window.removeEventListener('mousemove', this.handleWindowMouseMove);
      window.removeEventListener('mouseup', this.handleWindowMouseUp);
    },
    handleWindowMouseMove(event) {
      this.top = event.clientY - this.offsetY;
      this.left = event.clientX - this.offsetX;
    },
    setCardDragable() {
      const {
        height, width, top, left,
      } = this.$refs.todo.getBoundingClientRect();
      this.top = top;
      this.left = left;
      this.$refs.wrapper.style.pointerEvents = 'none';
      document.body.classList.add('grab');
      this.$refs.todo.style.width = `${width}px`;
      this.$refs.todo.classList.add('draggableNr');
      this.$refs.todo.classList.add('dragging');
      this.shadowHeight = height;
      this.isDraggable = true;
      const nodeId = 'dragging-list';
      this.$refs.wrapper.id = nodeId;
      const dragItem = {
        node: nodeId,
        item: this.todoItem,
      };
      this.setDraggingItem(dragItem);
    },
    cancelCardDragable() {
      this.$refs.todo.classList.remove('draggableNr');
      this.$refs.todo.classList.remove('dragging');
      document.body.classList.remove('grab');
      this.$refs.wrapper.style.removeProperty('pointer-events');
      this.$refs.todo.style.removeProperty('width');
      this.$refs.todo.style.removeProperty('top');
      this.$refs.todo.style.removeProperty('left');
      this.$refs.wrapper.removeAttribute('id');
      this.shadowHeight = 0;
      this.isDraggable = false;
      this.isMousePressing = false;
      this.top = 0;
      this.left = 0;
      this.setDraggingItem(null);
      this.removeEmptyTodoItem();
    },
    getMoveDistanceY(y) {
      return Math.abs(y - this.originY);
    },
    handleMouseEnter(event) {
      if (this.draggingItem === null) {
        return;
      }
      console.log(`item handleMouseEnter todoIndex:${this.todoItem.todoIndex} index:${this.todoItem.itemIndex}`);
      const { top, height } = this.$refs.wrapper.getBoundingClientRect();
      const displacementY = event.clientY - top;
      const deltaY = Math.abs(displacementY);
      const isInsertBefore = deltaY > height / 2;
      console.log({ deltaY, height });

      const ref = this.$refs.wrapper;
      const refParent = ref.parentNode;
      const target = document.getElementById(this.draggingItem.node);

      const targetParent = target.parentNode;
      targetParent.removeChild(target);

      if (isInsertBefore) {
        refParent.insertBefore(target, ref);
      } else {
        refParent.insertBefore(target, ref.nextSibling);
      }
      this.switchDraggingTodoItem(this.todoItem);
    },
  },
};
</script>
<style lang="scss" scoped>
.todo-wrapper {
  clear: both;
  padding-left: 40px;
  position: relative;
  border-radius: 3px;
  transform-origin: left bottom;
  transition-property: transform,opacity,height,padding,margin;
  transition-duration: .14s;
  transition-timing-function: ease-in;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: rgba(9,30,66,.04);

    .option {
      visibility: visible;
    }
  }
}

.todo-checkbox {
  border-radius: 2px;
  height: 16px;
  width: 16px;
  overflow: hidden;
  white-space: nowrap;
  transition: all .2s ease-in-out;
  background-color: #fafbfc;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  position: absolute;
  top: 5px;
  left: 0;
  margin: 6px;

  &:hover {
    background-color: #ebecf0;
    box-shadow: inset 0 0 0 2px #dfe1e6;
  }

  .checkbox-icon {
    visibility: hidden;
  }

  &.checked {
    box-shadow: inset 0 0 0 2px #0079bf;
    background-color: #0079bf;
    .checkbox-icon {
      visibility: visible;
    }
  }

}
.todo-content-wrapper {
  padding: 6px 0;
}

.todo-content{
  line-height: 20px;
  align-self: center;
  &.checked {
    text-decoration: line-through;
  }
}
.option {
  visibility: hidden;
}
.option-item {
  margin-left: 4px;
  height: 24px;
  width: 24px;
  background-color: rgba(9, 30, 66, 0.04);
  border-radius: 3px;
  cursor: pointer;

  &:hover{
    background-color: rgba(9,30,66,.08);
  }
}

.round{
  border-radius: 50%;
}
.label-input {
  overflow: hidden;
  width: 100%;
  overflow-wrap: break-word;
  resize: none;
  background: rgba(9,30,66,.04);
  border-color: rgba(9,30,66,.13);
  box-shadow: inset 0 0 0 1px rgb(9 30 66 / 13%);
  margin-bottom: 4px;
  outline: none;
  border: none;
  padding: 8px 12px;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  box-sizing: border-box;
  -webkit-appearance: none;
  border-radius: 3px;
}

.save-btn {
  background-color: #0079bf;
  color: #fff;
  margin: 0 4px 0 0;

  &:hover{
    background-color: #026aa7;
  }
}
.check-option {
  border-color: transparent;
  border-radius: 3px;
  color: #5e6c84;
  margin: 0 2px;
  padding: 6px 8px;
  max-width: 160px;
  line-height: 20px;
  height: 20px;
  box-sizing: content-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover{
    background-color: rgba(9,30,66,.08);
    color: #172b4d;
  }

  .check-option-label {
    text-decoration: underline;
  }
}
.todo-wrapper {
  background-color: #f4f5f7;

  &.dragging {
    opacity: 0.9;
  }
}
.draggableNr {
  position: fixed;
  z-index: 10000;
  cursor: grabbing;
}
.shadow {
  border-radius: 3px;
  background-color: rgba(9,30,66,.04);
}
</style>
