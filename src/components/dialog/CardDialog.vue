<template>
  <q-dialog
    ref="dialog"
    v-model="isShow"
    class="non-selectable"
    maximized
    transition-show="none"
    transition-hide="none"
  >
    <div
      class="row justify-center relative-position"
      @click="handleBackDropClick"
    >
      <div
        ref="dialogCard"
        class="dialog-card"
      >
        <div
          class="close-btn flex flex-center absolute-top-right"
          @click="hideDialog"
        >
          <q-icon
            name="close"
            size="20px"
          />
        </div>
        <CardHeader class="non-selectable" />
        <CardContent class="non-selectable" />
        <CardSide class="non-selectable" />
      </div>
    </div>
  </q-dialog>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { outlinedTopic } from '@quasar/extras/material-icons-outlined';
import CardHeader from 'src/components/dialog/CardHeader.vue';
import CardContent from 'src/components/dialog/CardContent.vue';
import CardSide from 'src/components/dialog/CardSide.vue';

export default {
  name: 'CardDialog',
  components: { CardHeader, CardContent, CardSide },
  data() {
    return {
      outlinedTopic,
    };
  },
  computed: {
    ...mapState('dashboard', ['isShowDialog']),

    isShow: {
      get() {
        return this.isShowDialog;
      },
      set(val) {
        this.setIsShowDialog(val);
        if (!val) {
          this.handleDialogClose();
        }
      },
    },

  },
  methods: {
    ...mapMutations('dashboard', ['setIsShowDialog', 'setDialogCard']),
    hideDialog() {
      this.$refs.dialog.hide();
      this.setDialogCard(null);
    },
    handleDialogClose() {
      this.setDialogCard(null);
      this.$router.replace({ query: undefined }).catch(() => {});
    },
    handleBackDropClick(event) {
      const hasClickCard = event.path.includes(this.$refs.dialogCard);
      if (!hasClickCard) {
        this.hideDialog();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-card {
    background-color: #f4f5f7;
    border-radius: 2px;
    margin: 48px 0 80px;
    overflow: hidden;
    position: relative;
    width: 768px;
    color: #172b4d;
    z-index: 4;
}
.close-btn {
  color: #42526e;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 4px;
  width: 40px;
  z-index: 2;
  transition: background-color 85ms,color 85ms;
  cursor: pointer;

  &:hover {
    background-color: rgba(9,30,66,.08);
    border-radius: 50%;
  }
}
</style>
