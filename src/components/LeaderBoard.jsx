import { useEffect, useState } from "react";
import { getUsers } from "./api/FirebaseApi";
import useCategories from "./api/useCategories";
import LeaderboardTable from "./LeaderboardTable";
import Pagination from "./Pagination";
const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [loading, categories] = useCategories();
  const [dataLoading, setDataLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalUsers = Math.ceil(filteredUsers.length / postsPerPage);
  const currentUsers = filteredUsers.slice(indexOfFirstPost, indexOfLastPost);
  function previousHandler() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function nextHandler() {
    if (currentPage < totalUsers) setCurrentPage(currentPage + 1);
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
        <LeaderboardTable users={currentUsers} loading={dataLoading} />
        <Pagination
          nextHandler={nextHandler}
          previousHandler={previousHandler}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default LeaderBoard;
