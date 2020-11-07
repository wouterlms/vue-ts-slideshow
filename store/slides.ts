import { Slide } from '~/types/slide'
import { VuexModule, Module } from 'vuex-module-decorators'

@Module({ name: 'slides', stateFactory: true, namespaced: false })
export default class SlidesModule extends VuexModule {
  _slides: Slide[] = [
    {
      title: 'First Slide',
      img:
        'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80',
      primaryColor: 'rgb(250, 255, 250)',
      secondaryColor: 'rgb(66, 190, 223)',
    },
    {
      title: 'Second Slide',
      img:
        'https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1778&q=80',
      primaryColor: 'rgb(36, 72, 84)',
      secondaryColor: 'rgb(113, 151, 186)',
    },
    {
      title: 'Third Slide',
      img:
        'https://images.unsplash.com/photo-1490358930084-2d26f21dc211?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExNjMwfQ&auto=format&fit=crop&w=1778&q=80',
      primaryColor: 'rgb(45,45,62)',
      secondaryColor: 'rgb(249, 164, 123)',
    },
    {
      title: 'Fourth Slide',
      img:
        'https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      primaryColor: 'rgb(35, 48, 80)',
      secondaryColor: 'rgb(116, 191, 214)',
    },
    {
      title: 'Fifth Slide',
      img:
        'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80',
      primaryColor: 'rgb(65, 147, 194)',
      secondaryColor: 'rgb(12, 4, 4)',
    },
  ]

  get slides(): Slide[] {
    return this._slides
  }
}
