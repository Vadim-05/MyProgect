<template>
  <div v-if="isVisible" class="modal">
    <div class="modal__content">
      <slot></slot>
      <button class="modal__close-btn" @click="$emit('close')">X</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__content{
    background: white;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 630px;
    width: 100%;
  }
  &__close-btn{
    position: absolute;
    top: -13px;
    right: -9px;
    background: white;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    width: 32px;
    box-shadow: 3px 11px 15px rgba(0, 0, 0, 0.3);
    height: 32px;
    font-size: 12px;
    color: sienna;
  }
}
</style>
