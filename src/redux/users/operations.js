import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "@/axiosConfig/tweetsCarsApi"
import { fetchFollowersThunk } from "../followers/operations"

export const fetchUsersThunk = createAsyncThunk(
  "users/get",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("users")
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
