import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../Auth/Firebase";

const leaderboardCollectionRef = collection(db, "Leaderboard");
export const addUserToLeaderBoard = async (username, marks, category) => {
  return await addDoc(leaderboardCollectionRef, {
    username: username,
    marks: marks,
    date: new Date(),
    category: category,
  });
};
export const getUsers = async () => {
  return await getDocs(leaderboardCollectionRef);
};
