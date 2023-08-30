import axios from 'axios';

const BASE_URL = 'https://www.nosyapi.com/apiv2/';
const API_KEY = '7TclqyihCLTNbA47McnGPn80FY4d8Zq8cxzPIGFHVAqXazX2G2OsuCl4bAZj';
class ElectricStationService {
  async getStations(city = 'istanbul') {
    const response = axios.get(BASE_URL + 'getTurkey?id=29127&city=' + city, {
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}

export default new ElectricStationService();
