import * as axios from 'axios';
import * as log from 'cf-nodejs-logging-support';

axios.default.interceptors.response.use(
  (response) => {
    // do something with the response data
    log.info('Response was received: ' + response.config.url);

    return response;
  },
  (error) => {
    // handle the response error
    log.info(error.response);
    return error.response; //Promise.reject(error);
  },
);

axios.default.interceptors.request.use(
  (config) => {
    // perform a task before the request is sent
    log.info('Request was sent: ' + config.url);

    return config;
  },
  (error) => {
    // handle the error
    log.info(error);
    return Promise.reject(error);
  },
);

export default axios.default;
