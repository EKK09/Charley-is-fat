<template>
  <div
    ref="wrapper"
    class="card-wraper"
    @mouseover="handleMouseOver"
  >
    <div
      ref="card"
      class="dash-card relative-position"
      :style="`top: ${top}px; left: ${left}px`"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    >
      <div class="row ">
        <div
          v-for="(tag, index) in card.tags"
          :key="index"
          class="tag"
          :style="`background-color: #${tag}`"
        />
      </div>
      <div class="title">
        {{ card.title }}
      </div>
      <div class="card-detail row">
        <div
          v-show="card.desc"
          class="card-detail-item flex flex-center"
        >
          <q-icon
            name="subject"
            size="16px"
          />
        </div>
        <div
          v-show="card.todos.length"
          class="card-detail-item flex flex-center"
        >
          <q-icon
            :name="outlinedCheckBox"
            size="16px"
          />
          <div
            class="text"
          >
            {{ todoStatusText }}
          </div>
        </div>
        <q-space />
        <q-avatar
          v-show="card.hasMember"
          size="32px"
        >
          <img
            :src="USER_AVATAR_PATH"
            style="object-fit: cover"
          >
        </q-avatar>
      </div>
      <div class="edit-btn absolute-top-right flex flex-center">
        <q-icon name="mode_edit_outline" />
      </div>
    </div>
    <div
      class="shadow"
      :style="`height: ${shadowHeight}px`"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { outlinedCheckBox } from '@quasar/extras/material-icons-outlined';
import { USER_AVATAR_PATH } from 'src/common/constants';

export default {
  name: 'DashCard',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDraggable: false,
      isMousePressing: false,
      shadowHeight: 0,
      top: 0,
      left: 0,
      offsetX: 0,
      offsetY: 0,
      originX: 0,
      originY: 0,
      outlinedCheckBox,
      USER_AVATAR_PATH,
    };
  },
  computed: {
    ...mapState('dashboard', ['draggingItem']),
    todoStatusText() {
      let totalCount = 0;
      let finishedCount = 0;
      this.card.todos.forEach((todo) => {
        todo.items.forEach((item) => {
          totalCount += 1;
          if (item.isFinish) {
            finishedCount += 1;
          }
        });
      });
      return `${finishedCount}/${totalCount}`;
    },
  },
  methods: {
    ...mapMutations('dashboard', [
      'setIsShowDialog',
      'setDialogCard',
      'switchDraggingCardItem',
      'insertDraggingCardItem',
      'removeEmptyCard',
    ]),

    handleMouseUp() {
      if (this.isMousePressing === false) {
        return;
      }
      this.isMousePressing = false;
      this.showCardDialog();
    },
    async showCardDialog() {
      await this.$router.push({ query: { card: this.card.id } });
      this.setDialogCard(this.card);
      this.setIsShowDialog(true);
    },
    handleMouseDown(event) {
      this.isMousePressing = true;
      this.originX = event.clientX;
      this.originY = event.clientY;
      this.offsetX = event.clientX - this.$refs.card.getBoundingClientRect().left;
      this.offsetY = event.clientY - this.$refs.card.getBoundingClientRect().top;
    },
    handleMouseMove(event) {
      if (!this.isMousePressing || this.isDraggable) {
        return;
      }
      const distance = this.getMoveDistance(event.x, event.y);
      if (distance > 15) {
        this.setCardDragable();
        window.addEventListener('mousemove', this.handleWindowMouseMove);
        window.addEventListener('mouseup', this.handleWindowMouseUp);
      }
    },
    handleWindowMouseUp() {
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
      } = this.$refs.card.getBoundingClientRect();
      this.top = top;
      this.left = left;
      this.$refs.wrapper.style.pointerEvents = 'none';
      document.body.classList.add('grab');
      this.$refs.card.style.width = `${width}px`;
      this.$refs.card.classList.add('draggable');
      this.shadowHeight = height;
      this.isDraggable = true;
      const nodeId = 'dragging-item';
      this.$refs.wrapper.id = nodeId;
      const dragItem = {
        id: this.card.id,
        node: nodeId,
        item: this.card,
      };
      this.$store.commit('dashboard/setDraggingItem', dragItem);
    },
    cancelCardDragable() {
      this.$refs.card.classList.remove('draggable');
      document.body.classList.remove('grab');
      this.$refs.wrapper.style.removeProperty('pointer-events');
      this.$refs.card.style.removeProperty('width');
      this.$refs.card.style.removeProperty('top');
      this.$refs.card.style.removeProperty('left');
      this.$refs.wrapper.removeAttribute('id');
      this.shadowHeight = 0;
      this.isDraggable = false;
      this.isMousePressing = false;
      this.top = 0;
      this.left = 0;
      this.$store.commit('dashboard/setDraggingItem', null);
      this.removeEmptyCard();
    },
    getMoveDistance(x, y) {
      return Math.sqrt((x - this.originX) ** 2 + (y - this.originY) ** 2);
    },
    handleMouseOver(event) {
      if (this.$store.state.dashboard.draggingItem === null) {
        return;
      }
      event.stopPropagation();
      const { top, height } = this.$refs.wrapper.getBoundingClientRect();
      const tagetCenterY = top + height / 2;
      const displacementY = event.clientY - tagetCenterY;

      const ref = this.$refs.wrapper;
      const refParent = ref.parentNode;
      const target = document.getElementById(this.$store.state.dashboard.draggingItem.node);
      const targetParent = target.parentNode;
      targetParent.removeChild(target);

      const iSameColumn = this.draggingItem.item.columnIndex === this.card.columnIndex;

      if (iSameColumn) {
        if (displacementY > 0) {
          refParent.insertBefore(target, ref);
        } else {
          refParent.insertBefore(target, ref.nextSibling);
        }

        this.switchDraggingCardItem(this.card);
        return;
      }

      if (displacementY > 0) {
        this.insertDraggingCardItem({
          columnIndex: this.card.columnIndex,
          itemIndex: this.card.itemIndex + 1,
        });
        refParent.insertBefore(target, ref.nextSibling);
      } else {
        this.insertDraggingCardItem({
          columnIndex: this.card.columnIndex,
          itemIndex: this.card.itemIndex,
        });
        refParent.insertBefore(target, ref);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card-wraper {
  padding: 0 8px;
}
.dash-card {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  cursor: pointer;
  display: block;
  min-height: 20px;
  text-decoration: none;
  margin-bottom: 8px;
  z-index: 0;
  user-select: none;
  padding: 6px 8px 2px;
  border-radius: 4px;

  .title {
    margin: 0 0 4px;
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal;
    font-weight: 500;
    color: #172b4d;
  }

  &:not(:active):hover {
    background-color: #f4f5f7;
  }
  &:hover {
    .edit-btn {
      display: flex;
    }
  }
}

.edit-btn {
  display: none;
  width: 28px;
  height: 28px;
  margin: 2px;
  border-radius: 3px;
  opacity: 0.5;
  background-color: #ebecf0;

  &:hover{
    background-color: #ebecf0;
    opacity: 1;
  }
}

.tag {
  width: 40px;
  height: 8px;
  white-space: nowrap;
  margin: 0 4px 4px 0;
  border-radius: 3px;
}
.shadow {
  border-radius: 3px;
  background-color: rgba(9,30,66,.03);
  margin-bottom: 8px;
}
.draggable {
  position: fixed;
  z-index: 10000;
  transform: rotate(6deg);
  cursor: grabbing;
}

.card-detail {
  font-weight: 500;
  color: #5e6c84;

  .card-detail-item {
    min-width: 24px;
    height: 24px;
    margin: 0 4px 4px 0;

    .text{
      font-size: 12px;
      padding: 0 4px 0 2px;
      vertical-align: top;
      white-space: nowrap;
    }
  }
}

</style>
