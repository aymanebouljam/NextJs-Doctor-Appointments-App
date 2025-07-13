import axios from "axios";

const axiosGlobal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const getCategories = () => axiosGlobal.get("/categories?populate=*");

export default {
  getCategories,
};
