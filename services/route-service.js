import axios from 'axios';

const BASE_URL = 'https://api.openrouteservice.org/v2/directions/';
const API_KEY = '5b3ce3597851110001cf62481c5c9a5db2f54933b89983dd9425183a';
class RouteService {
  async getRoute(location, routeTo) {
    const response = axios.get(
      BASE_URL +
        'driving-car?api_key=' +
        API_KEY +
        '&start=' +
        location.long +
        ',' +
        location.lat +
        '&end=' +
        routeTo.lng +
        ',' +
        routeTo.lat,
    );
    return response;
  }
}

export default new RouteService();
