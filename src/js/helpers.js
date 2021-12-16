//stuff to help application
import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            //info sent will be in json format
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData), //body is payload
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //if fetch takes 10 seconds or more then timeout wins promise 'rejects'
    const data = await res.json(); //returns another promise
    //data from server, ok property is coming from response itself
    //invalid id 400
    // console.log(res);
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; //will be resolved value of the promise in the function
  } catch (err) {
    throw err; //rethrow error so PROMISE from get json gets rejected and error is handled inside the model
  }
};

/*
export const getJSON = async function (url) {
  //does fetching and converting to json all in one
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //if fetch takes 10 seconds or more then timeout wins promise 'rejects'
    const data = await res.json(); //returns another promise
    //data from server, ok property is coming from response itself
    //invalid id 400
    // console.log(res);
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; //will be resolved value of the promise in the function
  } catch (err) {
    throw err; //rethrow error so PROMISE from get json gets rejected and error is handled inside the model
  }
};

export const sendJSON = async function (url, uploadData) {
  //does fetching and converting to json all in one
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        //info sent will be in json format
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData), //body is payload
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //if fetch takes 10 seconds or more then timeout wins promise 'rejects'
    const data = await res.json(); //returns another promise sp have to await it
    //data from server, ok property is coming from response itself
    //invalid id 400
    // console.log(res);
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; //will be resolved value of the promise in the function
  } catch (err) {
    throw err; //rethrow error so PROMISE from get json gets rejected and error is handled inside the model
  }
};
*/
