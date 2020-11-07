import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import SlidesModule from './slides'

export function getProjectsModule(store: Store<any>): SlidesModule {
  return getModule(SlidesModule, store)
}
