import { query, collection, getDocs, orderBy, where } from "firebase/firestore";
import db from "@/firebaseConfig";

const fetchContentDataByTimeFromFirebase = async (startOfTime: Date, endOfTime: Date): Promise<any> => {

  const q = query(collection(db, 'content'), where('date', '>=', startOfTime), where('date', '<=', endOfTime), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  const dataFromFirebase = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return dataFromFirebase;

}

export default fetchContentDataByTimeFromFirebase;