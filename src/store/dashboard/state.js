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
  title: '運動計畫',
  items: [fooTodoItem, barTodoItem],
  todoIndex: 0,
};
const barTodo = {
  title: '休息計畫',
  items: [bazTodoItem, baqTodoItem],
  todoIndex: 1,
};
const fooCard = {
  id: '1',
  title: '打球',
  desc: '運動',
  tags: ['熱身', '流汗'],
  todos: [fooTodo, barTodo],
  columnIndex: 0,
  itemIndex: 0,
};
const barCard = {
  id: '2',
  title: '游泳',
  desc: '流汗在泳池',
  tags: ['晚上', '每天'],
  todos: [fooTodo],
  columnIndex: 0,
  itemIndex: 1,
};
const bazCard = {
  id: '3',
  title: '喝飲料',
  tags: ['中午', '每天'],
  desc: '',
  todos: [fooTodo],
  columnIndex: 1,
  itemIndex: 0,
};
const qarCard = {
  id: '4',
  title: '看書',
  desc: '',
  tags: ['早上', '每天', '假日', '早上', '每天', '假日'],
  todos: [fooTodo],
  columnIndex: 1,
  itemIndex: 1,
};

const fooColumn = {
  title: '待辦事項',
  cards: [fooCard, barCard],
  columnIndex: 0,
};
const barColumn = {
  title: '已完成',
  cards: [bazCard, qarCard],
  columnIndex: 1,
};

const state = () => ({
  cards: [fooCard, barCard, bazCard, qarCard],
  columns: [fooColumn, barColumn],
  draggingItem: null,
  draggingList: null,
  isShowDrawer: false,
  drawerTab: 'menu',
  bgColorCode: '0279c0',

  isShowDialog: false,
  dialogCard: null,

});
export default state;
