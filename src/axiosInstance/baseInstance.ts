import axios , { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import Config from 'react-native-config'

const API_URL_TYPE = Config.API_URL_TYPE??'local';
console.log('API_URL_TYPE', API_URL_TYPE);
const initializeAxios = (): AxiosInstance => {
    var uRL = 'http://172.30.1.84:8001/';

    

    const instance = axios.create({
    baseURL: uRL,
    withCredentials: true,
    timeout: 2000,
    });

    instance.interceptors.request.use(
  async config => {
    // multipart/form-data 요청엔 직접 지정하지 않음
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (err: AxiosError) => {
    Promise.reject(err);
  },
);

    instance.interceptors.response.use(
    
    async (response : AxiosResponse) => {
        const { config } = response;
        const originalRequest = config;
        console.log('Axios Api originalRequest ==>  ', originalRequest);
        console.log('Axios Api response ==>  ', response);
         if (response.status === 500) { // 403: Forbidden
            console.log('response status 500');
        } else if (response.status === 200) { // 200: OK
            console.log('response status 200');
        } else {
            console.log('response status else');
        }
        
        return response.data;
    },
    (err: AxiosError) => {
        console.log('response error', err);
        Promise.reject(err);
    },
    );

    return instance;
}


export default {initializeAxios};

