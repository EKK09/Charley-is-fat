<template>
  <div
    ref="wrapper"
    class="dash-list-wraper"
    @mouseover="handleMouseOver"
  >
    <div
      ref="list"
      class="dash-list relative-position"
      :style="`top: ${top}px; left: ${left}px`"
    >
      <DashListHeader
        ref="header"
        :title="column.title"
        :column-index="column.columnIndex"
        @mousedown.native="handleMouseDown"
        @mousemove.native="handleMouseMove"
        @mouseup.native="handleMouseUp"
      />
      <div
        ref="cardList"
        class="dash-card-list-wrapper"
      >
        <DashCard
          v-for="card in column.cards"
          :key="card.id"
          :card="card"
        />
      </div>
      <DashListFooter :add-card="addCard" />
    </div>
    <div
      class="shadow"
      :style="`height: ${shadowHeight}px`"
    />
  </div>
</template>

<script>
import DashListHeader from 'src/components/dashboard/DashListHeader.vue';
import DashListFooter from 'src/components/dashboard/DashListFooter.vue';
import DashCard from 'src/components/dashboard/DashCard.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'DashList',
  components: { DashListHeader, DashListFooter, DashCard },
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDraggable: false,
      isMousePressing: false,
      shadowHeight: 0,
      hasMoved: false,
      top: 0,
      left: 0,
    };
  },
  computed: {
    ...mapState('dashboard', ['draggingList', 'draggingItem']),
  },
  methods: {
    ...mapMutations('dashboard', ['switchDraggingColumn', 'addColumnCard', 'insertDraggingCardItem']),

    handleMouseUp(event) {
      console.log('handleMouseUp');
      if (this.isMousePressing === false) {
        return;
      }
      const hasClickTextarea = event.path.includes(this.$refs.header.$refs.textarea);
      this.isMousePressing = false;
      if (this.$refs.header.isFocus() === false && hasClickTextarea) {
        this.$refs.header.focus();
      }
    },
    handleMouseDown(event) {
      console.log('handleMouseDown');

      if (this.$refs.header.isFocus()) {
        console.log('打字中');
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      this.isMousePressing = true;
      this.originX = event.clientX;
      this.originY = event.clientY;
      this.offsetX = event.clientX - this.$refs.wrapper.getBoundingClientRect().left;
      this.offsetY = event.clientY - this.$refs.wrapper.getBoundingClientRect().top;
    },
    handleMouseMove(event) {
      if (!this.isMousePressing || this.isDraggable) {
        return;
      }
      console.log('handleMouseMove');
      const distance = this.getMoveDistance(event.x, event.y);
      if (distance > 15) {
        this.setCardDragable();
        window.addEventListener('mousemove', this.handleWindowMouseMove);
        window.addEventListener('mouseup', this.handleWindowMouseUp);
      }
    },
    handleWindowMouseUp() {
      console.log('handleWindowMouseUp');
      this.cancelCardDragable();
      window.removeEventListener('mousemove', this.handleWindowMouseMove);
      window.removeEventListener('mouseup', this.handleWindowMouseUp);
    },
    handleWindowMouseMove(event) {
      this.top = event.clientY - this.offsetY;
      this.left = event.clientX - this.offsetX;
    },
    setCardDragable() {
      const {
        height, width, top, left,
      } = this.$refs.list.getBoundingClientRect();
      this.top = top;
      this.left = left;
      this.$refs.wrapper.style.pointerEvents = 'none';
      document.body.classList.add('grab');
      this.$refs.list.style.width = `${width}px`;
      this.$refs.list.classList.add('draggable');
      this.shadowHeight = height;
      this.isDraggable = true;
      const nodeId = 'dragging-list';
      this.$refs.wrapper.id = nodeId;
      const dragList = {
        id: 'testId',
        node: nodeId,
        item: this.column,
      };
      this.$store.commit('dashboard/setDraggingList', dragList);
    },
    cancelCardDragable() {
      this.$refs.list.classList.remove('draggable');
      document.body.classList.remove('grab');
      this.$refs.wrapper.style.removeProperty('pointer-events');
      this.$refs.list.style.removeProperty('width');
      this.$refs.list.style.removeProperty('top');
      this.$refs.list.style.removeProperty('left');
      this.$refs.wrapper.removeAttribute('id');
      this.shadowHeight = 0;
      this.isDraggable = false;
      this.isMousePressing = false;
      this.top = 0;
      this.left = 0;
      this.$store.commit('dashboard/setDraggingList', null);
    },
    getMoveDistance(x, y) {
      return Math.sqrt((x - this.originX) ** 2 + (y - this.originY) ** 2);
    },
    handleMouseOver(event) {
      if (this.draggingList === null && this.draggingItem === null) {
        return;
      }

      console.log(`handleMouseEnter index:${this.column.columnIndex}`);
      const {
        left, width,
      } = this.$refs.wrapper.getBoundingClientRect();
      const displacementX = event.clientX - left;
      const deltaX = Math.abs(displacementX);
      const isInsertBefore = deltaX > width / 2;

      if (this.draggingItem !== null) {
        if (this.draggingItem.item.columnIndex === this.column.columnIndex) {
          return;
        }
        const {
          top,
        } = this.$refs.cardList.getBoundingClientRect();

        const displacementY = event.clientY - top;
        const isInsertBeforeY = displacementY > 0;
        const target = document.getElementById(this.draggingItem.node);
        const targetParent = target.parentNode;
        targetParent.removeChild(target);
        const refParent = this.$refs.cardList;
        let itemIndex = 0;
        if (isInsertBeforeY) {
          refParent.appendChild(target);
          itemIndex = this.column.cards.length;
        } else {
          refParent.prepend(target);
        }
        this.insertDraggingCardItem({ columnIndex: this.column.columnIndex, itemIndex });
        return;
      }

      const ref = this.$refs.wrapper;
      const refParent = ref.parentNode;
      const target = document.getElementById(this.$store.state.dashboard.draggingList.node);
      const targetParent = target.parentNode;
      targetParent.removeChild(target);

      if (isInsertBefore) {
        refParent.insertBefore(target, ref);
      } else {
        refParent.insertBefore(target, ref.nextSibling);
      }
      this.switchDraggingColumn(this.column.columnIndex);
    },
    addCard(title) {
      this.addColumnCard({
        index: this.column.columnIndex,
        title,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dash-list-wraper {
  width: 272px;
  min-width: 272px;
  margin: 0 4px;
  // white-space: nowrap;
}
.dash-list {
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
}
.dash-card-list-wrapper {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track-piece {
    background: rgba(9,30,66,.08);
    &:vertical:start {
      border-radius: 4px 4px 0 0;
    }
    &:vertical:end {
      border-radius: 0 0 4px 4px;
    }
    &:horizontal:start {
      border-radius: 4px 0 0 4px;
    }
    &:horizontal:end {
      border-radius: 0 4px 4px 0;
    }
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(9,30,66,0.13);
    border-radius: 4px;
    display: block;
    height: 48px;
  }
}

.shadow {
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.15);
  margin-bottom: 8px;
}

.draggable {
  position: fixed;
  z-index: 10000;
  transform: rotate(6deg);
  cursor: grabbing;
}
</style>
