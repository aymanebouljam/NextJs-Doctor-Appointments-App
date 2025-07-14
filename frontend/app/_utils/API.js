import axios from "axios";

const axiosGlobal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const getCategories = () => axiosGlobal.get("/categories?populate=*");

const getDoctors = () => axiosGlobal.get("/doctors?populate=*");
const getDoctorsByCategory = (category) =>
  axiosGlobal.get(
    `/doctors/?populate=*&filters[category][name][$containsi]=${category}`
  );

export default {
  getCategories,
  getDoctors,
  getDoctorsByCategory,
};
