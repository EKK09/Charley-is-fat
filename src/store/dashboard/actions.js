import { LocalStorage } from 'quasar';

export function setDashboardAction({ state }) {
  try {
    const { bgColorCode, dashboardTitle, columns } = state;
    LocalStorage.set('bg', bgColorCode);
    LocalStorage.set('t', dashboardTitle);
    LocalStorage.set('c', columns);
  } catch (error) {
    // TODO: 錯誤處理
  }
}
export function getDashboardAction({ commit }) {
  try {
    const bgColorCode = LocalStorage.getItem('bg');
    if (bgColorCode) {
      commit('setBgColor', bgColorCode);
    }
    const dashboardTitle = LocalStorage.getItem('t');
    if (dashboardTitle) {
      commit('setDashboardTitle', dashboardTitle);
    }

    const columns = LocalStorage.getItem('c');
    if (columns) {
      commit('setColumns', columns);
    }
  } catch (error) {
    // TODO: 錯誤處理
  }
}
