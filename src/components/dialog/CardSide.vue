<template>
  <div class="side">
    <div class="module">
      <div class="side-title">
        新增至卡片
      </div>
      <CardSideButton>
        <template #icon>
          <q-icon
            :name="buttonItems[0].icon"
            size="16px"
          />
        </template>
        <template #default>
          {{ buttonItems[0].label }}
        </template>
      </CardSideButton>
      <CardSideButton>
        <template #icon>
          <q-icon
            :name="buttonItems[1].icon"
            size="16px"
          />
        </template>
        <template #default>
          {{ buttonItems[1].label }}
          <AddTagMenu />
        </template>
      </CardSideButton>
      <CardSideButton>
        <template #icon>
          <q-icon
            :name="buttonItems[2].icon"
            size="16px"
          />
        </template>
        <template #default>
          {{ buttonItems[2].label }}
          <AddTodoMenu />
        </template>
      </CardSideButton>
      <CardSideButton
        v-for="(item) in buttonItems.filter((v, i) => i > 2)"
        :key="item.icon"
      >
        <template #icon>
          <q-icon
            :name="item.icon"
            size="16px"
          />
        </template>
        <template #default>
          {{ item.label }}
        </template>
      </CardSideButton>
    </div>
    <div class="module">
      <div class="side-title">
        強化功能
      </div>
      <CardSideButton class="revert">
        <template #icon>
          <q-icon
            name="add"
            size="16px"
          />
        </template>
        <template #default>
          新增 Power-Up
        </template>
      </CardSideButton>
      <div style="margin-top: 8px;">
        <div
          style="
          color: #97a0af;
          font-size: 12px;
          line-height: 16px;"
        >
          使用無限量的Power-Up 和更多功能。
        </div>
        <div class="x-btn">
          <q-icon
            name="computer"
            size="16px"
            style="color: rgb(66, 82, 110); margin-right: 2px"
          />
          將工作區升級
        </div>
      </div>
    </div>
    <div class="module">
      <div class="side-title relative-position">
        自動化

        <div
          class="absolute-right cursor-pointer square-border"
          style="background-color: rgba(9,30,66,.04);"
        >
          <q-icon
            name="error_outline"
            size="16px"
          />
        </div>
      </div>
      <CardSideButton class="revert">
        <template #icon>
          <q-icon
            name="add"
            size="16px"
          />
        </template>
        <template #default>
          新增按鈕
        </template>
      </CardSideButton>
    </div>
    <div class="module">
      <div class="side-title">
        動作
      </div>
      <CardSideButton
        v-for="(item, index) in actionbuttonItems"
        :key="index"
      >
        <template #icon>
          <q-icon
            :name="item.icon"
            size="16px"
          />
        </template>
        <template #default>
          {{ item.label }}
        </template>
      </CardSideButton>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import { outlinedTopic, outlinedCheckBox, outlinedSell } from '@quasar/extras/material-icons-outlined';
import CardSideButton from 'src/components/dialog/CardSideButton.vue';
import AddTodoMenu from 'src/components/menu/AddTodoMenu.vue';
import AddTagMenu from 'src/components/menu/AddTagMenu.vue';

export default {
  name: 'CardSide',
  components: { CardSideButton, AddTodoMenu, AddTagMenu },
  data() {
    return {
      outlinedTopic,
      buttonItems: [
        {
          icon: 'person_outline',
          label: '成員',
        },
        {
          icon: outlinedSell,
          label: '標籤',
        },
        {
          icon: outlinedCheckBox,
          label: '待辦清單',
        },
        {
          icon: 'schedule',
          label: '日期',
        },
        {
          icon: 'attachment',
          label: '附件',
        },
        {
          icon: 'folder_open',
          label: '封面',
        },
      ],
      actionbuttonItems: [
        {
          icon: 'arrow_forward',
          label: '移動',
        },
        {
          icon: 'content_copy',
          label: '複製',
        },
        {
          icon: 'text_snippet',
          label: '製作範本',
        },
        {
          icon: 'visibility',
          label: '追蹤',
        },
        {
          icon: 'move_to_inbox',
          label: '封存',
        },
        {
          icon: 'share',
          label: '分享',
        },
      ],
    };
  },
  computed: {
    ...mapState('dashboard', ['dialogCardId']),
    ...mapGetters('dashboard', ['dialogCard']),

  },
  mounted() {

  },
  methods: {
    ...mapMutations('dashboard', ['setIsShowDialog', 'updateCard']),

  },
};
</script>
<style lang="scss" scoped>
.side {
  float: right;
  padding: 0 16px 8px 8px;
  width: calc(100% - 600px);
  overflow: hidden;
  z-index: 10;
  box-sizing: content-box;

}

.side-title{
  color: #5e6c84;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  line-height: 16px;
  text-transform: uppercase;
  line-height: 20px;
  margin-bottom: -4px;
}
.module {
  clear: both;
  margin-bottom: 24px;
  position: relative;
}
.x-btn {
  background-color: #EDDBF4;
  border-radius: 3px;
  font-size: 12px;
  padding: 4px;
  text-decoration: none;
  line-height: 16px;
  cursor: pointer;
  display: inline-flex;
  margin-top: 4px;

  &:hover{
    background-color: #DFC0EB;
    color: #091e42;
  }
}
</style>
