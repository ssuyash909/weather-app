import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import type { Weather } from '@/types/weather';
import weatherService from '@/service/weather';
import { RootState } from '../store';

export interface WeatherState {
    data ?: Weather | null,
    isLoading : boolean,
    isError : boolean,
  }
  
  const initialState: WeatherState = {
    data :  null,
    isLoading : false,
    isError : false,
  }

  export const fetchWeatherLatLon = createAsyncThunk(
    'weatherLatLon/fetch',
    async (data : {lat: number, lon: number})  => {
        const lat : number = data.lat;
        const lon : number = data.lon;
        const weather = await weatherService.getWeatherByLatLon(lat,lon);
      return weather;
    },
  )

  export const fetchWeatherCity = createAsyncThunk(
    'weatherCity/fetch',
    async (city: string)  => {
        const weather = await weatherService.getWeatherByCity(city.toLowerCase());
      return weather;
    },
  )

export const weatherSlice = createSlice({
  name: 'weather-data',
  initialState,
  reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchWeatherLatLon.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchWeatherLatLon.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(fetchWeatherLatLon.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload!;
        });
        builder.addCase(fetchWeatherCity.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchWeatherCity.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(fetchWeatherCity.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload!;
        })
    }
})

export const getWeatherSelector = createSelector(
    (state : RootState) => state,
    (state) => state.weather
);

export default weatherSlice.reducer