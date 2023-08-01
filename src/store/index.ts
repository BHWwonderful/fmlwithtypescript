import { createStore, Store } from "vuex";
import contentModule, { ContentState } from "./modules/contentModule";

// 루트 상태 타입 정의
export interface RootState {
  content: ContentState;
}

const store: Store<RootState> = createStore<RootState>({
  modules: {
    content: contentModule,
  }
})

export default store;
