<template>
  <div
    ref="wrapper"
    @mouseenter="handleMouseEnter"
  >
    <div
      ref="list"
      class="relative-position todo-list"
      :style="`top: ${top}px; left: ${left}px`"
    >
      <div class="header">
        <div class="header-icon flex flex-center">
          <q-icon
            :name="outlinedCheckBox"
            size="24px"
          />
        </div>
        <div
          class="header-label cursor-pointer"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          @mousemove="handleMouseMove"
        >
          {{ todo.title }}
        </div>
        <q-space />
        <div
          v-show="isShwoToggleFinishBtn"
          class="helper"
          style="margin-right: 8px"
          @click="toggleFinishItem"
        >
          {{ toggleFinishBtnText }}
        </div>
        <div class="helper">
          刪除
        </div>
      </div>
      <div class="progress-bar-wrapper">
        <span class="progress-value">{{ getFinishPercentage(todo) }}%</span>
        <div class="progress-bar-track">
          <div
            class="progress-bar"
            :style="`width: ${getFinishPercentage(todo)}%`"
          />
        </div>
      </div>
      <div ref="itemList">
        <CardTodoItem
          v-for="item in todo.items"
          :key="item.id"
          :todo-item="item"
          :class="(item.isFinish && !isShwoFinishItem) ?'hide': ''"
        />
      </div>
      <div class="add-item-wrapper">
        <div
          v-show="!isShowInput"
          class="helper"
          @click="showInput"
        >
          增加項目
        </div>
        <div v-show="isShowInput">
          <textarea
            ref="textarea"
            v-model="label"
            rows="2"
            placeholder="增加項目"
            class="editable label-input"
            @blur="handleTextareaBlur"
            @input="handleTextareaInput"
          />
          <div
            class="row items-center"
            style="margin-top: 8px"
          >
            <div
              class="save-btn q-py-sm q-px-md square-border cursor-pointer text-weight-medium"
            >
              新增
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
import { outlinedCheckBox } from '@quasar/extras/material-icons-outlined';
import CardTodoItem from 'src/components/dialog/CardTodoItem.vue';

export default {
  name: 'CardTodoList',
  components: { CardTodoItem },
  props: {
    todoIndex: {
      type: Number,
      required: true,
    },
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      outlinedCheckBox,
      label: '',
      isShowInput: false,
      inputHideTimer: null,
      index: 0,
      isShwoFinishItem: true,
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
    ...mapState('dashboard', ['draggingList', 'draggingItem']),
    isShwoToggleFinishBtn() {
      return this.todo.items.some((item) => item.isFinish);
    },
    toggleFinishBtnText() {
      if (this.isShwoFinishItem) {
        return '隱藏已打勾的項目';
      }
      const finishCount = this.todo.items.filter((item) => item.isFinish).length;
      return `顯示已打勾的項目(${finishCount})`;
    },
  },
  created() {
    this.index = this.todoIndex;
  },
  methods: {
    ...mapMutations('dashboard', ['addTodoItem', 'switchDraggingTodo', 'insertDraggingTodoItem']),
    handleTextareaInput() {
      setTimeout(() => {
        this.resetInputheight();
      }, 0);
    },
    toggleFinishItem() {
      this.isShwoFinishItem = !this.isShwoFinishItem;
    },
    resetInputheight() {
      const { textarea } = this.$refs;
      textarea.style.height = 'auto';
      const textareaHeight = textarea.scrollHeight;
      textarea.style.height = `${textareaHeight}px`;
    },
    handleCancelClick() {
      this.isShowInput = false;
    },
    handleCancelFocus() {
      window.clearTimeout(this.inputHideTimer);
    },

    addItem() {
      const item = {
        isFinish: false,
        label: this.label,
      };
      this.addTodoItem({ item, todoIndex: this.todo.todoIndex });
      this.label = '';
    },
    handleTextareaBlur() {
      this.inputHideTimer = setTimeout(() => {
        this.addItem();
        this.isShowInput = false;
      }, 50);
    },
    showInput() {
      this.isShowInput = true;
      setTimeout(() => {
        this.resetInputheight();
        this.$refs.textarea.focus();
      }, 0);
    },
    getFinishPercentage(todo) {
      if (todo.items.length === 0) {
        return 0;
      }
      let finishCount = 0;
      todo.items.forEach((item) => {
        if (item.isFinish) {
          finishCount += 1;
        }
      });

      return Math.ceil((finishCount * 100) / todo.items.length);
    },

    handleMouseUp() {
      console.log('handleMouseUp');
      // const hasClickTextarea = event.path.includes(this.$refs.header.$refs.textarea);
      this.isMousePressing = false;
      // if (this.$refs.header.isFocus() === false && hasClickTextarea) {
      //   this.$refs.header.focus();
      // }
    },
    handleMouseDown(event) {
      console.log('handleMouseDown');

      // if (this.$refs.header.isFocus()) {
      //   console.log('打字中');
      //   return;
      // }
      event.stopPropagation();
      event.preventDefault();
      this.isMousePressing = true;
      this.originY = event.clientY;
      this.offsetY = event.clientY - this.$refs.wrapper.getBoundingClientRect().top;
    },
    handleMouseMove(event) {
      if (!this.isMousePressing || this.isDraggable) {
        return;
      }
      console.log('handleMouseMove');
      const distance = this.getMoveDistanceY(event.y);
      if (distance > 5) {
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
      } = this.$refs.list.getBoundingClientRect();
      this.top = top;
      this.left = left;
      this.$refs.wrapper.style.pointerEvents = 'none';
      document.body.classList.add('grab');
      this.$refs.list.style.width = `${width}px`;
      this.$refs.list.classList.add('draggableNr');
      this.$refs.list.classList.add('dragging');
      this.shadowHeight = height;
      this.isDraggable = true;
      const nodeId = 'dragging-list';
      this.$refs.wrapper.id = nodeId;
      const dragList = {
        id: 'testId',
        node: nodeId,
        index: this.todo.todoIndex,
      };
      this.$store.commit('dashboard/setDraggingList', dragList);
    },
    cancelCardDragable() {
      this.$refs.list.classList.remove('draggableNr');
      this.$refs.list.classList.remove('dragging');
      document.body.classList.remove('grab');
      this.$refs.wrapper.style.removeProperty('pointer-events');
      this.$refs.list.style.removeProperty('width');
      this.$refs.list.style.removeProperty('top');
      this.$refs.list.style.removeProperty('left');
      this.$refs.wrapper.removeAttribute('id');
      this.shadowHeight = 0;
      this.isDraggable = false;
      this.isMousePressing = false;
      this.top = 0;
      this.left = 0;
      // this.index = this.draggingList.index;
      this.$store.commit('dashboard/setDraggingList', null);
    },
    getMoveDistanceY(y) {
      return Math.abs(y - this.originY);
    },
    handleMouseEnter(event) {
      if (this.draggingList === null && this.draggingItem === null) {
        return;
      }
      console.log(`todo handleMouseEnter todoIndex:${this.todo.todoIndex}`);
      const { top, height } = this.$refs.wrapper.getBoundingClientRect();
      const displacementY = event.clientY - top;
      const deltaY = Math.abs(displacementY);
      const isInsertBefore = deltaY > height / 2;
      console.log({ deltaY });

      if (this.draggingItem !== null) {
        const target = document.getElementById(this.draggingItem.node);
        const targetParent = target.parentNode;
        targetParent.removeChild(target);
        const refParent = this.$refs.itemList;
        let itemIndex = 0;
        if (isInsertBefore) {
          refParent.appendChild(target);
          itemIndex = this.todo.items.length;
        } else {
          refParent.prepend(target);
        }
        this.insertDraggingTodoItem({ todoIndex: this.todo.todoIndex, itemIndex });
        return;
      }
      const target = document.getElementById(this.draggingList.node);
      const targetParent = target.parentNode;
      targetParent.removeChild(target);
      const ref = this.$refs.wrapper;
      const refParent = ref.parentNode;

      if (isInsertBefore) {
        refParent.insertBefore(target, ref);
      } else {
        refParent.insertBefore(target, ref.nextSibling);
      }
      // const temp = this.index;
      // this.index = this.draggingList.index;
      this.switchDraggingTodo(this.todo.todoIndex);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 8px 0;
  position: relative;
  margin: 8px 0 4px 40px;
  display: flex;
  align-items: center;
  min-height: 32px;

  .header-icon {
    left: -40px;
    position: absolute;
    top: 8px;
    color: #42526e;
    height: 32px;
    line-height: 32px;
    width: 32px;
    font-size: 24px;
  }

  .header-label {
    width: auto;
    margin: 0;
    min-height: 18px;
    min-width: 40px;
    font-weight: 600;
    font-size: 16px;
  }
}
.save-btn {
  background-color: #0079bf;
  color: #fff;
  margin: 0 4px 0 0;

  &:hover{
    background-color: #026aa7;
  }
}
.helper {
  border-radius: 3px;
  cursor: pointer;
  padding: 6px 12px;
  text-decoration: none;
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;

  &:hover {
    background-color: rgba(9,30,66,.08);
  }
}

.progress-bar-wrapper {
  margin-bottom: 6px;
  position: relative;

  .progress-value {
        color: #5e6c84;
    font-size: 11px;
    line-height: 10px;
    position: absolute;
    left: 0;
    top: -1px;
    text-align: center;
    width: 32px;
  }

  .progress-bar-track {
    background: rgba(9,30,66,.08);
    border-radius: 4px;
    clear: both;
    height: 8px;
    margin: 0 0 0 40px;
    overflow: hidden;
    position: relative;

    .progress-bar {
      background: #5ba4cf;
      bottom: 0;
      left: 0;
      position: absolute;
      top: 0;
      transition-property: width,background;
      transition-duration: .14s;
      transition-timing-function: ease-in;
    }
  }
}
.add-item-wrapper {
  margin-left: 40px;

  .helper {
    display: inline-block;
    margin: 8px 0;
    line-height: 20px;
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

.label-input {
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #0079bf;
  color: #172b4d;
  cursor: text;
  width: 100%;
  resize: vertical;
  float: none;
  padding-bottom: 9px;
  z-index: 50;
  min-height: 32px;
  margin: 4px 0 0;
  font-weight: 400;
}
.hide {
  display: none;
}

.todo-list {
  background-color: #f4f5f7;

  &.dragging {
    opacity: 0.85;
  }
}
.shadow {
  border-radius: 3px;
  background-color: rgba(9,30,66,.04);
}
</style>
