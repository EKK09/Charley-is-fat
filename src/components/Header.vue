<template>
  <q-header
    class="header text-white"
    :height-hint="40"
  >
    <div class="row items-center no-wrap">
      <q-toolbar-title class="row q-gutter-xs no-wrap">
        <AppMenuButton />
        <ButtonBase icon="home" />
        <ButtonBase icon="leaderboard">
          <div
            class="btn-lh q-ml-sm fz-md"
          >
            看板
          </div>
        </ButtonBase>
        <SearchBar />
      </q-toolbar-title>
      <div
        id="logo"
      />
      <q-toolbar-title class="row justify-end q-gutter-xs">
        <ButtonBase icon="add" />
        <ButtonBase icon="error_outline" />
        <ButtonBase icon="notifications" />
        <q-avatar
          size="32px"
        >
          <img
            src="/images/user.jpeg"
            style="object-fit: cover"
          >
        </q-avatar>
      </q-toolbar-title>
    </div>
  </q-header>
</template>

<script>
import ButtonBase from 'src/components/button/ButtonBase.vue';
import AppMenuButton from 'src/components/button/AppMenuButton.vue';
import SearchBar from 'src/components/SearchBar.vue';

export default {
  name: 'Header',
  components: { ButtonBase, SearchBar, AppMenuButton },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  background-color: rgba(0, 0, 0, 0.15);
  height: 40px;
  padding: 4px;
}

#logo {
  width: 80px;
  height: 16px;
  margin: 7px 0;
  position: relative;
  opacity: 0.5;
}
#logo::after {
  content: '';
  background-image: url(/images/logo.gif);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
#logo:hover {
  color: #091e42;
  opacity: 0.8;
  cursor: pointer;
}
</style>
