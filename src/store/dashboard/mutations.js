import { getId } from 'src/common/IdGenerator';

export function setDraggingItem(state, item) {
  state.draggingItem = item;
}
export function setDraggingList(state, list) {
  state.draggingList = list;
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
    id: getId(),
    title,
    cards: [],
    columnIndex: state.columns.length,
  };
  state.columns.push(column);
}
export function removeColumn(state, index) {
  state.columns.splice(index, 1);
  state.columns.forEach((column, columnIndex) => {
    column.columnIndex = columnIndex;
    column.cards.forEach((card) => {
      card.columnIndex = columnIndex;
    });
  });
}

export function setColumnTitle(state, { index, title }) {
  state.columns[index].title = title;
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
}
export function addColumnCard(state, { index, title }) {
  const newCard = {
    id: getId(),
    title,
    tags: [],
    columnIndex: index,
    itemIndex: state.columns[index].cards.length,
    todos: [],
    actions: [
      {
        text: `已將這張卡片新增到「${state.columns[index].title}」`,
        time: Date.now(),
      },
    ],
    hasMember: false,
  };
  state.columns[index].cards.push(newCard);
}

export function setIsShowDialog(state, val) {
  state.isShowDialog = val;
}
export function setDialogCard(state, card) {
  state.dialogCard = card;
}
export function setDialogCardDesc(state, desc) {
  if (!state.dialogCard) {
    return;
  }
  state.dialogCard.desc = desc;
}
export function setDialogCardTitle(state, title) {
  if (!state.dialogCard) {
    return;
  }
  state.dialogCard.title = title;
}
export function addDialogCardTodo(state, title) {
  if (!state.dialogCard) {
    return;
  }
  const newTodo = {
    id: getId(),
    title,
    todoIndex: state.dialogCard.todos.length,
    items: [],
  };
  state.dialogCard.todos.push(newTodo);
  state.dialogCard.actions.unshift({
    text: `已將「${title}」新增到這張卡片`,
    time: Date.now(),
  });
}
export function removeDialogCardTodo(state, todoIndex) {
  if (!state.dialogCard) {
    return;
  }

  const removeItems = state.dialogCard.todos.splice(todoIndex, 1);
  const actionText = ` 已從這張卡片中移除「${removeItems[0].title}」`;
  state.dialogCard.actions.unshift({
    text: actionText,
    time: Date.now(),
  });
  state.dialogCard.todos.forEach((todo, index) => {
    todo.todoIndex = index;
    todo.items.forEach((item) => { item.todoIndex = index; });
  });
}
export function removeDialogCardTodoItem(state, { todoIndex, itemIndex }) {
  if (!state.dialogCard) {
    return;
  }
  state.dialogCard.todos[todoIndex].items.splice(itemIndex, 1);
  state.dialogCard.todos[todoIndex].items.forEach((item, index) => {
    item.itemIndex = index;
  });
}
export function addDialogCardTag(state, tag) {
  if (!state.dialogCard) {
    return;
  }
  state.dialogCard.tags.push(tag);
}
export function removeDialogCardTag(state, tag) {
  if (!state.dialogCard) {
    return;
  }
  const { tags } = state.dialogCard;
  for (let index = 0; index < tags.length; index += 1) {
    if (tags[index] === tag) {
      tags.splice(index, 1);
    }
  }
}

export function toggleDialogCardHasMember(state) {
  if (!state.dialogCard) {
    return;
  }
  state.dialogCard.hasMember = !state.dialogCard.hasMember;
}

export function updateTodoItem(state, { item, todoIndex, itemIndex }) {
  if (!state.dialogCard) {
    return;
  }

  state.dialogCard.todos[todoIndex].items.splice(itemIndex, 1, item);
}
export function toggleTodoItemStatus(state, { todoIndex, itemIndex }) {
  if (!state.dialogCard) {
    return;
  }
  const newItem = {
    ...state.dialogCard.todos[todoIndex].items[itemIndex],
    isFinish: !state.dialogCard.todos[todoIndex].items[itemIndex].isFinish,
  };
  state.dialogCard.todos[todoIndex].items.splice(itemIndex, 1, newItem);
  const actionText = newItem.isFinish ? `已完成這張卡片的「${newItem.label}」` : `已將這張卡片的「${newItem.label}」標示為未完成`;
  state.dialogCard.actions.unshift({
    text: actionText,
    time: Date.now(),
  });
}

export function addTodoItem(state, { label, todoIndex }) {
  if (!state.dialogCard) {
    return;
  }
  const todoItem = {
    id: getId(),
    isFinish: false,
    label,
    todoIndex,
    itemIndex: state.dialogCard.todos[todoIndex].items.length,
  };
  state.dialogCard.todos[todoIndex].items.push(todoItem);
}
export function switchDraggingTodo(state, index) {
  if (!state.dialogCard) {
    return;
  }
  const card = state.dialogCard;
  const draggingTodoIndex = state.draggingList.item.todoIndex;
  card.todos[draggingTodoIndex].todoIndex = index;
  card.todos[draggingTodoIndex].items.forEach((item) => {
    item.todoIndex = index;
  });

  card.todos[index].todoIndex = draggingTodoIndex;
  card.todos[index].items.forEach((item) => {
    item.todoIndex = draggingTodoIndex;
  });

  const temp = card.todos[draggingTodoIndex];
  card.todos[draggingTodoIndex] = card.todos[index];
  card.todos[index] = temp;
}
export function switchDraggingTodoItem(state, todoItem) {
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
}
export function insertDraggingTodoItem(state, { todoIndex, itemIndex }) {
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
}

export function removeEmptyTodoItem(state) {
  if (!state.dialogCard) {
    return;
  }
  const card = state.dialogCard;
  card.todos = card.todos.map((todo, todoIndex) => ({
    ...todo,
    todoIndex,
    items: todo.items.filter((item) => item !== undefined).map((item, index) => ({
      ...item,
      todoIndex,
      itemIndex: index,
    })),
  }));
}
export function switchDraggingCardItem(state, cardItem) {
  const dragItem = state.draggingItem.item;
  const tempItem = { ...dragItem };

  dragItem.itemIndex = cardItem.itemIndex;
  dragItem.columnIndex = cardItem.columnIndex;

  cardItem.itemIndex = tempItem.itemIndex;
  const { columns } = state;

  columns[dragItem.columnIndex].cards[dragItem.itemIndex] = dragItem;
  columns[cardItem.columnIndex].cards[cardItem.itemIndex] = cardItem;
}
export function insertDraggingCardItem(state, { columnIndex, itemIndex }) {
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
}

export function removeEmptyCard(state) {
  state.columns = state.columns.map((column, columnIndex) => ({
    ...column,
    cards: column.cards.filter((card) => card !== undefined).map((card, index) => ({
      ...card,
      itemIndex: index,
      columnIndex,
    })),
  }));
}
export function setDashboardTitle(state, title) {
  state.dashboardTitle = title;
}
export function setColumns(state, columns) {
  state.columns = columns;
}
export function showCardDialog(state, cardId) {
  for (let columnIndex = 0; columnIndex < state.columns.length; columnIndex += 1) {
    const column = state.columns[columnIndex];
    for (let cardIndex = 0; cardIndex < column.cards.length; cardIndex += 1) {
      const card = column.cards[cardIndex];
      if (card.id === cardId) {
        state.dialogCard = card;
        state.isShowDialog = true;
        return;
      }
    }
  }
}
