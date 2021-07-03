<template>
  <div class="fit q-pt-md">
    <div class="row ">
      <div
        v-for="(code, index) in colorCodes"
        :key="index"
        class="color-wrapper col-6 cursor-pointer"
        @click="handleClick(code)"
      >
        <div
          class="color"
          :style="`background-color: #${code}`"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { BG_COLOR } from 'src/common/constants';

export default {
  name: 'BgColor',
  ...mapMutations('dashboard', ['setDrawerTab']),
  data() {
    return {
      colorCodes: BG_COLOR,
    };
  },
  methods: {
    ...mapMutations('dashboard', ['setBgColor']),
    handleClick(code) {
      this.setBgColor(code);
    },
  },
};
</script>
<style lang="scss" scoped>
.color-wrapper {
  padding: 0 4px;
}

.color {
  background-size: cover;
  border-radius: 8px;
  height: 96px;
  margin-bottom: 8px;
  width: 100%;
  &:hover {
    opacity: .7;
  }
}
</style>
