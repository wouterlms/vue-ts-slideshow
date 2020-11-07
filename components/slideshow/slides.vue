<template>
  <section
    class="slides"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleMouseUp"
  >
    <slide-indicator
      :slides="slides"
      :selected-slide-index="selectedSlideIndex"
      @goToslide="handleGoToslide"
    />
    <slide-background
      :translate-dx="translateDx"
      :slides="slides"
      :selected-slide-index="selectedSlideIndex"
      :slide-width="slideWidth"
    />
    <ul class="slides__slides" :style="transformStyle" ref="slidesEl">
      <v-slide
        v-for="(slide, i) of slides"
        :key="slide.title"
        :slide="slide"
        :slide-index="i"
        :translate-dx="translateDx"
        :selected-slide-index="selectedSlideIndex"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Vue, Watch } from 'vue-property-decorator'
import lerpMixinVue from '~/mixins/lerp.mixin.vue'
import { Slide } from '~/types/slide'
import slideVue from './slide.vue'

@Component({
  components: {
    'v-slide': slideVue,
  },
})
export default class extends mixins(lerpMixinVue) {
  readonly OVERFLOW_SPEED: number = 0.1
  readonly DRAG_SPEED: number = 2.5

  slidesEl: HTMLUListElement | undefined
  slideWidth: number = 0
  isMouseDown: boolean = false
  startX: number = 0
  translateX: number = 0
  translateDx: number = 0
  selectedSlideIndex: number = 0

  requestAnimationFrame:
    | ReturnType<typeof window.requestAnimationFrame>
    | undefined

  mounted(): void {
    this.slidesEl = this.$refs.slidesEl as HTMLUListElement
    this.slideWidth = this.slidesEl.children[0].clientWidth

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('resize', this.handleResize)
    this.requestAnimationFrame = requestAnimationFrame(this.raf)
  }

  beforeDestroy(): void {
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('resize', this.handleResize)

    if (this.requestAnimationFrame) {
      window.cancelAnimationFrame(this.requestAnimationFrame)
    }
  }

  handleGoToslide(index: number): void {
    this.setIndex(index)
  }

  /**
   * on document resize
   */
  handleResize(): void {
    this.slideWidth = this.slidesEl!.children[0].clientWidth
  }

  /**
   * on mouse down
   * @param {MouseEvent} clientX
   */
  handleMouseDown({ clientX }: MouseEvent): void {
    this.setStart(clientX)
  }

  /**
   * on touch start
   * @param {TouchEvent} e
   */
  handleTouchStart(e: TouchEvent): void {
    this.setStart(e.touches[0].clientX)
  }

  /**
   * on mouse move
   * @param {MouseEvent} clientX
   */
  handleMouseMove({ clientX }: MouseEvent): void {
    if (!this.isMouseDown) {
      return
    }
    this.translateX = this.calculateTransform(-(this.startX - clientX))
  }

  /**
   * on touch move
   * @param {TouchEvent} e
   */
  handleTouchMove(e: TouchEvent): void {
    this.translateX = this.calculateTransform(
      -(this.startX - e.touches[0].clientX)
    )
  }

  /**
   * on mouse up, also linked to touch end
   */
  handleMouseUp(): void {
    this.isMouseDown = false
    this.setIndex(this.getClosestslideIndex())
  }

  /**
   * go to slide by index
   * @param {number} index
   */
  setIndex(index: number): void {
    this.translateX = -(this.slideWidth * index)
  }

  /**
   * set isMouseDown and calculate start X
   * @param {number} clientX
   */
  setStart(clientX: number): void {
    this.isMouseDown = true
    this.startX = clientX - this.getTranslateXValue() / this.DRAG_SPEED
  }

  /**
   * Returns adjusted translateX position according to drag speed & overflow speed
   * @param {number} translateX
   * @return {number} Adjusted translateX position
   */
  calculateTransform(translateX: number): number {
    if (this.hasReachedStart) {
      return translateX * this.DRAG_SPEED * this.OVERFLOW_SPEED
    } else if (this.hasReachedEnd) {
      const overflow: number = this.end - translateX * this.DRAG_SPEED
      return this.end - overflow * this.OVERFLOW_SPEED
    }
    return (this.translateX = translateX * this.DRAG_SPEED)
  }

  /**
   * Return closest slide index depending on current translateX value
   * @return {number} slide index
   */
  getClosestslideIndex(): number {
    const slideWidth: number = this.slidesEl!.scrollWidth / this.slides.length
    let closestslideIndex: number = Math.round(this.translateX / slideWidth)

    if (closestslideIndex === 1) {
      closestslideIndex = 0
    }

    if (Math.abs(closestslideIndex) > this.slides.length - 1) {
      closestslideIndex = this.slides.length - 1
    }

    return Math.abs(closestslideIndex)
  }

  /**
   * Request animation frame
   */
  raf(): void {
    this.translateDx = this.lerp(this.translateDx, this.translateX, 0.15)
    this.translateDx = Math.floor(this.translateDx * 100) / 100

    this.requestAnimationFrame = window.requestAnimationFrame(this.raf)
  }

  @Watch('translateX')
  onTranslateXChange(translateX: number): void {
    this.selectedSlideIndex = this.getClosestslideIndex()
  }

  /**
   * Returns maximum left position of slides
   * @return {number} Max left position
   */
  get start(): number {
    return 0
  }

  /**
   * Return maximum right position of slides
   * @return {number} Max right position
   */
  get end(): number {
    if (!this.slidesEl) {
      return 0
    }
    return -(-this.slidesEl.clientWidth + this.slidesEl.scrollWidth)
  }

  /**
   * Returns if slides have reached start
   * @return {boolean} 'true' if slides have reached start
   */
  get hasReachedStart(): boolean {
    return this.translateX >= 0
  }

  /**
   * Returns if slides have reached end
   * @return {boolean} 'false' if slides have reached end
   */
  get hasReachedEnd(): boolean {
    if (!this.slidesEl) return false
    return (
      this.slidesEl.scrollWidth + this.translateX - this.slidesEl.clientWidth <=
      0
    )
  }

  /**
   * Returns translateX value depending on current css matrix values
   * @return {number} translateX
   */
  getTranslateXValue(): number {
    if (!this.slidesEl) {
      return 0
    }
    const transformVal: string = getComputedStyle(
      this.slidesEl
    ).getPropertyValue('transform')

    const regArr: RegExpMatchArray | null = transformVal.match(/(-?[0-9\.]+)/g)
    return regArr ? parseFloat(regArr[4]) : 0
  }

  /**
   * Returns transform style
   * @return {object} transform
   */
  get transformStyle(): object {
    return {
      transform: `translate3d(${this.translateDx}px, 0, 0)`,
    }
  }

  /**
   * Returns slide from store
   * @return {Project[]} projects
   */
  get slides(): Slide[] {
    return this.$store.getters.slides
  }
}
</script>

<style scoped lang="scss">
.slides {
  position: relative;
  height: 100vh;
  padding: 0 5vw;

  overflow: hidden;
  user-select: none;

  &__slides {
    @include h-center;

    display: flex;
    max-width: 68vh;
    height: 100%;

    pointer-events: none;

    transition: 0.1s;
  }
}
</style>
