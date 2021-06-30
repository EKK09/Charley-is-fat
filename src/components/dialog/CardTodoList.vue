<template>
  <div>
    <div class="header">
      <div class="header-icon flex flex-center">
        <q-icon
          :name="outlinedCheckBox"
          size="24px"
        />
      </div>
      <div class="header-label">
        {{ todo.title }}
      </div>
      <q-space />
      <div
        class="helper"
        style="margin-right: 8px"
      >
        隱藏已打勾的項目
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
    <div>
      <CardTodoItem
        v-for="(item, index) in todo.items"
        :key="index"
        :todo-item="item"
        :todo-index="todoIndex"
        :item-index="index"
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
</template>
<script>
import { mapMutations } from 'vuex';
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
    };
  },
  created() {
    this.index = this.todoIndex;
  },
  methods: {
    ...mapMutations('dashboard', ['addTodoItem']),
    handleTextareaInput() {
      setTimeout(() => {
        this.resetInputheight();
      }, 0);
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
      this.addTodoItem({ item, todoIndex: this.index });
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
      let finishCount = 0;
      todo.items.forEach((item) => {
        if (item.isFinish) {
          finishCount += 1;
        }
      });

      return Math.ceil((finishCount * 100) / todo.items.length);
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
</style>
