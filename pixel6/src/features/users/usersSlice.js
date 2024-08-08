// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
  page: 1,
  limit: 10,
  hasMore: true,
  sortField: 'id',
  sortOrder: 'asc',
  filters: {
    gender: '',
    country: '',
  },
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState }) => {
    const { page, limit, sortField, sortOrder, filters } = getState().users;
    const params = {
      limit,
      skip: (page - 1) * limit,
      sort: `${sortField}:${sortOrder}`,
      ...filters,
    };
    const response = await axios.get('https://dummyjson.com/users', { params });
    // Ensure each user has necessary properties
    const users = response.data.users.map(user => ({
      ...user,
      job: user.job || { title: 'N/A' },
      address: user.address || { country: 'N/A' },
    }));
    return users;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSortField(state, action) {
      state.sortField = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSortField, setSortOrder, setFilters } = usersSlice.actions;

export default usersSlice.reducer;
