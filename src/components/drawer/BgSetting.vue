<template>
  <div class="fit q-pt-md">
    <div class="row">
      <div class="column item col-6  cursor-pointer">
        <div class="image photo" />
        <div class="text">
          照片
        </div>
      </div>
      <div
        class="column item col-6 cursor-pointer"
        @click="goToColorTab"
      >
        <div class="image color" />
        <div class="text">
          顏色
        </div>
      </div>
    </div>
    <q-separator style="margin: 15px 0 20px" />
    <div
      style="
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      margin: 0 0 8px;"
    >
      客製
    </div>
    <div
      class="custom-wrapper relative-position"
    >
      <div class="mask absolute fit" />
      <div class="add-btn-wrapper">
        <div class="add-btn flex flex-center">
          <q-icon
            name="add"
            size="30px"
            style="color: #42526e;"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'BgSetting',
  methods: {
    ...mapMutations('dashboard', ['setDrawerTab']),
    goToColorTab() {
      this.setDrawerTab('color');
    },
  },
};
</script>
<style lang="scss" scoped>
.image {
  background-color: #dfe1e6;
  background-size: cover;
  border-radius: 8px;
  height: 96px;
  width: 100%;

  &:hover {
    opacity: .7;
  }
}
.photo {
  background-image: url(https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg);
}

.color {
  background-image: url(https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg);
}
.item {
  padding: 0 4px;
}
.text {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  cursor: pointer;
  text-align: center;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.custom-wrapper {
  background-color: hsla(0,0%,94%,.7);
}
.mask {
  background-color: hsla(0,0%,94%,.7);
  z-index: 2;
}
.add-btn-wrapper {
  padding: 0 4px 8px;
  width: 50%;
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
}
.add-btn {
  background-color: rgba(9,30,66,.04);
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  height: 96px;
}
</style>
