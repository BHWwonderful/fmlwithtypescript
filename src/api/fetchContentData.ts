import { query, collection, getDocs } from "firebase/firestore/lite";
import db from "@/firebaseConfig";

const fetchContentDataFromFireBase = async () => {
    const q = query(collection(db, 'content'));
    const querySnapshot = await getDocs(q);
    const dataFromFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return dataFromFirebase;
}

export default fetchContentDataFromFireBase;