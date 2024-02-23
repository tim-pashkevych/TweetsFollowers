import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "@/axiosConfig/tweetsCarsApi"

export const fetchUsersThunk = createAsyncThunk(
  "users/get",
  async (_, thunkAPI) => {
    try {
      const { data } = api.get("users")
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
