const fooTodoItem = {
  id: '1',
  isFinish: false,
  label: '每天打球',
  itemIndex: 0,
  todoIndex: 0,

};
const barTodoItem = {
  id: '2',
  isFinish: true,
  label: '每天睡覺',
  itemIndex: 1,
  todoIndex: 0,
};
const bazTodoItem = {
  id: '3',
  isFinish: true,
  label: '三三',
  itemIndex: 0,
  todoIndex: 1,
};
const baqTodoItem = {
  id: '4',
  isFinish: true,
  label: '四四',
  itemIndex: 1,
  todoIndex: 1,
};
const fooTodo = {
  id: 'a',
  title: '運動計畫',
  items: [fooTodoItem, barTodoItem],
  todoIndex: 0,
};
const barTodo = {
  id: 'b',
  title: '休息計畫',
  items: [bazTodoItem, baqTodoItem],
  todoIndex: 1,
};
const fooCard = {
  id: '1',
  title: '打球',
  desc: '運動',
  tags: ['0079bf', '00c2e0', 'ff78cb'],
  todos: [fooTodo, barTodo],
  columnIndex: 0,
  itemIndex: 0,
  hasMember: false,
  actions: [
    {
      text: '已完成這張卡片的「aaaa」',
      time: 1625286990318,
    },
    {
      text: '已完成這張卡片的「aaaa」',
      time: 1625203221044,
    },
    {
      text: '已完成這張卡片的「aaaa」',
      time: 1593667221044,
    },
  ],
};
const barCard = {
  id: '2',
  title: '游泳',
  desc: '流汗在泳池',
  tags: ['0079bf', '00c2e0'],
  todos: [fooTodo],
  columnIndex: 0,
  itemIndex: 1,
  hasMember: false,
  actions: [],
};
const bazCard = {
  id: '3',
  title: '喝飲料',
  tags: ['61bd4f', 'f2d600', 'ff9f1a'],
  desc: '',
  todos: [fooTodo],
  columnIndex: 1,
  itemIndex: 0,
  hasMember: false,
  actions: [],
};
const qarCard = {
  id: '4',
  title: '看書',
  desc: '',
  tags: ['61bd4f', 'f2d600', 'ff9f1a', 'eb5a46', 'c377e0', '0079bf', '00c2e0', 'ff78cb'],
  todos: [fooTodo],
  columnIndex: 1,
  itemIndex: 1,
  hasMember: false,
  actions: [],
};

const fooColumn = {
  id: 'a',
  title: '待辦事項',
  cards: [fooCard, barCard],
  columnIndex: 0,
};
const barColumn = {
  id: 'b',
  title: '已完成',
  cards: [bazCard, qarCard],
  columnIndex: 1,
};

const state = () => ({
  columns: [fooColumn, barColumn],
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
