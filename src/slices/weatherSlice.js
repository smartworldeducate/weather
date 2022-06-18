import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Action

export const fetchweatherAction=createAsyncThunk(
  "weather/fetch",
  async (payload,{rejectWithValue,getState,dispatch})=>{
    try{

      const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&lat=35&lon=139&appid=e25c272adea3a1d8cc4a75ee92d115dc`)
         return response.data
      }
      
      

    catch(error){
      if(!error.response){
        throw error
      }
      return rejectWithValue(error?.response?.data)

    }
  }
)
//rducer
const weatherSlice=createSlice({
  name:"weather",
  initialState:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchweatherAction.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(fetchweatherAction.fulfilled,(state,action)=>{
      state.weather=action?.payload;
      state.loading=false;
      state.error=undefined
    })
    builder.addCase(fetchweatherAction.rejected,(state,action)=>{
      state.loading=false;
      state.weather=undefined
      state.error=action?.payload;
      
    })
  }
})

export default weatherSlice.reducer




