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

export const getJSON = async function (url) {
  //does fetching and converting to json all in one
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); //if fetch takes 10 seconds or more then timeout wins promise 'rejects'
    const data = await res.json(); //returns another promise
    //data from server, ok property is coming from response itself
    //invalid id 400
    // console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; //will be resolved value of the promise in the function
  } catch (err) {
    throw err; //rethrow error so PROMISE from get json gets rejected and error is handled inside the model
  }
};
