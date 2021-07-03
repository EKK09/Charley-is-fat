<template>
  <BaseMenu
    ref="menu"
    title="成員"
  >
    <div class="wrapper">
      <input
        ref="input"
        v-model.trim="name"
        placeholder="搜尋成員"
        class="label-input"
        autofocus
      >
      <div class="label">
        看板成員
      </div>
      <div
        class="member-option row items-center relative-position"
        @click="toggleDialogCardHasMember"
      >
        <q-avatar
          size="32px"
        >
          <img
            src="/images/user.jpeg"
            style="object-fit: cover"
          >
        </q-avatar>
        <div class="name">
          查理布朗 (CharleyBrown)
        </div>
        <div
          v-show="dialogCard.hasMember"
          class="check flex flex-center absolute-top-right"
        >
          <q-icon
            name="check"
            color="inherit"
          />
        </div>
      </div>
      <div
        v-show="name"
        class="q-mt-md"
      >
        <div class="label q-mt-md">
          工作區成員
        </div>
        <div class="empty-result">
          沒有結果
        </div>
      </div>
    </div>
  </BaseMenu>
</template>
<script>
import BaseMenu from 'src/components/menu/BaseMenu.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AddMemberMenu',
  components: { BaseMenu },

  data() {
    return {
      name: '',
    };
  },
  computed: {
    ...mapState('dashboard', ['dialogCard']),
    hasMember() {
      return this.dialogCard.tags;
    },
  },
  methods: {
    ...mapMutations('dashboard', ['toggleDialogCardHasMember']),
  },
};
</script>
<style lang="scss" scoped>
.wrapper{
  padding: 0 12px;

  .label {
    margin: 4px 0;
    font-weight: 700;
    color: #5e6c84;
    font-size: 12px;
    line-height: 16px;
    display: block;
  }

  .label-input {
    margin: 4px 0 12px;
    color: #172b4d;
    font-weight: 450;
    width: 100%;
    outline: none;
    border: none;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    background-color: #fafbfc;
    box-sizing: border-box;
    -webkit-appearance: none;
    border-radius: 3px;
    display: block;
    line-height: 20px;
    margin-bottom: 12px;
    padding: 8px 12px;
    transition-property: background-color,border-color,box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;

    &:hover {
      background-color: #ebecf0;
      box-shadow: inset 0 0 0 2px #dfe1e6;
    }
    &:focus{
      background-color: #fff;
      box-shadow: inset 0 0 0 2px #0079bf;
    }
  }

  .save-btn {
    background-color: #0079bf;
    color: #fff;
    margin: 8px 4px 0 0;
    padding: 6px 24px;
    display: inline-block;

    &:hover{
      background-color: #026aa7;
    }
  }
  .label-select {
    width: 100%;
    margin-bottom: 14px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }
}

.member-option {
  border-radius: 3px;
  line-height: 20px;
  padding: 4px;
  background-color: rgba(9,30,66,.04);
  cursor: pointer;
  font-weight: 500;
  margin: 8px 4px 8px 0;
  color: #172b4d;

  .name {
    margin-left: 8px;
  }

  &:hover {
    background-color: rgba(9,30,66,.08);
  }
  .check {
    width: 40px;
    height: 40px;
  }
}
.empty-result {
  box-sizing: content-box;
  background-color: rgba(9,30,66,.04);
  border-radius: 3px;
  color: #5e6c84;
  padding: 24px 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  text-align: center;
}
</style>
