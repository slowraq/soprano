import {ForecastResponse} from "@/entities/City/ui/CityDetails/model/types/forecast";

const times =[6,12,18]
const today =  new Date();
today.setDate(today.getDate() + 1);
const tomorrow=today.toISOString().slice(0,10);
today.setDate(today.getDate() + 1);
const dayAfterTomorrow=today.toISOString().slice(0,10);

export const getForecastsTimes = (forecast: ForecastResponse) => forecast.list
    .filter((item: any) => {
        const hours = new Date(item.dt_txt).getHours();
        return (item.dt_txt.startsWith(tomorrow) && times.includes(hours)) || (item.dt_txt.startsWith(dayAfterTomorrow) && hours===0)
    });
