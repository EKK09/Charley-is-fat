<template>
  <div class="wrapper">
    <div
      v-if="!isShowInput"
      class="placeholder row items-center fz-md"
      @click="toggleInput"
    >
      <q-icon
        name="add"
        size="20px"
        style="margin-right: 2px"
      />
      新增其他列表
    </div>
    <div
      v-else
      class="input-wrapper"
    >
      <input
        ref="input"
        v-model="title"
        placeholder="為列表輸入標題..."
        class="input"
        maxlength="512"
        @blur="hideInput"
      >
      <div
        ref="btnWrapper"
        class="row items-center btn-wrapper"
      >
        <div class="sure-btn q-py-sm q-px-md square-border cursor-pointer text-weight-medium">
          新增列表
        </div>
        <q-icon
          class="cancel-btn"
          size="24px"
          name="close"
          @click="toggleInput"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddColumn',
  data() {
    return {
      isShowInput: false,
      title: '',
    };
  },
  methods: {
    toggleInput() {
      if (this.isShowInput) {
        this.hideInput();
      } else {
        this.showInput();
      }
    },
    showInput() {
      this.isShowInput = true;
      setTimeout(() => {
        this.$refs.input.focus();
        this.$refs.btnWrapper.classList.add('show');
      }, 0);
    },
    hideInput() {
      this.$refs.btnWrapper.classList.remove('show');
      this.isShowInput = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper{
  width: 272px;
  min-width: 272px;
  margin: 0 4px;
  white-space: nowrap;
  background-color: transparent;
}
.placeholder {
  border-radius: 3px;
  margin: 0 4px;
  white-space: nowrap;
  background-color: hsla(0,0%,100%,.24);
  color: white;
  cursor: pointer;
  height: 40px;
  min-height: 32px;
  padding: 10px 12px;
  transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
  line-height: 20px;

  &:hover{
    background-color: hsla(0,0%,100%,.32);
  }
}

.input-wrapper {
  background-color: #ebecf0;
  border-radius: 3px;
  height: auto;
  min-height: 32px;
  padding: 4px;
  transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
}

.input{
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  transition: margin 85ms ease-in,background 85ms ease-in;
  width: 100%;
  padding: 8px 12px;
  line-height: 20px;
  border-radius: 3px;
}
.btn-wrapper {
  height: 0;
  transition: margin 85ms ease-in,height 85ms ease-in;
  overflow: hidden;
  margin: 4px 0 0;

  &.show {
    height: 32px;
  }
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
