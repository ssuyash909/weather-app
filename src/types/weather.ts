export interface MainData{
    temp  : number,
    temp_min : number,
    temp_max : number,
    humidity : number,
    pressure : number,
    feels_like : number,
}

export interface DescriptionData{
    main : string,
    description : string,
    icon: string,
}
export interface Weather{
    main: MainData,
    name : string,
    description : DescriptionData[],
}