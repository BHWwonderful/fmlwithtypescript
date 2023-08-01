// vuex.d.ts
import { Store } from 'vuex';
import { ContentState } from './store/modules/contentModule';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    content: ContentState;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}