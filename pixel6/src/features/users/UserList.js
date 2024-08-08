
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setPage } from "./usersSlice";
import PaginationLoader from "../../components/PaginationLoader";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error, page, hasMore } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, page]);

  const handleNext = () => {
    if (hasMore && status !== "loading") {
      dispatch(setPage(page + 1));
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Full Name</th>
            <th>Demography</th>
            <th>Designation</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{`${user.gender}/${user.age}`}</td>
              <td>{user.company?.title || "N/A"}</td>
              <td>
                {user.address.city}, {user.address.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {status === "loading" && <PaginationLoader />}
      {error && <div>{error}</div>}
      <div>
        {page > 1 && <button onClick={handlePrevious}>Previous</button>}
        {hasMore && status !== "loading" && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  );
};

export default UserList;
