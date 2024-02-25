import { asyncThunkCreator, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "@/axiosConfig/tweetsCarsApi"

export const fetchFollowersThunk = createAsyncThunk(
  "followers/get",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("followers")
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const addFollowerThunk = createAsyncThunk(
  "followers/add",
  async (follower, thunkAPI) => {
    try {
      const { data } = await api.post("followers", follower)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteFollowerThunk = createAsyncThunk(
  "followers/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`followers/${id}`)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
