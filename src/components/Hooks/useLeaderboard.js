import { useEffect, useState } from "react";
import { getUsers } from "../api/FirebaseApi";

const useLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [dataLoading, setDataLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    const getUsersFromDB = async () => {
      setDataLoading(true);
      const data = await getUsers();
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setDataLoading(false);
    };
    getUsersFromDB();
  }, []);

  useEffect(() => {
    if (category === "ALL") setFilteredUsers([...users]);
    else
      setFilteredUsers([...users.filter((user) => user.category === category)]);
  }, [users, category]);

  return { filteredUsers, dataLoading, setCategory };
};

export default useLeaderboard;
