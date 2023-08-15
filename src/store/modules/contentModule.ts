import { Module } from "vuex";
import { RootState } from "../index";
import db from "@/firebaseConfig";
import { getDocs, query, collection, where } from "firebase/firestore";
import fetchContentDataFromFireBase from "@/api/fetchContentData";
import fetchAwaitDataFromFirebase from "@/api/fetchAwaitData";
import fetchContentDataByTimeFromFirebase from "@/api/fetchContentDataByTimeFilter";

export interface ContentState {
    totalContent: ContentItem[];
    awaitContent: AwaitItem[];
    agreeContent: AgreeItem[];
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

export interface AgreeItem {
    id: string;
    contentID: string;
    content: string;
    date: any;
    gender: string;
    title: string;
    userID: string;
    username: string;
}

const contentModule: Module<ContentState, RootState> = {
    state: {
        totalContent: [] as ContentItem[],
        awaitContent: [] as AwaitItem[],
        agreeContent: [] as AgreeItem[],
    },
    mutations: {
        setContent(state, newData: ContentItem[]) {
            state.totalContent = newData;
        },
        setAwaitContent(state, newData: AwaitItem[]){
            state.awaitContent = newData;
        },
        setAgreeContent(state, newData: AgreeItem[]){
            state.agreeContent = newData
        },
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
        },
        async fetchAgreeData({ commit }) {
            try{
                const fetchedData = await fetchContentDataFromFireBase();
                const agreeQueries = fetchedData.map((doc) => {
                    const q = query(collection(db, 'agree'), where("contentID", "==", doc.id));
                    return getDocs(q);
                })
                const queryResults = await Promise.all(agreeQueries);
                
                const filteredQueryResults = queryResults.sort((a, b) => b.size - a.size);
                const extractedDataArray = filteredQueryResults.flatMap((querySnapshot) => {
                    return querySnapshot.docs[0].data();
                })
                commit('setAgreeContent', extractedDataArray);
                
            } catch(error){
                console.error("Error fetching data:", error);
            }
        },
        async fetchAgreeDataByTime({ commit }, payload) {
            try{
                const fetchedData = await fetchContentDataByTimeFromFirebase(payload.startOfTime, payload.endOfTime);
                const agreeQueries = fetchedData.map((doc: any) => {
                    const q = query(collection(db, 'agree'), where("contentID", "==", doc.id));
                    return getDocs(q);
                })
                const queryResults = await Promise.all(agreeQueries);
                const filteredQueryResults = queryResults.sort((a, b) => b.size - a.size);
                const extractedDataArray = filteredQueryResults.flatMap((querySnapshot) => {
                    return querySnapshot.docs[0].data();
                })
                commit('setAgreeContent', extractedDataArray);
            } catch(error){
                console.log("Error fetching data by time:", error);
            }
        },
    },
    getters: {
        getTotalContent: (state) => state.totalContent,
        getAwaitContent: (state) => state.awaitContent,
        getAgreeContent: (state) => state.agreeContent,
    }
}

export default contentModule;