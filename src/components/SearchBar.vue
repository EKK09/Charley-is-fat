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
      no-focus
      @hide="handleMenuHide"
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
        <div class="row q-mt-sm q-mb-lg">
          <q-item
            class="col-6 q-pa-none square-border
            board-wrapper relative-position cursor-pointer overflow-hidden"
            :style="`height: 36px;min-height: unset; background-color: #${bgColorCode}`"
          >
            <q-item-section
              avatar
              class="q-pa-none full-height board-header"
              :style="`min-width: unset;width: 36px;background-color: #${bgColorCode}`"
            />
            <q-item-section
              style="padding: 0 10px 2px;"
              class="board-content column no-wrap"
            >
              <div
                style="color:#172B4D; height: 20px; line-height:100%: vertical-align: middle;"
                class="text-bold ellipsis"
              >
                {{ dashboardTitle }}
              </div>
              <q-item-label
                class="fz-sm"
                style="color: rgba(0, 0, 0, 0.4); margin-top: unset;height: 15px"
              >
                查理布朗的工作區
              </q-item-label>
            </q-item-section>
            <div
              class="board-star-wrapper absolute-right overflow-hidden flex flex-center"
            >
              <q-icon
                v-close-popup
                name="star_outline"
                class="board-star text-weight-medium"
                style="color: rgb(66, 82, 110);"
              />
            </div>
          </q-item>
        </div>
        <div
          class="fz-sm text-color-1 text-weight-bold"
          style="margin: 3px 0 9px"
        >
          儲存搜尋結果
        </div>
        <q-item
          v-close-popup
          clickable
          class="q-py-sm q-px-md square-border"
          style="height: 32px;min-height: unset"
        >
          My cards
          <span class="text-color-1 q-ml-sm text-weight-bold">@me</span>
        </q-item>
        <q-separator style="margin-top: 8px" />
        <q-item
          style="margin: 20px 4px 12px 8px"
          class="q-pa-none"
        >
          <q-item-section avatar>
            <q-avatar>
              <img src="https://a.trellocdn.com/prgb/dist/images/empty-states/comb.0cb626a9eb77a2895e6c.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section
            style="color: #5E6C84"
            class="text-weight-medium"
          >
            你可以使用各種運算子，像是 @member、#label、is:archived，以及 has:attachments，讓搜尋更精確。
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-btn
              v-close-popup
              label="深入瞭解"
              style="font-color: #172B4D;background-color: rgba(9, 30, 66, 0.04);"
              padding="6px 12px"
              class="text-weight-medium"
              flat
            />
          </q-item-section>
        </q-item>
      </div>
    </q-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {
      isShowInput: false,
      isShowMenu: false,
    };
  },
  computed: {
    ...mapState('dashboard', ['dashboardTitle', 'bgColorCode']),
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
    handleMenuHide() {
      this.hideInput();
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

.board-wrapper::before {
  background: #FFFFFF;
  bottom: 0;
  content: '';
  left: 0;
  opacity: 0.88;
  position: absolute;
  right: 0;
  top: 0;
}
.board-wrapper:hover {
  .board-header {
      opacity: 1;
  }
  .board-star-wrapper {
    width: 32px;
  }
}
.board-wrapper:hover:before {
  opacity: 0.78
}

.board-header {
  opacity: 0.7;
  border-radius: 3px 0 0 3px;
  z-index: 2;
}
.board-content {
  // opacity: 0.3;
  z-index: 1;
}
.board-star-wrapper {
  width: 0px;
  z-index: 3;
  transition-duration: 85ms;
  transition-property: width;
}
.board-star {
  font-size: 18px;
}
.board-star:hover {
  font-size: 22px;
}
</style>
