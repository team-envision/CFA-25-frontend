import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://api.aaruush.org/api/v1",
  headers: {
    Authorization: Cookies.get("accessToken") || "",
  },
});

export default instance;
