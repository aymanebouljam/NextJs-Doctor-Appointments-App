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
const getDoctorDetails = (id) => axiosGlobal.get(`/doctors/${id}?populate=*`);

const bookAppointment = (data) => axiosGlobal.post("/appointments", data);

const myBookingList = (email) =>
  axiosGlobal.get(
    `appointments?filters[email][$eq]=${email}&populate[doctor][populate]=image`
  );

const deleteAppointment = (id) => axiosGlobal.delete(`appointments/${id}`);

export default {
  getCategories,
  getDoctors,
  getDoctorsByCategory,
  getDoctorDetails,
  bookAppointment,
  myBookingList,
  deleteAppointment,
};
