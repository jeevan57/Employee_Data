
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortField,
  setSortOrder,
  setFilters,
  fetchUsers,
} from "./usersSlice";

const SortAndFilter = () => {
  const dispatch = useDispatch();
  const { sortField, sortOrder, filters } = useSelector((state) => state.users);

  const handleSortChange = (field) => {
    const order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSortField(field));
    dispatch(setSortOrder(order));
    dispatch(fetchUsers());
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
    dispatch(fetchUsers());
  };

  return (
    <div className="sort-filter">
      <div className="sort">
        <button onClick={() => handleSortChange("id")}>Sort by ID</button>
        <button onClick={() => handleSortChange("name")}>Sort by Name</button>
        <button onClick={() => handleSortChange("age")}>Sort by Age</button>
      </div>
      <div className="filter">
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="country"
          value={filters.country}
          placeholder="Filter by Country"
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default SortAndFilter;