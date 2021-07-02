<template>
  <BaseMenu
    ref="menu"
    title="列表動作"
  >
    <div class="list-wrapper">
      <div
        v-for="(menu, menuIndex) in menus"
        :key="menuIndex"
        class="menu-list"
      >
        <div
          v-for="(item, itemIndex) in menu"
          :key="itemIndex"
          class="list-item row items-center"
        >
          {{ item }}
        </div>
        <q-separator
          class="divide"
          style="margin: 8px 12px"
        />
      </div>
      <div
        class="menu-list"
      >
        <div
          v-close-popup
          class="list-item row items-center"
          tabindex="1"
          @click="handleRemove"
        >
          封存這個列表
        </div>
        <q-separator
          class="divide"
          style="margin: 8px 12px"
        />
      </div>
    </div>
  </BaseMenu>
</template>
<script>
import BaseMenu from 'src/components/menu/BaseMenu.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'ColumnHandleMenu',
  components: { BaseMenu },
  props: {
    columnIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      menus: [
        ['新增卡片', '複製列表…', '移動列表…', '立即觀看'],
        ['排序依據…'],
        ['移動這個列表的所有卡片…', '封存這個列表的所有卡片…'],
        // ['封存這個列表'],
      ],
    };
  },
  methods: {
    ...mapMutations('dashboard', ['removeColumn']),

    handleRemove() {
      this.removeColumn(this.columnIndex);
      this.$refs.menu.hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.list-wrapper {
  .menu-list:last-child {
    .divide{
      display: none;
    }
  }
}

.list-item{
  color: #172b4d;
  height: 32px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(9,30,66,.04);
  }
  &:active {
    background-color: #e4f0f6;
  }

}
</style>
