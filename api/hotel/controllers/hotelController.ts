import {
  JsonController,
  Get,
} from 'routing-controllers';
import { URL_INFO } from '../hotelApiInfo';
import { Service } from 'typedi';
import HotelSvc from '../service/HotelSvc';

@JsonController(URL_INFO.contextPath + '/hotel')
@Service()
export class HotelController {
  constructor(public _hotelSvc: HotelSvc) {}
  @Get('/getHotelInfo')
  public async getHotelInfo(): Promise<any> {
    try {
      console.log("Inside hotel svc controller")
      const resp = await this._hotelSvc.getHotelInfo();
      console.log("Result");

      return Promise.resolve({
        status: 200,
        message: 'Hotel service fetched data successfully',
        data: resp,
      });
    } catch (error) {
      return Promise.reject({
        status: 500,
        message: error,
      });
    }
  }
}
