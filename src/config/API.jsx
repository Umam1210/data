import axios from "axios";

export const API = axios.create({
  // baseURL: process.env.REACT_APP_BASEURL,
  baseURL: "https://datapenduduk.herokuapp.com/api/v1",
});
