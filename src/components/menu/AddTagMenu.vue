<template>
  <BaseMenu
    ref="menu"
    title="標籤"
  >
    <div class="wrapper">
      <div class="label">
        標籤
      </div>
      <input
        ref="input"
        v-model.trim="tagLabel"
        placeholder="搜尋標籤..."
        class="label-input"
      >
      <div class="tag-list">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="tag-wrapper relative-position cursor-pointer"
        >
          <div
            class="tag relative-position"
            :style="`background-color: #${tag}`"
            @mouseover="(e)=> handleTagHover(e,tag)"
            @mouseleave="handleTagUnhover"
          >
            <div class="tag-icon flex flex-center absolute-top-right">
              <q-icon
                name="check"
                color="white"
              />
            </div>
          </div>
          <div class="absolute-top-right tag-edit-icon flex flex-center cursor-pointer">
            <q-icon
              name="create"
              style="color:#42526e"
              size="16px"
            />
          </div>
        </div>
      </div>
      <div class="btn flex flex-center">
        建立新標籤
      </div>
      <q-separator style="margin: 16px 0" />
      <div class="btn flex flex-center">
        啟用色覺辨認障礙友善模式
      </div>
    </div>
  </BaseMenu>
</template>
<script>
import BaseMenu from 'src/components/menu/BaseMenu.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'AddTagMenu',
  components: { BaseMenu },

  data() {
    return {
      tagLabel: '',
      tags: ['61bd4f', 'f2d600', 'ff9f1a', 'eb5a46', 'c377e0', '0079bf', '00c2e0', 'ff78cb', '97a0af'],
    };
  },
  methods: {
    ...mapMutations('dashboard', ['addDialogCardTodo']),
    handleSubmit() {
      if (!this.title) {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 20);
        return;
      }
      this.addDialogCardTodo(this.title);
      this.$refs.menu.$refs.menu.hide();
    },
    handleTagHover(event, tag) {
      const tagNode = event.target;
      tagNode.style.boxShadow = `-8px 0 #${tag}`;
    },
    handleTagUnhover(event) {
      const tagNode = event.target;
      tagNode.style.boxShadow = 'none';
    },
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
.tag-list {
  margin-bottom: 16px;
}
.tag-wrapper {
  padding-right: 36px;

  .tag {
    padding-right: 32px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: 700;
    margin: 0 0 4px;
    height: 32px;
    padding: 6px 32px 6px 12px;
    position: relative;
    transition: padding 85ms,margin 85ms,box-shadow 85ms;

    // &:hover {
    //   margin-left: 4px;
    //   box-shadow: -8px 0;
    // }
  }

}

.tag-icon {
  width: 32px;
  height: 32px;
}

.tag-edit-icon {
  width: 32px;
  height: 32px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(9,30,66,.08);
  }
}

.btn {
  height: 32px;
  border-radius: 3px;
  line-height: 20px;
  padding: 6px 12px;
  background-color: rgba(9,30,66,.04);
  cursor: pointer;
  font-weight: 400;
  margin: 8px 4px 8px 0;
  color: #172b4d;

  &:hover {
    background-color: rgba(9,30,66,.08);
  }
}
</style>
