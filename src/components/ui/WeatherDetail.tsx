import React from "react";

import { useAppSelector } from "@/redux/hooks";
import { getWeatherSelector } from "@/redux/slices/weather";
import { getRoundOffTemp } from "@/utils";

const WeatherDetail : React.FC = () =>{
    const weatherData = useAppSelector(getWeatherSelector);

    const getDetails = () =>{
        return(
            <>
            <div className="font-extrabold">Temprature         : { getRoundOffTemp(weatherData.data?.main.temp) }</div>
            <div className="font-extrabold">Temprature Maximum : { getRoundOffTemp(weatherData.data?.main.temp_max) }</div>
            <div className="font-extrabold">Temprature Minimum : { getRoundOffTemp(weatherData.data?.main.temp_min) }</div>
            <div className="font-extrabold">Weather            : { (weatherData.data?.weather[0].main)}</div>
            </>
        )
    }
    return(
        <div  className="flex items-center gap-[5px]">
            {weatherData.isLoading ? <div>Loading ......</div> : weatherData.data != null ? <div> {getDetails()}</div> : null}
      </div>
    )
}

export default WeatherDetail;