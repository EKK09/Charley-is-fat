<template>
  <div class="row no-wrap wrapper">
    <q-avatar
      size="32px"
      class="avatar"
    >
      <img
        :src="USER_AVATAR_PATH"
        style="object-fit: cover"
      >
    </q-avatar>
    <div class="col content-wrapper">
      <div class="content">
        <span class="name">查理布朗</span> 已變更這個看板的背景
      </div>

      <div class="time text-weight-medium">
        昨天晚上10點59分
      </div>
    </div>
  </div>
</template>
<script>
import { USER_AVATAR_PATH } from 'src/common/constants';

export default {
  name: 'Activity',
  data() {
    return { USER_AVATAR_PATH };
  },
};
</script>
<style lang="scss" scoped>

.wrapper {
  color: #172b4d;
  word-wrap: break-word;
  min-height: 56px;
}

.avatar {
  margin: 8px 8px 4px 0;
}
.content-wrapper {
  padding: 8px 0;
}

.name {
  font-weight: 700;
  word-wrap: break-word;
}

.time {
  color: #5e6c84;
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
}
</style>
