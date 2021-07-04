<template>
  <q-drawer
    v-model="isShowDrawer"
    side="right"
    :width="339"
    behavior="desktop"
  >
    <div
      class="wrapper fit q-pl-md q-pr-sm column"
    >
      <div class="header row flex flex-center relative-position">
        {{ header }}
        <q-icon
          class="absolute-right cursor-pointer"
          size="20px"
          name="close"
          style="color: #42526e; top: 14px ;right: 6px"
          @click="hideDrawer"
        />
        <q-icon
          class="absolute-left cursor-pointer menu-back"
          :class="isShowMenuBack ? 'show': ''"
          size="28px"
          name="navigate_before"
          @click="handleMenuBack"
        />
      </div>
      <q-separator />
      <div class="col no-wrap relative-position">
        <q-tab-panels
          ref="drawerTab"
          v-model="tab"
          class="bg-transparent fit"
        >
          <q-tab-panel
            name="menu"
            class="bg-transparent q-pa-none fit"
          >
            <MenuList />
          </q-tab-panel>
          <q-tab-panel
            name="bgSetting"
            class="bg-transparent q-pa-none fit"
          >
            <BgSetting />
          </q-tab-panel>
          <q-tab-panel
            name="color"
            class="bg-transparent q-pa-none fit"
          >
            <BgColor />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MenuList from 'src/components/drawer/MenuList.vue';
import BgSetting from 'src/components/drawer/BgSetting.vue';
import BgColor from 'src/components/drawer/BgColor.vue';

export default {
  name: 'Drawer',
  components: { MenuList, BgSetting, BgColor },
  computed: {
    ...mapState('dashboard', ['isShowDrawer', 'drawerTab']),
    header() {
      if (this.drawerTab === 'bgSetting') {
        return '更換背景';
      }
      if (this.drawerTab === 'color') {
        return '顏色';
      }
      return '選單';
    },
    isShowMenuBack() {
      return this.drawerTab !== 'menu';
    },
    tab: {
      get() {
        return this.drawerTab;
      },
      set(val) {
        this.setDrawerTab(val);
      },
    },
  },
  methods: {
    ...mapMutations('dashboard', ['hideDrawer', 'setDrawerTab']),
    handleMenuBack() {
      this.$refs.drawerTab.previous();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f4f5f7;
}

.header {
  color: #172b4d;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  padding: 14px 32px;
}
.menu-back {
  color: #42526e;
  top: 10px;
  left: -30px;
  transition: transform .12s ease-in;

  &.show {
    transform: translateX(32px);
  }

}
</style>
