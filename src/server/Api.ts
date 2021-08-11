import axios, {AxiosResponse} from 'axios';
import {Locations} from "../types/Locations";

export async function getProductLocations(): Promise<Locations> {
   const response: AxiosResponse<Locations> = await axios.get(
       'https://api.weather.gov/products/locations',
       {
           headers:
               {
                   'accept': 'application/ld+json',
                   'User-Agent': 'sorensenapaul@gmail.com'
               }
       });
   console.log('Axios response:', response);
   return response.data;
}