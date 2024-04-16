import axios, {Axios} from "axios";

import type { Weather } from "@/types/weather";

export class WeatherService{
    private apiInstance : Axios;

    constructor(){
        this.apiInstance = axios.create({
            baseURL : "https://api.openweathermap.org/data/2.5/weather",
            responseType : "json"
        })
    }

    public async getWeatherByLatLon(lat: number,lon : number) : Promise<Weather>{
        //const appId = "4a2582f5f26499d5991b4514a4f7ba90";
        const {data} = await this.apiInstance.get<Weather>(`?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APPI_KEY}`);
        return data;
    }

    public async getWeatherByCity(city : string) : Promise<Weather>{
        //const appId = "4a2582f5f26499d5991b4514a4f7ba90";
        const {data} = await this.apiInstance.get<Weather>(`?q=${city}&appid=${process.env.REACT_APP_APPI_KEY}`);
        return data;
    }
}

export default new WeatherService();