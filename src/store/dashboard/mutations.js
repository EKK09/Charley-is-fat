import { getId } from 'src/common/IdGenerator';
// export function setDraggingId(state, id) {
//   state.draggingId = id;
// }
export function setDraggingItem(state, item) {
  console.log({ item });
  state.draggingItem = item;
}
export function setDraggingList(state, list) {
  console.log({ list });
  state.draggingList = list;
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
export function showDrawer(state) {
  state.isShowDrawer = true;
}
export function hideDrawer(state) {
  state.isShowDrawer = false;
}
export function setDrawerTab(state, tab) {
  state.drawerTab = tab;
}
export function setBgColor(state, code) {
  state.bgColorCode = code;
}
export function addColumn(state, title) {
  const column = {
    title,
    cards: [],
  };
  state.columns.push(column);
}
export function setColumnTitle(state, { index, title }) {
  state.columns[index].title = title;
  // const oldColumn = state.columns[index];
  // const column = {
  //   ...oldColumn,
  //   title,
  // };
  // state.columns.splice(index, 1, column);
}

export function switchDraggingColumn(state, index) {
  const draggingColumnIndex = state.draggingList.item.columnIndex;

  state.columns[draggingColumnIndex].columnIndex = index;
  state.columns[draggingColumnIndex].cards.forEach((card) => {
    card.columnIndex = index;
  });
  state.columns[index].columnIndex = draggingColumnIndex;
  state.columns[index].cards.forEach((card) => {
    card.columnIndex = draggingColumnIndex;
  });
  const temp = state.columns[draggingColumnIndex];
  state.columns[draggingColumnIndex] = state.columns[index];
  state.columns[index] = temp;
  // state.draggingList = { ...state.draggingList, index };
  state.columns.forEach((column) => {
    console.log(column.cards.map((card) => card.title));
  });
}
export function addColumnCard(state, { index, title }) {
  const id = getId();
  const newCard = {
    id,
    title,
    tags: [],
  };
  state.cards.push(newCard);
  const column = state.columns[index];
  column.cards.push(id);
}

export function setIsShowDialog(state, val) {
  state.isShowDialog = val;
}
export function setDialogCard(state, card) {
  state.dialogCard = card;
}
export function updateCard(state, card) {
  for (let index = 0; index < state.cards.length; index += 1) {
    if (card.id === state.cards[index].id) {
      state.cards.splice(index, 1, card);
      return;
    }
  }
}
export function updateTodoItem(state, { item, todoIndex, itemIndex }) {
  if (!state.dialogCard) {
    return;
  }

  state.dialogCard.todos[todoIndex].items.splice(itemIndex, 1, item);
}
export function addTodoItem(state, { item, todoIndex }) {
  if (!state.dialogCard) {
    return;
  }
  state.dialogCard.todos[todoIndex].items.push(item);
}
export function switchDraggingTodo(state, index) {
  if (!state.dialogCard) {
    return;
  }
  const card = state.dialogCard;
  const draggingTodoIndex = state.draggingList.index;
  const tem = card.todos[draggingTodoIndex];
  card.todos[draggingTodoIndex] = card.todos[index];
  card.todos[index] = tem;
  state.draggingList = { ...state.draggingList, index };
  console.log(card.todos.map((c) => c.title));
}
export function switchDraggingTodoItem(state, todoItem) {
  console.log('switchDraggingTodoItem');
  if (!state.dialogCard) {
    return;
  }
  const card = state.dialogCard;

  const dragItem = state.draggingItem.item;
  const tempItem = { ...dragItem };

  dragItem.itemIndex = todoItem.itemIndex;
  dragItem.todoIndex = todoItem.todoIndex;

  todoItem.itemIndex = tempItem.itemIndex;

  card.todos[dragItem.todoIndex].items[dragItem.itemIndex] = dragItem;
  card.todos[todoItem.todoIndex].items[todoItem.itemIndex] = todoItem;

  card.todos.forEach((todo) => {
    console.log(todo.items.map((item) => (item ? item.label : undefined)));
  });
}
export function insertDraggingTodoItem(state, { todoIndex, itemIndex }) {
  console.log('insertDraggingTodoItem');
  if (!state.dialogCard) {
    return;
  }
  const card = state.dialogCard;

  const dragItem = state.draggingItem.item;
  card.todos[dragItem.todoIndex].items[dragItem.itemIndex] = undefined;
  const originDragTodoIndex = dragItem.todoIndex;
  dragItem.todoIndex = todoIndex;
  dragItem.itemIndex = itemIndex;
  const targetItems = card.todos[todoIndex].items;

  const lastItem = targetItems.reduce((acc, item, index, items) => {
    if (index < itemIndex) {
      return acc;
    }
    items[index] = acc;
    if (item) {
      item.itemIndex = index + 1;
    }
    return item;
  }, dragItem);

  if (lastItem) {
    targetItems[targetItems.length] = lastItem;
  }
  const originItems = card.todos[originDragTodoIndex].items;
  originItems.reduce((acc, item) => {
    if (item !== undefined) {
      item.itemIndex = acc;
    }
    return acc + 1;
  }, 0);

  card.todos.forEach((todo) => {
    console.log(todo.items.map((item) => (item ? item.label : undefined)));
  });
}

export function removeEmptyTodoItem(state) {
  console.log('removeEmptyTodoItem');
  if (!state.dialogCard) {
    return;
  }
  const card = state.dialogCard;
  card.todos = card.todos.map((todo) => ({
    ...todo,
    items: todo.items.filter((item) => !!item && item.label),
  }));
  card.todos.forEach((todo) => {
    console.log(todo.items.map((item) => (item ? item.label : undefined)));
  });
}
export function switchDraggingCardItem(state, cardItem) {
  console.log('switchDraggingCardItem');
  const dragItem = state.draggingItem.item;
  const tempItem = { ...dragItem };

  dragItem.itemIndex = cardItem.itemIndex;
  dragItem.columnIndex = cardItem.columnIndex;

  cardItem.itemIndex = tempItem.itemIndex;
  const { columns } = state;

  columns[dragItem.columnIndex].cards[dragItem.itemIndex] = dragItem;
  columns[cardItem.columnIndex].cards[cardItem.itemIndex] = cardItem;

  columns.forEach((column) => {
    console.log(column.cards.map((item) => (item ? item.title : undefined)));
  });
}
export function insertDraggingCardItem(state, { columnIndex, itemIndex }) {
  console.log('insertDraggingCardItem');
  const dragItem = state.draggingItem.item;
  state.columns[dragItem.columnIndex].cards[dragItem.itemIndex] = undefined;

  const originDragColumnIndex = dragItem.columnIndex;

  dragItem.columnIndex = columnIndex;
  dragItem.itemIndex = itemIndex;
  const targetCards = state.columns[columnIndex].cards;

  const lastItem = targetCards.reduce((acc, card, index, cards) => {
    if (index < itemIndex) {
      return acc;
    }
    cards[index] = acc;
    if (card) {
      card.itemIndex = index + 1;
    }
    return card;
  }, dragItem);

  if (lastItem) {
    targetCards[targetCards.length] = lastItem;
  }

  const originCards = state.columns[originDragColumnIndex].cards;
  originCards.reduce((acc, card) => {
    if (card !== undefined) {
      card.itemIndex = acc;
    }
    return acc + 1;
  }, 0);

  state.columns.forEach((column) => {
    console.log(column.cards.map((item) => (item ? item.title : undefined)));
  });
}

export function removeEmptyCard(state) {
  console.log('removeEmptyCard');
  state.columns = state.columns.map((column, columnIndex) => ({
    ...column,
    cards: column.cards.filter((card) => card !== undefined).map((card, index) => {
      card.itemIndex = index;
      card.columnIndex = columnIndex;
      return card;
    }),
  }));
  state.columns.forEach((column) => {
    console.log(column.cards.map((item) => (item ? item.title : undefined)));
  });
}
