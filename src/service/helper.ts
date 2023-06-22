import axios from "axios";

export const REQ_PORT = async (url: string, data: any, config = {}) => {
  const res = await axios.post(url, data, { ...config });
  return res.data;
};
