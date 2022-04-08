const LeaderboardTable = ({ users, loading }) => {
  if (loading) return <h1>Loading Users...</h1>;
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
  return (
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
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.category}</td>
            <td>{user.marks}</td>
            <td>{parseDate(user.date.toDate())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
