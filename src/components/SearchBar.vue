<template>
  <div
    class="relative-position search-input-wrapper"
    :class="isShowInput? 'extend': ''"
  >
    <q-btn
      v-show="!isShowInput"
      padding="0px"
      unelevated
      class="btn-bg fit"
      style="cursor: text"
    >
      <div
        class="fit row justify-between items-center q-px-sm q-py-xs"
        @click="handleShowInput"
      >
        <div>
          跳到...
        </div>
        <q-icon
          name="search"
          size="20px"
        />
      </div>
    </q-btn>
    <input
      v-show="isShowInput"
      ref="searchInput"
      class="search-input fit square-border"
      placeholder="搜尋..."
    >
    <span
      v-show="isShowInput"
      class="absolute-right q-pa-sm flex flex-center"
      style="width:32px;"
    >
      <q-icon
        class="cursor-pointer"
        size="16px"
        color="black"
        name="close"
        @click="hideInput"
      />
    </span>
    <q-menu
      ref="searchMenu"
      v-model="isShowMenu"
      :target="$refs.searchInput"
      :offset="[0, 8]"
    >
      <div
        class="q-pa-md non-selectable"
        style="width: 600px;height: 247px; background-color: #f4f5f7"
      >
        <div
          class="fz-sm text-color-1 text-weight-bold"
          style="margin: 3px 0 9px"
        >
          最近的看板
        </div>
        <div
          class="fz-sm text-color-1 text-weight-bold"
          style="margin: 3px 0 9px"
        >
          儲存搜尋結果
        </div>
      </div>
    </q-menu>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      isShowInput: false,
      isShowMenu: false,
    };
  },
  methods: {
    handleShowInput() {
      this.isShowInput = true;
      setTimeout(() => {
        this.$refs.searchInput.focus();
        this.isShowMenu = true;
      }, 20);
    },
    showInput() {
      this.isShowInput = true;
    },
    hideInput() {
      this.isShowInput = false;
    },
  },
};
</script>
<style lang="scss">
.search-input-wrapper {
  height: 32px;
  width: 184px;
  cursor: text;
  transition: width 150ms;

  &.extend {
    width: 280px;
  }
}
.search-input {
  padding: 8px 54px 8px 8px;
  width: 280px;
  font-size: 14px;
  line-height: 19px;
}
</style>
