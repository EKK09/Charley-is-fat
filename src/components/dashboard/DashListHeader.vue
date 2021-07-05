<template>
  <div class="dash-list-header relative-position">
    <textarea
      ref="textarea"
      v-model="editableTitle"
      rows="1"
      class="editable title-input cursor-pointer"
      @input="handleTextareaInput"
      @focus="handleTextareaFocus"
      @keydown.enter="handleEnter"
    />
    <div class="dash-list-header-icon flex flex-center cursor-pointer">
      <q-icon
        name="more_horiz"
        size="20px"
        style="color: #6b778c"
      />
      <ColumnHandleMenu :column-index="columnIndex" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import ColumnHandleMenu from 'src/components/menu/ColumnHandleMenu.vue';

export default {
  name: 'DashListHeader',
  components: { ColumnHandleMenu },
  props: {
    title: {
      type: String,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    editableTitle: {
      get() {
        return this.title;
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
    ...mapMutations('dashboard', ['setColumnTitle']),
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
      this.$refs.textarea.select();
    },
    focus() {
      this.$refs.textarea.focus();
    },
    isFocus() {
      return document.activeElement === this.$refs.textarea;
    },
    handleEnter(event) {
      if (event.isComposing) {
        return;
      }
      event.preventDefault();
      this.$refs.textarea.blur();
    },
    setTitle(title) {
      this.setColumnTitle({ index: this.columnIndex, title });
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
