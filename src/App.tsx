import { useEffect, useState} from 'react';
import { MdMyLocation } from "react-icons/md";

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { fetchWeatherCity, fetchWeatherLatLon, getWeatherSelector } from './redux/slices/weather';

import {Button} from './components/ui/button';
import { Input } from './components/ui/input';
import WeatherDetail from './components/ui/WeatherDetail';
import { getBrowserGeoPosition } from './utils';

function App() {
  const weather = useAppSelector(getWeatherSelector);
  const dispatch = useAppDispatch()
  const [value,setValue] = useState<string>("");
  const [current,setCurrent] = useState<boolean>(false);

  useEffect(()=>{
    const weatherData = weather.data;
    if(weatherData != null && current){
      setValue(weather.data?.name);
    }
  },[current,weather])

  const handleSearch = () =>{
    setCurrent(false);
    dispatch(fetchWeatherCity(value));
  }

  const handleCurrentLocation = async (): Promise<void> => {
    setCurrent(true);
    try {
      const { latitude, longitude } = await getBrowserGeoPosition();
        dispatch(fetchWeatherLatLon({lat : latitude,lon :longitude}));
    } catch(e) {
        console.log("unable to fetch");
    }
  }

  return (
      <div className="bg-cover bg-[url('./assets/weather.png')]">
      <div className="flex w-[100vw] h-[100vh] items-center justify-center text-2xl">
        <div className="w-[40vw]">
          <div className="flex gap-[20px] mt-[10px] text-2xl">
            <Input 
              className="text-2xl"
              value={value}
              onChange={(e) =>{setValue(e.target.value)}}
              onKeyDown={(e) => {e.key =="Enter" ? handleSearch() : null}}
              placeholder="Enter City">
            </Input>
            {/* <Button className="text-2xl" onClick={handleSearch} disabled={value.trim() === ""}>Search</Button> */}
            <Button
              className="text-2xl"
              onClick={handleCurrentLocation}>
              <MdMyLocation />
            </Button>
          </div>
          <div className='mt-[5px]'>
            <WeatherDetail></WeatherDetail>
          </div>
        </div>
      </div>
      </div>
  )
}

export default App
