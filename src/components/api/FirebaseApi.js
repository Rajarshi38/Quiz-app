import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../Auth/Firebase";

const leaderboardCollectionRef = collection(
  db,
  process.env.REACT_APP_FIREBASE_COLLECTION
);
export const addUserToLeaderBoard = async (username, marks, category) => {
  return await addDoc(leaderboardCollectionRef, {
    username: username,
    marks: marks,
    date: new Date(),
    category: category,
  });
};
export const getUsers = async () => {
  return await getDocs(
    query(leaderboardCollectionRef, orderBy("date", "desc"))
  );
};
