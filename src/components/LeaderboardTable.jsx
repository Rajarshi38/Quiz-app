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
            <td data-label="Username">{user.username}</td>
            <td data-label="Category">{user.category}</td>
            <td data-label="Marks">{user.marks}</td>
            <td data-label="Date">{parseDate(user.date.toDate())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
