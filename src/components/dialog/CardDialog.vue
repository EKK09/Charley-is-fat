<template>
  <q-dialog
    v-if="dialogCard"
    ref="dialog"
    v-model="isShow"
    maximized
    transition-show="none"
    transition-hide="none"
  >
    <div
      class="row justify-center dialog-card-wrapper relative-position"
    >
      <div class="dialog-card">
        <div
          class="close-btn flex flex-center absolute-top-right"
          @click="hideDialog"
        >
          <q-icon
            name="close"
            size="20px"
          />
        </div>
        <CardHeader />
        <CardContent />
        <CardSide />
      </div>
      <div
        class="absolute fit back-drop"
        @click="hideDialog"
      />
    </div>
  </q-dialog>
</template>
<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
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
      editableTitle: 'testestes',
    };
  },
  computed: {
    ...mapState('dashboard', ['isShowDialog', 'dialogCardId']),
    ...mapGetters('dashboard', ['dialogCard']),

    isShow: {
      get() {
        return this.isShowDialog;
      },
      set(val) {
        this.setIsShowDialog(val);
      },
    },

  },
  methods: {
    ...mapMutations('dashboard', ['setIsShowDialog']),
    hideDialog() {
      this.$refs.dialog.hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-card-wrapper {

}
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
.back-drop {
  z-index: 2;
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
