import axios from "axios";

const axiosGlobal = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategories = () => axiosGlobal.get("/categories?populate=*");

export default {
  getCategories,
};
