//! api

import { checkToken } from "./helper/checkToken";

export const api = "https://api.9publishers.com/api";
export const imageApi = "https://api.9publishers.com";

//export const api = "http://192.168.100.4:8000/api";
//export const imageApi = "http://192.168.100.4:8000";

// export const api = 'http://kowinthuaung.local:8001/api';
// export const imageApi = 'http://kowinthuaung.local:8001';
// Welcome9Publishers
//useFetch

async function useFetch({ url, method, data = null, token }) {
  const generalData = (token, method) => {
    return {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
  };
  const test = generalData(token, method);
  if (data) {
    const post = JSON.stringify(data);
    test["body"] = post;
  }
  // console.log(data);
  const response = await fetch(`${api}/user/${url}`, test);
  // console.log(`${api}/user/${url}`);
  const result = await response.json();
  // console.log(result);
  if (result.authorize === false) {
    checkToken(result);
  }

  return result;
}
export default useFetch;

export const usePostForm = async ({ url, method, data, token }) => {
  const generalData = (token, method) => {
    return {
      method: `${method}`,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
  };
  const test = generalData(token, method);
  if (data) {
    test["body"] = data;
  }
  // console.log(test);
  const response = await fetch(`${api}/user/${url}`, test);
  const result = await response.json();
  // console.log(result);
  if (result.authorize === false) {
    checkToken(result);
  }
  return result;
};
