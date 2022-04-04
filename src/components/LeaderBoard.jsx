import { useEffect, useState } from "react";
import { getUsers } from "./api/FirebaseApi";
import useCategories from "./api/useCategories";
const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [loading, categories] = useCategories();
  const [filteredUsers, setFilteredUsers] = useState();

  useEffect(() => {
    const getUsersFromDB = async () => {
      const data = await getUsers();
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsersFromDB();
  }, []);

  useEffect(() => {
    if (category === "ALL") setFilteredUsers([...users]);
    else
      setFilteredUsers([...users.filter((user) => user.category === category)]);
  }, [users, category]);

  function parseDate(date) {
    return date.toLocaleString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      timezone: "utc",
    });
  }

  if (loading) return <div>Loading...</div>;
  return (
    <div className="leaderboard">
      <div className="leaderboard-head">
        <h2>Leaderboard</h2>
        <select
          defaultValue={"ALL"}
          className="form-select w-50"
          aria-label="Default select example"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          {categories.map((category) => (
            <option value={category.name} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="leaderboard-main">
        <table className="content-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Category</th>
              <th>Marks</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.category}</td>
                <td>{user.marks}</td>
                <td>{parseDate(user.date.toDate())}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
