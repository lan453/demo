import axios  from "axios";
import { ElMessage } from 'element-plus'
export function request(config){
  const instance = axios.create({
      baseURL:'http://localhost:8088/mgt',
      timeout: 5000, 
  });
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    if(response.success == false){
      ElMessage.error('发生错误!'+response.data.message);
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    ElMessage.error('发生错误!'+error);
    return Promise.reject(error);
  })
  return instance;
}





