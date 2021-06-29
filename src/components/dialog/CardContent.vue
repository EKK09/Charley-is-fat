<template>
  <div class="content">
    <div class="module">
      <div class="header">
        <div class="header-icon flex flex-center">
          <q-icon
            name="subject"
            size="24px"
          />
        </div>
        <div class="header-label">
          描述
        </div>
      </div>
      <div class="content-wrapper">
        test
      </div>
    </div>
    <div class="module">
      <div class="header">
        <div class="header-icon flex flex-center">
          <q-icon
            :name="outlinedCheckBox"
            size="24px"
          />
        </div>
        <div class="header-label">
          描述
        </div>
      </div>
      <div class="content-wrapper">
        test
      </div>
    </div>
    <div class="module">
      <div class="header">
        <div class="header-icon flex flex-center">
          <q-icon
            name="format_list_numbered_rtl"
            size="24px"
          />
        </div>
        <div class="header-label">
          活動
        </div>
      </div>
      <div class="content-wrapper">
        test
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import { outlinedCheckBox } from '@quasar/extras/material-icons-outlined';

export default {
  name: 'CardContent',
  data() {
    return {
      outlinedCheckBox,
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
.content {
  float: left;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 24px;
  padding: 0 8px 8px 16px;
  position: relative;
  width: 552px;
  z-index: 0;
  box-sizing: content-box;
}
.module{
  clear: both;
  margin-bottom: 24px;
  position: relative;
}
.header {
  padding: 8px 0;
  position: relative;
  margin: 8px 0 4px 40px;
  display: flex;
  align-items: center;
  min-height: 32px;

  .header-icon {
    left: -40px;
    position: absolute;
    top: 8px;
    color: #42526e;
    height: 32px;
    line-height: 32px;
    width: 32px;
    font-size: 24px;
  }

  .header-label {
    width: auto;
    margin: 0;
    min-height: 18px;
    min-width: 40px;
    font-weight: 600;
    font-size: 16px;
  }
}

.content-wrapper {
  margin-left: 40px;
}
</style>
