<template>
  <div class="dashboard-header row">
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
      <DashboardHeaderButton
        padding="0px"
      >
        <div
          class="row items-center fz-xl q-px-md"
          style="line-height: 32px;font-weight: 700;"
        >
          減肥計劃
        </div>
      </DashboardHeaderButton>
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
      <DashboardHeaderButton>
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

export default {
  name: 'DashboardHeader',
  components: { DashboardHeaderButton },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.dashboard-header {
  height: 52px;
  padding: 8px 8px 4px 8px;
}
.left {
  // flex: 1;
}
.right {
  flex: 1;
}
</style>
