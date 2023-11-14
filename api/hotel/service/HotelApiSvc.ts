import axios from 'axios';

export default class HotelApi {
  public async getHotelsNearby(
    latitude: number,
    longitude: number,
    pradius: number
  ): Promise<any> {
    try {
      const response = await axios.post(
        process.env.HOTEL_API_URL,
        {
          includedTypes: ['hotel'],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude,
                longitude,
              },
              radius: pradius || 500,
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.HOTEL_API_KEY,
            'X-Goog-FieldMask':
              'places.location,places.formattedAddress,places.types',
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle error appropriately
      console.error('Error in API request:', error);
      throw error;
    }
  }
}
