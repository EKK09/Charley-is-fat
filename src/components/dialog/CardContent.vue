<template>
  <div class="content">
    <div class="module">
      <div
        class="content-wrapper row"
        style="margin-top: 8px"
      >
        <div
          v-show="dialogCard.hasMember"
          style="margin-right: 8px"
        >
          <div class="label">
            成員
          </div>
          <div class="tag-wrapper row wrap">
            <q-avatar
              size="32px"
              class="q-mr-sm cursor-pointer"
            >
              <img
                src="/images/user.jpeg"
                style="object-fit: cover"
              >
            </q-avatar>
            <div
              class="add-tag-btn flex flex-center"
              style="border-radius: 50%"
            >
              <q-icon
                name="add"
                size="20px"
              />
              <AddMemberMenu />
            </div>
          </div>
        </div>
        <div>
          <div class="label">
            標籤
          </div>
          <div class="tag-wrapper row wrap">
            <div
              v-for="(tag, index) in dialogCard.tags"
              :key="index"
              class="tag"
              :style="`background-color: #${tag}`"
            >
              <AddTagMenu />
            </div>
            <div class="add-tag-btn flex flex-center">
              <q-icon
                name="add"
                size="20px"
              />
              <AddTagMenu />
            </div>
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
        <q-space />
        <div
          v-show="dialogCard.actions.length > 0"
          class="helper"
          @click="toggleActionList"
        >
          {{ isShowActions?'隱藏詳情': '顯示詳情' }}
        </div>
      </div>
      <div
        class="action relative-position"
        style="padding-top: 0"
      >
        <q-avatar
          size="32px"
          class="cursor-pointer absolute-top-left"
        >
          <img
            src="/images/user.jpeg"
            style="object-fit: cover"
          >
        </q-avatar>
        <div
          class="comment-wrapper relative-position"
          :class="isShowCommentBtn? 'show':''"
        >
          <textarea
            ref="comment"
            rows="1"
            class="comment-input"
            placeholder="撰寫評論"
            @input="handleCommentInput"
            @focus="toggleShowCommentBtn"
            @blur="toggleShowCommentBtn"
          />
          <div
            class="comment-btn-wrapper row items-center absolute-bottom-left full-width"
          >
            <div
              class="save-btn q-py-sm q-px-md square-border text-weight-medium"
            >
              儲存
            </div>
            <q-space />

            <div
              v-for="(icon, index) in commentBtnIcons"
              :key="index"
              class="flex flex-center comment-btn"
            >
              <q-icon
                size="16px"
                :name="icon"
                style="color: inherit"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="isShowActions"
        class="action-list-wrapper"
      >
        <div
          v-for="(action, index) in dialogCard.actions"
          :key="index"
          class="action relative-position"
        >
          <q-avatar
            size="32px"
            class="cursor-pointer absolute-top-left"
            style="margin-top:8px"
          >
            <img
              src="/images/user.jpeg"
              style="object-fit: cover"
            >
          </q-avatar>
          <div class="text">
            <span class="name cursor-pointer">查理布朗</span>
            {{ action.text }}
          </div>
          <div class="time">
            {{ getFriendilyTimeString(action.time) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { outlinedCheckBox } from '@quasar/extras/material-icons-outlined';
import CardTodoList from 'src/components/dialog/CardTodoList.vue';
import AddTagMenu from 'src/components/menu/AddTagMenu.vue';
import AddMemberMenu from 'src/components/menu/AddMemberMenu.vue';
import { getFriendilyTimeString } from 'src/common/datetimeHelper';

export default {
  name: 'CardContent',
  components: { CardTodoList, AddTagMenu, AddMemberMenu },
  data() {
    return {
      outlinedCheckBox,
      description: '',
      isShowDescriptInput: false,
      descriptInputHideTimer: null,
      getFriendilyTimeString,
      isShowActions: true,
      isShowCommentBtn: false,
      commentBtnIcons: [
        'attachment',
        'alternate_email',
        'sentiment_satisfied_alt',
        'laptop',
      ],
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
    toggleActionList() {
      this.isShowActions = !this.isShowActions;
    },
    toggleShowCommentBtn() {
      this.isShowCommentBtn = !this.isShowCommentBtn;
    },
    handleCommentInput() {
      setTimeout(() => {
        this.resetCommentInputheight();
      }, 0);
    },
    resetCommentInputheight() {
      const { comment } = this.$refs;
      comment.style.height = 'auto';
      comment.style.height = `${comment.scrollHeight}px`;
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
  &:active {
    background-color: #e4f0f6;
    color: #0079bf;
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

.action {
  padding: 8px 0 8px 40px;
  position: relative;
  min-height: 32px;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  word-wrap: break-word;
  .name {
    font-weight: 700;
    margin-right: 4px;
  }

  .time {
    color: #5e6c84;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: #172b4d;
      text-decoration: underline;
    }
  }
}

.comment-wrapper {
  padding: 8px 12px;
  transition-duration: 85ms;
  transition-timing-function: ease;
  transition-property: padding-bottom;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  font-weight: 400;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  &.show {
    padding-bottom: 56px;
    box-shadow: 0 4px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);

    .comment-btn-wrapper {
      display: flex;
    }
  }
  .comment-input {
    height: 20px;
    color: #172b4d;
    border: none;
    outline: none;
    box-shadow: none;
    margin: 0;
    min-height: 20px;
    padding: 0;
    resize: none;
    width: 100%;
    box-sizing: border-box;

    &::placeholder{
        color: #172b4d;
    }
  }

  .comment-btn-wrapper {
    display: none;
    padding: 8px 12px;
    box-sizing: border-box;
    .save-btn {
      background-color: rgba(9,30,66,.04);
      color: #a5adba;
      cursor: not-allowed;
    }
    .comment-btn {
      width: 32px;
      height: 32px;
      padding: 6px;
      margin-left: 4px;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        background-color: rgba(9,30,66,.08);
        color: #091e42;
      }
    }
  }
}
</style>
