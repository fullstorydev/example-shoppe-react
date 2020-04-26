import { default as axios } from 'axios';
import * as FullStory from '@fullstory/browser';
import { BillingInfo } from '../types/checkout';
import { Product } from '../types/product';

axios.interceptors.request.use(function (config) {
  config.headers['X-FullStory-URL'] = FullStory.getCurrentSessionURL(true);
  return config;
}, function (error) {
  return Promise.reject(error);
});

export const makePurchase = async (billingInfo: BillingInfo, puchasedProducts: Product[]) => {
  const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/checkout`);
  console.log(response.data);
  return response.data;
};
