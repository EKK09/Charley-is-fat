<template>
  <div class="dash-list-header relative-position">
    <textarea
      ref="textarea"
      v-model="editableTitle"
      rows="1"
      class="editable title-input cursor-pointer"
      @input="handleTextareaInput"
      @focus="handleTextareaFocus"
    />
    <div class="dash-list-header-icon flex flex-center cursor-pointer">
      <q-icon
        name="more_horiz"
        size="20px"
        style="color: #6b778c"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashListHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    editableTitle: {
      get() {
        return this.title;
      },
      set(val) {
        // TODO: 設定標題
        console.log(val);
      },
    },
  },
  mounted() {
    this.resetInputheight();
  },
  methods: {
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
    handleTextareaFocus() {
      console.log('handleTextareaFocus');
      this.$refs.textarea.select();
    },
    focus() {
      this.$refs.textarea.focus();
    },
    isFocus() {
      return document.activeElement === this.$refs.textarea;
    },
  },
};
</script>
<style lang="scss" scoped>
.dash-list-header {
  padding: 6px 36px 0px 8px;
}
.title-input {
  min-height: 20px;
  max-height: 256px;
  padding: 4px 8px;
}
.dash-list-header-icon {
  position: absolute;
  width: 32px;
  height: 32px;
  right: 4px;
  top: 4px;
  z-index: 1;
  border-radius: 3px;

  &:hover {
    background-color: rgba(9,30,66,.08);
  }
}
.editable:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
  background-color: white;
}
</style>
