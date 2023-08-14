import { Module } from "vuex";
import { RootState } from "../index";
import fetchContentDataFromFireBase from "@/api/fetchContentData";
import fetchAwaitDataFromFirebase from "@/api/fetchAwaitData";

export interface ContentState {
    totalContent: ContentItem[];
    awaitContent: AwaitItem[];
}

export interface ContentItem {
    id: string;
    content: string;
    title: string;
    username: string;
    gender: string;
    date: any;
    email: string;
}

export interface AwaitItem {
    id: string;
    title: string;
    content: string;
    date: any;
    email: string;
    gender: string;
    username: string;
}

const contentModule: Module<ContentState, RootState> = {
    state: {
        totalContent: [] as ContentItem[],
        awaitContent: [] as AwaitItem[],
    },
    mutations: {
        setContent(state, newData: ContentItem[]) {
            state.totalContent = newData;
        },
        setAwaitContent(state, newData: AwaitItem[]){
            state.awaitContent = newData;
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
        },
        async fetchAwaitData({ commit }) {
            try {
                const fetchedAwaitData = await fetchAwaitDataFromFirebase();
                commit('setAwaitContent', fetchedAwaitData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } 
    },
    getters: {
        getTotalContent: (state) => state.totalContent,
        getAwaitContent: (state) => state.awaitContent,
    }
}

export default contentModule;