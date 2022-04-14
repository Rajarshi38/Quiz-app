import { useState, useCallback } from "react";
import useCategories from "./api/useCategories";

import LeaderboardTable from "./LeaderboardTable";
import Pagination from "./Pagination";
import useLeaderboard from "./Hooks/useLeaderboard";
const LeaderBoard = () => {
  const [loading, categories] = useCategories();
  const { filteredUsers, dataLoading, setCategory } = useLeaderboard();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalUsers = Math.ceil(filteredUsers.length / postsPerPage);
  const currentUsers = filteredUsers.slice(indexOfFirstPost, indexOfLastPost);
  const previousHandler = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage, setCurrentPage]);

  const nextHandler = useCallback(() => {
    if (currentPage < totalUsers) setCurrentPage(currentPage + 1);
  }, [currentPage, totalUsers, setCurrentPage]);
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
