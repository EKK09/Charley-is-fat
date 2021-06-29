<template>
  <div class="header">
    <span
      class="title-icon flex flex-center"
      style="top: 4px"
    >
      <q-icon
        :name="outlinedTopic"
        size="24px"
        style="color: #42526e"
      />
    </span>
    <div
      style="margin: 4px 0 -1px;padding: 8px 0 0;"
    >
      <textarea
        ref="textarea"
        v-model="editableTitle"
        rows="1"
        spellcheck="false"
        class="editable title-input cursor-pointer"
        @input="handleTextareaInput"
        @keydown.enter="handleEnter"
      />
    </div>
    <div style="margin: 2px 8px 5px 2px;">
      在「待辦事項」列表中
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import { outlinedTopic } from '@quasar/extras/material-icons-outlined';

export default {
  name: 'CardHeader',
  data() {
    return {
      outlinedTopic,
    };
  },
  computed: {
    ...mapState('dashboard', ['dialogCardId']),
    ...mapGetters('dashboard', ['dialogCard']),

    editableTitle: {
      get() {
        return this.dialogCard.title;
      },
      set(val) {
        this.setTitle(val);
      },
    },
  },
  mounted() {
    this.resetInputheight();
  },
  methods: {
    ...mapMutations('dashboard', ['setIsShowDialog', 'updateCard']),
    setTitle(title) {
      this.updateCard({ ...this.dialogCard, title });
    },
    hideDialog() {
      this.$refs.dialog.hide();
    },
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
    handleEnter(event) {
      if (event.isComposing) {
        return;
      }
      event.preventDefault();
      this.$refs.textarea.blur();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  margin: 12px 40px 8px 56px;
  min-height: 32px;
  position: relative;
  z-index: 1;
}
.title-icon {
  height: 32px;
  line-height: 32px;
  width: 32px;
  color: #42526e;
  left: -40px;
  position: absolute;
}
.title-input {
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-size: 20px;
  font-weight: 600;
  height: 32px;
  line-height: 24px;
  margin: -4px -8px;
  min-height: 24px;
  padding: 4px 8px;
  resize: none;
  box-sizing: border-box;
}

.editable:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
  background-color: white;
}
</style>
