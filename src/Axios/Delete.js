import axios from "axios";
import { BASE_URL } from "../Constants/Constants";

export const Delete = (
  endPoint,
  data,
  encrypted = true,
  token,
  // dispatch,
  // setToken,
  isMultiPart
) => {
  let headers;
  if (encrypted) {
    headers = {
      // withCredentials: true,
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": isMultiPart ? "multipart/form-data" : "application/json",
    };
  } else {
    headers = {
      // withCredentials: true,
      Accept: "application/json",
      // "Content-Type": "multipart/form-data",
    };
  }

  let url = BASE_URL + endPoint;

  let response = axios.delete(url, { headers });

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
