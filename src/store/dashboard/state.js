import fooColumns from 'src/common/fooData';

const state = () => ({
  columns: fooColumns,
  draggingItem: null,
  draggingList: null,
  isShowDrawer: false,
  drawerTab: 'menu',
  bgColorCode: '0279c0',

  isShowDialog: false,
  dialogCard: null,
  dashboardTitle: '減肥計劃',

});
export default state;
