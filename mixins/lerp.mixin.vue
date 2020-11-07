<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
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
}
</script>
