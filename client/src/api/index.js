import axios from 'axios';

export const fetch = (url, config) => axios.get(url, config);

export const add = (url, data, config) => axios.post(url, data, config);

export const remove = (url, config) => axios.delete(url, config);

export const edit = (url, data, config) => axios.put(url, data, config);