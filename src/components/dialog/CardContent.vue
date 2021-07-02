<template>
  <div class="content">
    <div class="module">
      <div
        class="content-wrapper"
        style="margin-top: 8px"
      >
        <div class="label">
          標籤
        </div>
        <div class="tag-wrapper row wrap">
          <div
            v-for="(tag, index) in dialogCard.tags"
            :key="index"
            class="tag"
            :style="`background-color: #${tag}`"
          />
          <div class="add-tag-btn flex flex-center">
            <q-icon
              name="add"
              size="20px"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="header">
        <div class="header-icon flex flex-center">
          <q-icon
            name="subject"
            size="24px"
          />
        </div>
        <div class="header-label">
          描述
        </div>
        <div
          v-show="dialogCard.desc && !isShowDescriptInput"
          class="helper"
          style="margin-left: 8px"
          @click="showDescriptInput"
        >
          編輯
        </div>
      </div>
      <div class="content-wrapper">
        <div
          v-show="dialogCard.desc && !isShowDescriptInput"
          class="cursor-pointer"
          style="margin-bottom: 8px"
          @click="showDescriptInput"
        >
          {{ dialogCard.desc }}
        </div>
        <div
          v-show="!dialogCard.desc && !isShowDescriptInput"
          class="descript-placehodler"
          @click="showDescriptInput"
        >
          新增更詳細的敘述…
        </div>
        <div v-show="isShowDescriptInput">
          <textarea
            ref="textarea"
            v-model="description"
            rows="5"
            placeholder="新增更詳細的敘述…"
            class="editable descript-input"
            @input="handleTextareaInput"
            @blur="handleTextareaBlur"
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
            <div class="helper">
              格式設定說明
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <CardTodoList
        v-for="todo in dialogCard.todos"
        :key="todo.id"
        :todo="todo"
        class="module"
      />
    </div>
    <div class="module">
      <div class="header">
        <div class="header-icon flex flex-center">
          <q-icon
            name="format_list_numbered_rtl"
            size="24px"
          />
        </div>
        <div class="header-label">
          活動
        </div>
      </div>
      <div class="content-wrapper">
        test
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { outlinedCheckBox } from '@quasar/extras/material-icons-outlined';
import CardTodoList from 'src/components/dialog/CardTodoList.vue';

export default {
  name: 'CardContent',
  components: { CardTodoList },
  data() {
    return {
      outlinedCheckBox,
      description: '',
      isShowDescriptInput: false,
      descriptInputHideTimer: null,
    };
  },
  computed: {
    ...mapState('dashboard', ['dialogCard']),

  },
  methods: {
    ...mapMutations('dashboard', ['setIsShowDialog', 'setDialogCardDesc']),
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
      this.isShowDescriptInput = false;
    },
    handleCancelFocus() {
      window.clearTimeout(this.descriptInputHideTimer);
    },

    setCardDesc() {
      this.setDialogCardDesc(this.description);
      this.description = '';
    },
    handleTextareaBlur() {
      this.descriptInputHideTimer = setTimeout(() => {
        this.setCardDesc();
        this.isShowDescriptInput = false;
      }, 50);
    },
    showDescriptInput() {
      this.description = this.dialogCard.desc;
      this.isShowDescriptInput = true;
      setTimeout(() => {
        this.resetInputheight();
        this.$refs.textarea.focus();
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  float: left;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 24px;
  padding: 0 8px 8px 16px;
  position: relative;
  width: 552px;
  z-index: 0;
  box-sizing: content-box;
}
.module{
  clear: both;
  margin-bottom: 24px;
  position: relative;
}
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

.content-wrapper {
  margin-left: 40px;
}

.descript-placehodler {
  background-color: rgba(9,30,66,.04);
  border-radius: 3px;
  min-height: 40px;
  padding: 8px 12px;
  color: #172b4d;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  &:hover {
    background-color: rgba(9,30,66,.08);
    color: #091e42;
  }
  &:active {
    background-color: #e4f0f6;
    color: #0079bf;
  }
}
.descript-input {
  min-height: 108px;
  background: #fff;
  box-shadow: none;
  resize: none;
  margin-bottom: 4px;
  box-sizing: border-box;
  font-weight: 400;

  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
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
.label {
  font-weight: 700;
  color: #5e6c84;
  font-size: 12px;
  line-height: 20px;
  display: block;
  margin: 0 8px 4px 0;
}
.tag {
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  float: left;
  font-weight: 600;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 4px 0;
  min-width: 40px;
  padding: 0 12px;
  width: auto;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
}

.add-tag-btn {
  width: 32px;
  height: 32px;
  background-color: rgba(9,30,66,.04);
  border-radius: 3px;
  cursor: pointer;
  float: left;
  margin: 0 4px 4px 0;

  &:hover {
    background-color: rgba(9,30,66,.08);
  }
}
</style>
