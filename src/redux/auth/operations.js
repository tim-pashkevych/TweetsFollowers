import { api } from "@/axiosConfig/tweetsCarsApi"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const refreshUserThunk = createAsyncThunk(
  "refresh",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId

    if (!userId) {
      return thunkAPI.rejectWithValue("UserId doesn't exist")
    }

    try {
      const { data } = await api.get(`users/${userId}`)
      return data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  },
)
