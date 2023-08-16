import { createStore, Store } from "vuex";
import contentModule, { ContentState } from "./modules/contentModule";
import darkModeModule from "./modules/darkModeModule";

// 루트 상태 타입 정의
export interface RootState {
  content: ContentState;
}

const store: Store<RootState> = createStore({
  modules: {
    content: contentModule,
    darkMode: darkModeModule,
  }
})

export default store;
