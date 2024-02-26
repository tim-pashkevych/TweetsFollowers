import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { fetchUsersThunk } from "./operations"

const initialState = {
  data: [],
  page: 1,
  itemsPerPage: 3,
  filter: "all",
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetPage: state => {
      state.page = 1
      state.filter = "all"
    },
    nextPage: state => {
      state.page = ++state.page
    },
    setFilter: (state, { payload }) => {
      state.filter = payload
      state.page = 1
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {
        state.data = payload
      })
      .addCase(fetchUsersThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchUsersThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addMatcher(
        isAnyOf(fetchUsersThunk.fulfilled, fetchUsersThunk.rejected),
        state => {
          state.isLoading = false
        },
      )
  },
})

export const usersReducer = slice.reducer
export const { nextPage, resetPage, setFilter } = slice.actions
