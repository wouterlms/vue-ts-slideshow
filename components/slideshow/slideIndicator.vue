<template>
  <div class="slides__indicator">
    <div
      v-for="(slide, i) of slides"
      :key="slide.title"
      :style="`--accent: ${slide.primaryColor};`"
      :class="{ selected: selectedSlideIndex === i }"
      @click="goToslide(i)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Slide } from '~/types/slide'

@Component
export default class extends Vue {
  @Prop() private readonly slides!: Slide[]
  @Prop() private readonly selectedSlideIndex!: number

  goToslide(index: number): void {
    this.$emit('goToslide', index)
  }
}
</script>

<style scoped lang="scss">
.slides__indicator {
  @include flex;

  margin: 4rem 0 2rem 0;

  div {
    position: relative;

    width: 20px;
    height: 5px;

    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);

    margin: 0 0.2rem;

    overflow: hidden;
    cursor: pointer;

    transition: 0.3s;

    &::before {
      @include pseudo;

      width: 100%;
      height: 100%;

      background: var(--accent);
      transition: 0.3s;
    }

    &:not(.selected)::before {
      opacity: 0;
    }

    &.selected {
      width: 30px;
    }
  }
}
</style>
