import { Module } from "vuex";
import { RootState } from "..";

export interface DarkModeState{
  isDarkMode: boolean,
}

const darkModeModule:Module <DarkModeState, RootState> = {
  state:{
    isDarkMode: false,
  },
  mutations:{
    toggleIsDarkMode(state){
      state.isDarkMode = !state.isDarkMode
    }
  },
  getters:{
    getIsDarkMode: (state) => state.isDarkMode,
  }
}

export default darkModeModule