import { query, collection, getDocs, orderBy, limit } from "firebase/firestore";
import db from "@/firebaseConfig";

const fetchAwaitDataFromFirebase = async () => {
  const q = query(collection(db, 'await'), orderBy("date", "desc"), limit(1));
  const querySnapshot = await getDocs(q);
  const dataFromFirebase = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
}));
return dataFromFirebase;
}

export default fetchAwaitDataFromFirebase;