<template>
  <div class="footer-wrapper">
    <div
      v-if="!isShowInput"
      class="row"
    >
      <div
        class="btn-wrapper row items-center cursor-pointer col square-border text-weight-medium"
        @click="handleAddClick"
      >
        <q-icon
          name="add"
          size="18px"
        />
        新增卡片
      </div>
      <div class="add-icon flex flex-center">
        <q-icon
          name="text_snippet"
          style="color: inherit"
        />
      </div>
    </div>
    <div v-else>
      <textarea
        ref="textarea"
        class="editable title-input"
        placeholder="為這張卡片輸入標題..."
        rows="3"
        @input="handleTextareaInput"
      />
      <div class="row items-center">
        <div class="sure-btn q-py-sm q-px-md square-border cursor-pointer text-weight-medium">
          新增卡片
        </div>
        <q-icon
          class="cancel-btn"
          size="24px"
          name="close"
          @click="handleCancelClick"
        />
        <q-space />
        <div class="add-icon flex flex-center">
          <q-icon
            name="more_horiz"
            size="24px"
            style="color: #6b778c"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashListFooter',
  data() {
    return {
      isShowInput: false,
    };
  },
  methods: {
    handleAddClick() {
      this.isShowInput = true;
      setTimeout(() => {
        this.$refs.textarea.focus();
      }, 20);
    },
    handleCancelClick() {
      this.isShowInput = false;
    },
    handleTextareaInput() {
      setTimeout(() => {
        const { textarea } = this.$refs;
        textarea.style.height = 'auto';
        const textareaHeight = textarea.scrollHeight;
        textarea.style.height = `${textareaHeight}px`;
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.footer-wrapper {
  padding: 4px 0 6px;
}
.btn-wrapper {
  color: #5e6c84;
  padding: 2px 8px;

  &:hover {
    background-color: rgba(9,30,66,.08);
    color: #172b4d;
  }
}
.add-icon {
  width: 28px;
  height: 28px;
  color: #5e6c84;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: rgba(9,30,66,.08);
    color: #172b4d;
  }
}

.title-input {
  max-height: 162px;
  background-color: white;
  margin-bottom: 4px;
  padding: 6px 8px 6px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
}
.title-input::placeholder {
  color: #5e6c84;
  font-weight: 500;
}
.sure-btn {
  line-height: 20px;
  background-color: #0079bf;
  box-shadow: none;
  border: none;
  color: #fff;

  &:hover{
    background-color: #026aa7;
  }
}
.cancel-btn {
  padding: 4px;
  margin-left: 4px;
  color: #6b778c;
  cursor: pointer;
  &:hover {
    color: #172b4d;
  }
}
</style>
