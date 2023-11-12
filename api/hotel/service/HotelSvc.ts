import { Service } from 'typedi';
import axios from 'axios';

@Service()
export default class HotelSvc {
  constructor() {}

  public async getSuburb(lat: any, long: any) {
    try {
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your own API key
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;  

    } catch (error: any) {
      console.error('Error fetching data from Google Maps API:', error.message);
      return Promise.reject({
        status: 500,
        message: error,
      });
    }
  }

  public async getHotelInfo() {
    const suburb = 'Randburg';
    const arrivalDate = '';
    const departureDate = '';
    const guestQty = 1;

    const options = {
      method: 'GET',
      url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
      params: {
        offset: '0',
        arrival_date: '2023-11-14',
        departure_date: '2023-11-16',
        guest_qty: '1',
        dest_ids: '-3712125',
        room_qty: '1',
        search_type: 'city',
        children_qty: '2',
        children_age: '5,7',
        search_id: 'none',
        price_filter_currencycode: 'ZAR',
        order_by: 'popularity',
        languagecode: 'en-us',
        travel_purpose: 'leisure',
      },
      headers: {
        'X-RapidAPI-Key': '2260549e94mshbb6c37ef1261a5ep1c0799jsn961e554f8173',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    return response.data;
  }
}
