<template>
  <q-drawer
    v-model="isShowDrawer"
    side="right"
    :width="339"
  >
    <div
      class="wrapper fit q-pl-md q-pr-sm column"
    >
      <div class="header row flex flex-center relative-position">
        選單
        <q-icon
          class="absolute-right cursor-pointer"
          size="20px"
          name="close"
          style="color: #42526e; top: 14px ;right: 6px"
          @click="hideDrawer"
        />
      </div>
      <div class="col no-wrap relative-position">
        <div class="menu-wrapper fit">
          <q-separator />
          <div class="menu">
            <MenuItem>
              <template #header>
                <q-icon
                  name="poll"
                  size="20px"
                  style="color: #42526e"
                />
              </template>
              <div>
                <div class="text-weight-bolder">
                  關於這個看板
                </div>
                <div
                  style="color: #5e6c84"
                  class="text-weight-medium"
                >
                  為您的看板新增敘述
                </div>
              </div>
            </MenuItem>
            <MenuItem>
              <template #header>
                <div
                  style="width: 20px; height: 20px"
                  class="bg-secondary square-border"
                />
              </template>
              更換背景
            </MenuItem>
            <MenuItem>
              <template #header>
                <q-icon
                  name="search"
                  size="20px"
                  style="color: #42526e"
                />
              </template>
              搜尋卡片
            </MenuItem>
            <MenuItem>
              <template #header>
                <q-icon
                  name="donut_large"
                  size="20px"
                  style="color: #42526e"
                />
              </template>
              貼圖
            </MenuItem>
            <MenuItem>
              <template #header>
                <q-icon
                  name="more_horiz"
                  size="20px"
                  style="color: #42526e"
                />
              </template>
              更多
            </MenuItem>
          </div>
          <q-separator class="divide" />
          <div class="menu">
            <MenuItem>
              <template #header>
                <q-icon
                  class="rotate-45"
                  name="flash_on"
                  size="20px"
                  style="color: inherit"
                />
              </template>
              <div>
                <div class="text-weight-bolder">
                  自動化
                </div>
                <div
                  style="color: #5e6c84"
                  class="text-weight-medium"
                >
                  自動化卡片和更多...
                </div>
              </div>
            </MenuItem>
          </div>
          <q-separator class="divide" />
          <div class="menu">
            <MenuItem>
              <template #header>
                <q-icon
                  name="verified_user"
                  size="20px"
                  style="color: #42526e"
                />
              </template>
              <div>
                <div class="text-weight-bolder">
                  強化功能
                </div>
                <div
                  style="color: #5e6c84"
                  class="text-weight-medium"
                >
                  Google Drive 等...
                </div>
              </div>
            </MenuItem>
            <MenuItem>
              <template #header>
                <div
                  style="
                background: rgba(9,30,66,.04);
                border-radius: 3px;
                box-sizing: border-box;
                height: 20px;
                width: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 12px;
                font-weight: 600;
                pointer-events: none;
            "
                >
                  1
                </div>
              </template>
              <div>
                <div
                  style="color: #5e6c84"
                  class="text-weight-medium"
                >
                  新增 Power-Up...
                </div>
              </div>
            </MenuItem>
            <MenuItem id="power-up-item">
              <template #header>
                <q-icon
                  name="lock"
                  style="
                background: #eddbf4;
                border-radius: 3px;
                line-height: 20px;
                color: #d5a6e6;
                height: 20px;
                width: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 12px;
            "
                />
              </template>
              <div>
                <div
                  class="text-weight-medium"
                  style="
                background: #FFFFFF;
                box-shadow: 0 1px 1px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
                padding-left: 16px;
                padding-right: 16px;
                overflow: hidden;
                position: relative;
                border-radius: 3px;
                transition: background 0.3s ease;
              "
                >
                  <div style="margin: 16px 0 8px;color: #172B4D;">
                    使用無限量的 Power-Up
                  </div>
                  <div
                    style="margin-bottom: 16px;color: #6B778C;"
                    class="text-weight-regular"
                  >
                    每個看板需要不只一個 Power-Up？<br>升級到商務級方案，即可無限量使<br>用。
                  </div>
                  <div
                    class="link"
                    style="margin-bottom: 16px;text-decoration: underline;"
                  >
                    免費試用商務級方案 14 天
                  </div>
                  <div
                    class="absolute link"
                    style="
                  width: 80px;
                  height: 120px;
                  border-radius: 12px;
                  z-index: 2;
                  background-color:rgba(9, 30, 66, 0.04);
                  bottom: -85px;
                  right: -8px;
                  transform: rotate(40deg);
                "
                  >
                    <div
                      style="
                    width: 26px;height:26px;
                    padding: 2px ;
                    background-color: rgb(137 96 158);
                    border-radius: 3px;
                    transform: rotate(-40deg);
                    margin: 6px
                  "
                    >
                      <q-icon
                        :name="outlinedVerifiedUser"
                        size="22px"
                        color="white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </MenuItem>
          </div>
          <q-separator class="divide" />
          <MenuItem>
            <template #header>
              <q-icon
                name="list"
                size="20px"
                style="color: #42526e"
              />
            </template>
            活動
          </MenuItem>
          <div class="activity-wrapper">
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
          </div>
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MenuItem from 'src/components/drawer/MenuItem.vue';
import Activity from 'src/components/drawer/Activity.vue';
import { outlinedVerifiedUser } from '@quasar/extras/material-icons-outlined';

export default {
  name: 'Drawer',
  components: { MenuItem, Activity },
  data() {
    return { outlinedVerifiedUser };
  },
  computed: {
    ...mapState('dashboard', ['isShowDrawer']),
  },
  methods: {
    ...mapMutations('dashboard', ['hideDrawer']),
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
.divide {
  margin: 16px 0;
}

.menu-wrapper{
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track-piece {
    background: rgba(9,30,66,.08);
    &:vertical:start {
      border-radius: 4px 4px 0 0;
    }
    &:vertical:end {
      border-radius: 0 0 4px 4px;
    }
    &:horizontal:start {
      border-radius: 4px 0 0 4px;
    }
    &:horizontal:end {
      border-radius: 0 4px 4px 0;
    }
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(9,30,66,0.13);
    border-radius: 4px;
    display: block;
    height: 48px;
  }
}

.menu{
  margin: 16px 0 4px;
}

.link{
  color: #5E6C84;

  &:hover {
  color: #172b4d;
  }
}
#power-up-item:hover{
  background-color: unset;
  color: unset;
}
</style>
