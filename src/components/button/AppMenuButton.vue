<template>
  <ButtonBase
    ref="button"
    icon="apps"
    @click="handleClick"
  >
    <q-menu
      ref="menu"
      v-model="isShowMenu"
      :offset="[6, 14]"
      transition-show="none"
      transition-hide="none"
      no-focus
    >
      <q-card
        style="width: 304px"
        class="q-pa-md"
      >
        <q-card-section
          class="q-pa-none q-mb-sm text-center text-weight-medium
         relative-position text-color-1 non-selectable"
        >
          Atlassian 的更多產品
          <div class="absolute-right full-height flex flex-center">
            <q-icon
              name="close"
              size="18px"
              class="absolute-right cursor-pointer"
              @click="handleClick"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row justify-between items-center q-px-sm">
          <div class="text-bold fz-lg">
            Switch to
          </div>
          <div
            class="brand-link-wrapper text-weight-bold row items-center cursor-pointer"
          >
            <span class="brand">
              Atlassian Start
            </span>

            <q-icon
              name="open_in_new"
              class="q-ml-xs"
              size="16px"
            />
          </div>
        </q-card-section>
        <q-item
          class="row items-center q-px-sm"
          clickable
        >
          <div
            class="brand-icon flex flex-center relative-position"
          >
            <q-icon
              name="leaderboard"
              color="white"
              size="22px"
            />
          </div>
          <div
            class="fz-md"
          >
            Trello
          </div>
        </q-item>
        <q-list class="q-mt-md">
          <q-item-label
            header
            class="q-pl-sm fz-sm text-bold"
          >
            DISCOVER
          </q-item-label>
          <q-item
            class="row items-center q-px-sm list-item square-border"
            clickable
          >
            <q-item-section
              avatar
              class="list-item-icon-wrapper q-pa-none flex flex-center"
            >
              <q-icon
                name="widgets"
                class="item-icon"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="fz-md item-header">
                Confluence
                <span
                  class="square-border fz-sm text-weight-bolder"
                  style="background-color: #DEEBFF;margin-left: 8px;
                  color:#0747A6; padding: 2px 12px 3px 12px"
                >TRY</span>
              </q-item-label>
              <q-item-label class="fz-sm item-content">
                Document collaboration
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="row items-center q-px-sm list-item square-border"
            clickable
          >
            <q-item-section
              avatar
              class="list-item-icon-wrapper q-pa-none flex flex-center"
            >
              <q-icon
                name="dashboard"
                class="item-icon"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="fz-md item-header">
                Jira Software
              </q-item-label>
              <q-item-label class="fz-sm item-content">
                Project and issue tracking
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="row items-center q-px-sm list-item square-border"
            clickable
          >
            <q-item-section
              avatar
              class="list-item-icon-wrapper q-pa-none flex flex-center"
            >
              <q-icon
                name="account_tree"
                class="item-icon"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="fz-md item-header">
                Jira Service Management
              </q-item-label>
              <q-item-label class="fz-sm item-content">
                Collaborative IT service management
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="row items-center q-px-sm list-item square-border"
            clickable
          >
            <q-item-section
              avatar
              class="list-item-icon-wrapper q-pa-none flex flex-center"
            >
              <q-icon
                name="explore"
                style="color: rgb(86, 99, 122)"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="fz-md item-header">
                More Atlassian products
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-menu>
  </ButtonBase>
</template>
<script>
import ButtonBase from 'src/components/button/ButtonBase.vue';

export default {
  name: 'AppMenuButton',
  components: { ButtonBase },
  data() {
    return {
      isShowMenu: false,
    };
  },
  methods: {
    handleClick() {
      this.isShowMenu = !this.isShowMenu;
    },
  },
};
</script>
<style lang="scss" scoped>
.brand-link-wrapper {
  color: rgb(0, 82, 204);
}
.brand-link-wrapper:hover  {
  .brand {
      text-decoration: underline;
  }
  color: rgb(0, 101, 255) ;
}
.brand {
  transition-duration: 0s, 0.15s;
}
.brand-icon {
  background-color: rgb(0, 82, 204);
  height: 32px;
  width: 32px;
  border-radius: 8px;
  margin-right: 8px;
}
.brand-icon::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: red;
  background: linear-gradient(transparent,transparent,transparent,transparent,
   rgb(0, 82, 204),rgb(0, 82, 204),rgb(0, 82, 204));
  opacity: 0.3;
  border-radius: 8px;
}

.list-item {
  height: 49px;
}
.list-item-icon-wrapper {
  width: 32px;
  min-width: unset;
  margin-right: 8px;
  height: 32px;
  border-radius: 8px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 13%) 0px 0px 1px 1px;
  background-color: rgb(235, 236, 240);
}
.item-icon {
  color: #2684ff;
}
.item-header {
  color: #172b4d;
  line-height: 19px;
  // height: 20px;
}
.item-content {
  color: #5E6C84;
  // height: 16px;
}
</style>
