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
export async function getDashboardAction({ commit }) {
  try {
    const bgColorCode = LocalStorage.getItem('bg');
    if (bgColorCode) {
      commit('setBgColor', bgColorCode);
    }
    const dashboardTitle = LocalStorage.getItem('t');
    if (dashboardTitle) {
      commit('setDashboardTitle', dashboardTitle);
    }

    const localColumns = LocalStorage.getItem('c');
    if (localColumns && localColumns.length > 0) {
      commit('setColumns', localColumns);
    } else {
      const response = await fetch(process.env.DATA_URL);
      const columns = await response.json();
      commit('setColumns', columns);
    }
  } catch (error) {
    // TODO: 錯誤處理
  }
}
