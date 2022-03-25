import Payment                                                         from "payment";
import {API_URL, CARD_NUMBER_LENGTH, CVC_MAX_LENGTH, EXPIRATION_RANGE} from "./constants";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
  if(!value) {
    return value;
  }

  const clearValue = clearNumber(value);
  let nextValue;

  if(clearValue.length >= CARD_NUMBER_LENGTH) {
    return clearValue.slice(0, CARD_NUMBER_LENGTH);
  }

  return clearValue;
}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);

  let maxLength = CVC_MAX_LENGTH;

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if(clearValue.length >= 6) {
    let month = clearValue.slice(0, 2);
    if(parseInt(month) > 12)
      month = 12;

    let year = clearValue.slice(2, 6);
    if(!(EXPIRATION_RANGE[0] < year && year < EXPIRATION_RANGE[1]))
      year = EXPIRATION_RANGE[1];

    return `${month}/${year}`;
  }

  return clearValue;
}

export function formatAmount(value) {
  const clearValue = clearNumber(value);

  return clearValue;
}


export function formatFormData(data) {
  return Object.keys(data).map(d => `${d}: ${data[d]}`);
}

export class Fetcher {
  constructor() {
    this.methodAddCard = API_URL+'add-card';
  }

  sendCard = (obj) => {
    fetch(this.methodAddCard, this.requestOptionsPost(obj))
    // Получаем ответ
    .then((res) => {
      console.log(res);
      if(!res.ok) {
        console.log('Error fetching API.');
      }
      else return res.json();
    })
    .then(
      (result) => {
        console.log(result)
      }
    )
    .catch(error => {
      console.log(error)
    })
  }

  requestOptionsGet = (array) => {
    const requestOptions = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return requestOptions;

  }

  requestOptionsPost = (array) => {
    const requestOptions = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array)
    };

    return requestOptions;
  }
}