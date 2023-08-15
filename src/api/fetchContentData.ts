import { query, collection, getDocs, orderBy } from "firebase/firestore";
import db from "@/firebaseConfig";

const fetchContentDataFromFireBase = async () => {
    const q = query(collection(db, 'content'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const dataFromFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return dataFromFirebase;
}

export default fetchContentDataFromFireBase;