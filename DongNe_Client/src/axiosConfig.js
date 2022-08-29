import axios from 'axios';

const client = axios.create({
  baseURL: 'http://3.38.55.57:3000/', // server url
});

export default client;

export const API = "http://3.38.55.57:3000";