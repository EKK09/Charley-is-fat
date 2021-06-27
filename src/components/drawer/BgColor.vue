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

export default {
  name: 'BgColor',
  ...mapMutations('dashboard', ['setDrawerTab']),
  data() {
    return {
      colorCodes: [
        '0279c0',
        'd29034',
        '529838',
        'af4632',
        '89609e',
        'cd5a90',
        '4abf6b',
        '07adcc',
        '848d91',
      ],
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
