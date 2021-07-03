<template>
  <div class="dashboard-header row wrap">
    <div class="left row q-gutter-xs">
      <DashboardHeaderButton>
        <div class="row items-center">
          <q-icon
            name="bar_chart"
            class="rotate-180 text-bold"
            size="18px"
            style="padding: 1px"
          />
          <div style="padding-left: 2px">
            看板
          </div>
          <q-icon
            name="expand_more"
            size="20px"
            class="text-weight-light"
            style="margin-left: 4px"
          />
        </div>
      </DashboardHeaderButton>
      <div
        ref="titleInput"
        contenteditable="true"
        class="title-input row items-center cursor-pointer"
        @blur="setTitle"
        @focus="handleFocus"
      >
        {{ dashboardTitle }}
      </div>
      <DashboardHeaderButton
        padding="0px"
      >
        <div
          class="flex flex-center"
          style="width: 32px; height: 32px"
        >
          <q-icon
            name="star_border"
            size="18px"
          />
        </div>
      </DashboardHeaderButton>

      <q-separator
        vertical
        inset
        class="q-mx-sm q-my-md"
        style="background-color:hsla(0,0%,100%,.24); height: 16px;"
      />
      <DashboardHeaderButton
        padding="0px"
      >
        <div
          class="row full-height items-center q-px-md"
        >
          <div class="q-pr-sm">
            查理布朗的工作區
          </div>
          <div
            class="fz-sm"
            style="border-radius: 12px; background: hsla(0,0%,100%,.2); padding: 2px 6px"
          >
            Free
          </div>
        </div>
      </DashboardHeaderButton>
      <q-separator
        vertical
        inset
        class="q-mx-sm q-my-md"
        style="background-color:hsla(0,0%,100%,.24); height: 16px;"
      />
      <DashboardHeaderButton padding="0px">
        <div class="row items-center full-height q-px-md">
          <q-icon
            name="lock"
            size="12px"
          />
          <div class="q-pl-md">
            私密
          </div>
        </div>
      </DashboardHeaderButton>
      <q-separator
        vertical
        inset
        class="q-mx-sm q-my-md"
        style="background-color:hsla(0,0%,100%,.24); height: 16px;"
      />
      <div
        class="flex flex-center q-px-sm relative-position"
        style="height: 32px"
      >
        <q-avatar
          class="relative-position cursor-pointer"
          size="28px"
        >
          <img
            src="/images/user.jpeg"
            style="object-fit: cover"
          >
          <q-icon
            name="img:https://a.trellocdn.com/prgb/dist/images/chevron.88a4454280d68a816b89.png"
            class="absolute-bottom-right"
            size="9px"
          />
        </q-avatar>
      </div>
      <DashboardHeaderButton padding="0px">
        <div class="row items-center full-height q-px-md">
          <div>
            邀請
          </div>
        </div>
      </DashboardHeaderButton>
    </div>
    <div class="right row no-wrap justify-end q-gutter-xs">
      <DashboardHeaderButton>
        <div class="row items-center no-wrap">
          <q-icon
            name="flash_on"
            class="q-pr-sm q-pl-xs"
            size="20px"
          />
          <div class="q-pr-md">
            自動化
          </div>
        </div>
      </DashboardHeaderButton>
      <DashboardHeaderButton
        @click.native="showDrawer"
      >
        <div class="row items-center no-wrap">
          <q-icon
            name="more_horiz"
            class="q-pr-sm q-pl-xs"
            size="20px"
          />
          <div class="q-pr-md">
            顯示選單
          </div>
        </div>
      </DashboardHeaderButton>
    </div>
  </div>
</template>

<script>
import DashboardHeaderButton from 'src/components/dashboard/DashboardHeaderButton.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'DashboardHeader',
  components: { DashboardHeaderButton },
  data() {
    return {
      isShowTitleInput: false,
      title: '減肥計劃',
    };
  },
  computed: {
    ...mapState('dashboard', ['dashboardTitle']),
  },
  methods: {
    ...mapMutations('dashboard', ['showDrawer', 'setDashboardTitle']),

    setTitle() {
      const title = this.$refs.titleInput.textContent.trim();
      this.setDashboardTitle(title);
    },
    handleFocus() {
      const { titleInput } = this.$refs;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(titleInput);
      selection.removeAllRanges();
      selection.addRange(range);
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-header {
  min-height: 52px;
  padding: 8px 8px 4px 8px;
}
.title-input {
  color: white;
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0;
  outline: none;
  border-radius: 3px;
  font-weight: 800;
  font-size: 18px;
  height: 32px;
  padding: 0 12px;
  overflow: hidden;
  transition-property: background-color,border-color,box-shadow,width;
  transition-duration: 85ms;
  transition-timing-function: ease;
  &:hover {
     background-color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
    color: #172b4d;
  }
}
.right {
  flex: 1;
}
</style>
