// export function setDraggingId(state, id) {
//   state.draggingId = id;
// }
export function setDraggingItem(state, item) {
  console.log({ item });
  state.draggingItem = item;
}
export function modifyColumn(state) {
  console.log('modifyColumn');
  console.log(state.columns[1]);
  // const newarr = [].concat(state.columns[1]).reverse();
  // const barColumn = ['4', '1'];
  // const newcolumns = [state.columns[0], barColumn];
  const a = [...state.columns];
  const b = [...state.columns[1]];
  b.reverse();
  a.splice(1, 1, b);
  // newcolumns.splice(1, 1, barColumn);
  state.columns = a;
}
