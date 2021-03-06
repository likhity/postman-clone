import axios from "axios";
import jsonFormat from "json-format";
import {
  formElement,
  bodyElement,
  responseElement,
  getKeyValuePairData,
} from "./ui";

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const requestMethod = formElement.method.value;
  const requestUrl = formElement.url.value;
  const params = getKeyValuePairData(".tabPane.params");
  const headers = getKeyValuePairData(".tabPane.headers");
  headers["Access-Control-Allow-Origin"] = "*";
  axios({
    method: requestMethod.toLowerCase(),
    url: requestUrl,
    headers,
    params,
    data: bodyElement.value && JSON.parse(bodyElement.value),
  })
    .then((result) => {
      const { data } = result;
      if (data) {
        if (typeof data === "object") {
          responseElement.value = jsonFormat(data, { type: "space", size: 2 });
        } else {
          responseElement.value = data;
        }
      } else {
        responseElement.value = `No response was recieved. Response status code: ${result.status}. More details were logged to the console.`;
      }
      console.log(result);
    })
    .catch((error) => {
      responseElement.value = `Error. \n${error}`;
    });
});
