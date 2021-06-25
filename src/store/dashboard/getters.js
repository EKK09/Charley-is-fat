export function getCardById(state) {
  return (id) => {
    for (let index = 0; index < state.cards.length; index += 1) {
      const card = state.cards[index];
      if (card.id === id) {
        return card;
      }
    }
    return null;
  };
}
export function getCardsByIds(state) {
  return (ids) => {
    const cards = [];
    for (let index = 0; index < state.cards.length; index += 1) {
      const card = state.cards[index];
      if (ids.includes(card.id)) {
        cards.push(card);
      }
    }
    return cards;
  };
}
