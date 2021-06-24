<template>
  <div class="card-wraper">
    <div
      ref="card"
      class="dash-card relative-position"
      :style="`top: ${top}px; left: ${left}px`"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
    >
      <div class="row ">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="tag"
          :class="`bg-${tag}`"
        />
      </div>
      <div class="title">
        打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球打球
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
export default {
  name: 'DashCard',
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
      tags: [
        'primary',
        'positive',
        'info',
        'warning',
        'accent',
        'dark',
      ],
    };
  },
  methods: {
    handleMouseDown(event) {
      console.log('handleMouseDown');
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
      // console.log(event);
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
      this.$refs.card.style.width = `${width}px`;
      this.$refs.card.classList.add('draggable');
      this.shadowHeight = height;
      this.isDraggable = true;
    },
    cancelCardDragable() {
      this.$refs.card.classList.remove('draggable');
      this.shadowHeight = 0;
      this.isDraggable = false;
      this.isMousePressing = false;
      this.top = 0;
      this.left = 0;
    },
    getMoveDistance(x, y) {
      return Math.sqrt((x - this.originX) ** 2 + (y - this.originY) ** 2);
    },
  },
};
</script>
<style lang="scss" scoped>

.dash-card {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  cursor: pointer;
  display: block;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  margin-bottom: 8px;
  z-index: 0;
  user-select: none;
  padding: 6px 8px 2px;
  border-radius: 4px;

  .title {
    margin: 0 0 4px;
    overflow: hidden;
    text-decoration: none;
    word-wrap: break-word;
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

</style>
