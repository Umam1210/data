import axios from "axios";

export const API = axios.create({
  baseURL: "https://datapenduduk.herokuapp.com/api/v1",
});
