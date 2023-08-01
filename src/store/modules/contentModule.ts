import { Module } from "vuex";
import { RootState } from "../index";
import fetchContentDataFromFireBase from "@/api/fetchContentData";

export interface ContentState {
    totalContent: ContentItem[];
}

export interface ContentItem {
    id: string;
    content: string;
    agree: number;
    disagree: number;
    title: string;
    username: string;
    gender: string;
}

const contentModule: Module<ContentState, RootState> = {
    state: {
        totalContent: [] as ContentItem[],
    },
    mutations: {
        setContent(state, newData: ContentItem[]) {
            state.totalContent = newData;
        }
    },
    actions: {
        async fetchData({ commit }) {
            try {
                const fetchedData = await fetchContentDataFromFireBase();
                commit('setContent', fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } 
    },
    getters: {
        getTotalContent: (state) => state.totalContent,
    }
}

export default contentModule;