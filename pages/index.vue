<template>
  <div>
    <v-slides />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import slidesVue from '~/components/slideshow/slides.vue'

@Component({
  components: {
    'v-slides': slidesVue,
  },
})
export default class extends Vue {}
</script>

<style scoped lang="scss"></style>
