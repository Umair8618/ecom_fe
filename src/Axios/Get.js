import axios from "axios";
import { BASE_URL } from "../Constants/Constants";

export const Get = (
  endPoint,
  encrypted,
  token
  // dispatch,
  // setToken,
) => {
  let headers;

  if (endPoint.includes("undefined")) {
    return;
  }

  if (encrypted) {
    headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
  } else {
    headers = {
    //   withCredentials: true,
      Accept: "application/json",
      // 'Content-Type': "application/x-www-form-urlencoded",
      "Content-Type": "application/json",
    };
  }
  let url = BASE_URL + endPoint;
  let response = axios.get(url, { headers });
  return response.catch((error) => {
    if (error?.response?.statusCode === 401) {
      // dispatch(setToken(""));
      window.location.replace("/");
      return error;
    } else {
      return response;
    }
  });
};
