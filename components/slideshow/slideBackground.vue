<template>
  <div class="slides__background" :style="backgroundStyle"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Slide } from '~/types/slide'

@Component
export default class extends Vue {
  @Prop({ required: true }) private readonly translateDx!: number
  @Prop({ required: true }) private readonly slides!: Slide[]
  @Prop({ required: true }) private readonly selectedSlideIndex!: number
  @Prop({ required: true }) private readonly slideWidth!: number

  backgroundColors: string[] = this.slides.map((slide) => slide.secondaryColor)
  backgroundColor: any = null

  mounted(): void {
    this.backgroundColor = this.convertRgbToObject(
      this.backgroundColors[this.selectedSlideIndex]
    )
  }

  @Watch('translateDx')
  onTranslateDxChange(dx: number): void {
    const selectedIndex: number = Math.round(Math.abs(dx) / this.slideWidth)
    const val: number = Math.abs(dx) / this.slideWidth
    const fromIndex: number = Math.floor(val)
    const toIndex: number = Math.ceil(val)

    if (toIndex > this.slides.length - 1 || dx > 0) {
      return
    }

    const rgbFrom = this.convertRgbToObject(this.backgroundColors[fromIndex])
    const rgbTo = this.convertRgbToObject(this.backgroundColors[toIndex])

    this.backgroundColor = this.findColorBetween(
      rgbFrom,
      rgbTo,
      val - fromIndex
    )
  }

  /**
   * Convert rgb string to an object
   * @param {string} rgb
   * @return {object} rgb as an object
   */
  convertRgbToObject(rgb: string): object {
    const rgbArr = rgb
      .substring(4, rgb.length - 1)
      .replace(/ /g, '')
      .split(',')
      .map((c) => +c)

    return {
      r: rgbArr[0],
      g: rgbArr[1],
      b: rgbArr[2],
    }
  }

  /**
   * Returns lerped rgb color between 2 colors
   * @param {any} from
   * @param {any} to
   * @param {n}
   * @return {object} lerped rgb as an object
   */
  findColorBetween(from: any, to: any, n: number): object {
    return {
      r: this.lerp(from.r, to.r, n),
      g: this.lerp(from.g, to.g, n),
      b: this.lerp(from.b, to.b, n),
    }
  }

  /**
   * Returns rgb object as a string
   * @param {any} rgb - {r, g, b}
   * @return {string} rgb
   */
  rgbObjToString(rgb: any): string {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }

  /**
   * Returns lerped value
   * @param {number} a
   * @param {number} b
   * @param {number} n
   * @return {number} Lerped value
   */
  lerp(a: number, b: number, n: number): number {
    return (1 - n) * a + n * b
  }

  /**
   * Returns background color css style
   * @return {object} css background
   */
  get backgroundStyle(): object {
    return {
      background: this.backgroundColor
        ? this.rgbObjToString(this.backgroundColor)
        : 'white',
    }
  }
}
</script>

<style scoped lang="scss">
.slides__background {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: -1;
}
</style>
