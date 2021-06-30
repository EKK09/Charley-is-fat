<template>
  <div class="todo-wrapper">
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
          @focus="showInput"
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
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CardTodoItem',
  props: {
    todoItem: {
      type: Object,
      required: true,
    },
    todoIndex: {
      type: Number,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isShowInput: false,
      label: '',
      inputHideTimer: null,
      localTodoIndex: 0,
      localItemIndex: 0,
    };
  },
  created() {
    this.localTodoIndex = this.todoIndex;
    this.localItemIndex = this.itemIndex;
  },

  methods: {
    ...mapMutations('dashboard', ['updateTodoItem']),

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
      const item = {
        ...this.todoItem,
        isFinish: !this.todoItem.isFinish,
      };
      this.updateItem(item);
    },
    handleTextareaInput() {
      setTimeout(() => {
        this.resetInputheight();
      }, 0);
    },
    updateItem(item) {
      this.updateTodoItem({
        todoIndex: this.localTodoIndex,
        itemIndex: this.localItemIndex,
        item,
      });
    },
    handleCancelClick() {
      this.isShowInput = false;
    },
    handleCancelFocus() {
      window.clearTimeout(this.inputHideTimer);
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
</style>