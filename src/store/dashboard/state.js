const fooCard = {
  id: '1',
  title: '打球',
  desc: '運動',
  tags: ['熱身', '流汗'],
};
const barCard = {
  id: '2',
  title: '游泳',
  desc: '流汗在泳池',
  tags: ['晚上', '每天'],
};
const bazCard = {
  id: '3',
  title: '喝飲料',
  tags: ['中午', '每天'],
  desc: '',
};
const qarCard = {
  id: '4',
  title: '看書',
  desc: '',
  tags: ['早上', '每天', '假日', '早上', '每天', '假日'],
};

const fooColumn = {
  title: '待辦事項',
  cards: ['1', '2'],
};
const barColumn = {
  title: '已完成',
  cards: ['3', '4', '4', '4', '4', '4', '4', '4'],
};

const state = () => ({
  cards: [fooCard, barCard, bazCard, qarCard],
  columns: [fooColumn, barColumn, barColumn],
  draggingItem: null,
  draggingList: null,
  isShowDrawer: false,
  drawerTab: 'menu',
  bgColorCode: '0279c0',

  isShowDialog: false,
  dialogCardId: '',

});
export default state;
