const fooCard = {
  id: '1',
  title: '打球',
  tags: ['熱身', '流汗'],
};
const barCard = {
  id: '2',
  title: '游泳',
  tags: ['晚上', '每天'],
};
const bazCard = {
  id: '3',
  title: '喝飲料',
  tags: ['中午', '每天'],
};
const qarCard = {
  id: '4',
  title: '看書',
  tags: ['早上', '每天', '假日', '早上', '每天', '假日'],
};

const fooColumn = ['1', '2'];
const barColumn = ['3', '4', '4', '4', '4', '4', '4', '4'];

const state = () => ({
  cards: [fooCard, barCard, bazCard, qarCard],
  columns: [fooColumn, barColumn, barColumn],
  draggingItem: null,
  draggingList: null,
});
export default state;
