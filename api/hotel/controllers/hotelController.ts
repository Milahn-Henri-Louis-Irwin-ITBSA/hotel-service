import {
  BodyParam,
  HeaderParam,
  JsonController,
  Post,
} from 'routing-controllers';
import { Service } from 'typedi';
import { URL_INFO } from '../hotelApiInfo';
import HotelApi from '../service/HotelApiSvc';

@JsonController(URL_INFO.contextPath + '/hotel')
@Service()
export class HotelController {
  @Post('/nearby')
  public async getNearbyHotels(
    @HeaderParam('Authorization') authorization: string,
    @BodyParam('coordinates') coordinates: any,
    @BodyParam('radius') radius: number
  ) {
    try {
      if (!authorization) {
        return Promise.resolve({
          status: 401,
          message: 'Unauthorized',
        });
      }

      if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      if (typeof radius !== 'number') {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      if (
        typeof coordinates.latitude !== 'number' ||
        typeof coordinates.longitude !== 'number'
      ) {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      if (!radius) {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      const hotel = new HotelApi();
      const data = await hotel.getHotelsNearby(
        coordinates.latitude,
        coordinates.longitude,
        radius
      );

      return Promise.resolve({
        status: 200,
        hotels: data,
      });
    } catch (error) {
      return Promise.resolve({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
