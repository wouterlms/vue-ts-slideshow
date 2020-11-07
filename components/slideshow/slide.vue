<template>
  <li
    class="slides__slides__slide"
    ref="slideEl"
    :class="{ 'slides__slides__slide--selected': isSelected }"
  >
    <div class="slides__slides__slide__content">
      <div class="slides__slides__slide__content__image">
        <img :src="slide.img" :alt="slide.title" :style="imageTransform" />
      </div>

      <div class="slides__slides__slide__content__text" :style="textContent">
        <h2>{{ slide.title }}</h2>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import lerpMixinVue from '~/mixins/lerp.mixin.vue'
import { Slide } from '~/types/slide'

@Component
export default class extends mixins(lerpMixinVue) {
  @Prop({ required: true }) private readonly slide!: Slide
  @Prop({ required: true }) private readonly slideIndex!: number
  @Prop({ required: true }) private readonly translateDx!: number
  @Prop({ required: true }) private readonly selectedSlideIndex!: number

  slideEl: HTMLLIElement | undefined
  distanceToCenter: number = 0
  opacity: number = 1

  mounted(): void {
    this.slideEl = this.$refs.slideEl as HTMLLIElement
    this.setDistanceToCenter(0)
    this.setOpacity(this.distanceToCenter)
  }

  /**
   * Set distance to center according to the slides dx
   * @param {number} dx
   */
  setDistanceToCenter(dx: number): void {
    this.distanceToCenter = dx + this.slideEl!.offsetLeft
  }

  /**
   * Set opacity according to the distance to the center
   * @param {number} distanceToCenter
   */
  setOpacity(distanceToCenter: number): void {
    this.opacity = Math.abs(this.distanceToCenter / 400) * -1 + 1
  }

  @Watch('translateDx')
  onTranslateDxChange(dx: number): void {
    this.setDistanceToCenter(dx)
    this.setOpacity(this.distanceToCenter)
  }

  /**
   * Returns if this slide is the most centered slide
   */
  get isSelected(): boolean {
    return this.slideIndex === this.selectedSlideIndex
  }

  /**
   * Return image transform value based on distance to center
   * @return {object} transform
   */
  get imageTransform(): object {
    return {
      transform: `translate3d(${
        this.distanceToCenter / 20
      }px, 0, 0) scale(1.2)`,
    }
  }

  /**
   * Return text content transform value based on distance to center,
   * accent color
   * and opacity
   * @return {object} transform
   */
  get textContent(): object {
    return {
      transform: `translate3d(${this.distanceToCenter / 10}px, 0, 0)`,
      opacity: this.opacity,
      '--primary-color': this.slide.primaryColor,
      '--secondary-color': this.slide.secondaryColor,
    }
  }
}
</script>

<style scoped lang="scss">
.slides__slides__slide {
  position: relative;
  width: 100%;
  height: 100%;

  flex: 0 0 auto;
  padding: 1rem;

  &__content {
    position: relative;
    width: 100%;
    height: 100%;

    &__image {
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        display: block;
        padding-top: 62%;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
      }
    }

    &__text {
      @include flex(flex-start, flex-start, column);

      padding-top: 10vw;

      h2 {
        @include font-style(3rem, var(--primary-color), 800, 1.1, true);
      }
    }
  }
}
</style>
