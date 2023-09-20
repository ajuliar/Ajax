'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
}
  fetch('/fortune')
    .then((response) => response.text())
    .then((FORTUNES) => {
      document.querySelector('#fortune-text').innerText = FORTUNES;
    });


document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;

  // queryString = "zipcode=94110"
  const queryString = new URLSearchParams({ 'zipcode': zipcode }).toString();
  
  // WANT: "/weather.json?zipcode=94110"
  const url = `/weather.json?${queryString}`;
  
  fetch(url) //response is whatever comes back from the fetch request
    .then((response) => response.json()) // take the response and extract that dictionary as a JSON object. the result gets plugged into the next function
    .then((status) => { // status = {'forecast': 'Rainy, damp, and rich with hipsters.', 'temp': '60F'}
      document.querySelector('#weather-info').innerHTML = status['forecast']; 
    });
};

document.querySelector('#weather-form').addEventListener('submit', showWeather);


/* 
document.querySelector('#order-form').addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formInputs = {
    type: document.querySelector('#type-field').value,
    amount: document.querySelector('#amount-field').value,
  };

  fetch('/new-order', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson.status);
    });
});
*/


// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })

    .then((response) =>response.json())
    .then((responseJson) => {
      console.log(responseJson)
      //alert(responseJson);
      document.querySelector('#order-status').innerHTML = responseJson['msg']; 
      if (responseJson['code'] === 'ERROR'){
        document.querySelector('#order-status').classList.add("order-error")
      } else {
        document.querySelector('#order-status').classList.remove("order-error")
      }
    });
  };
  //blogContainer.classList.add()
  //.classList.remove()
  //document.querySelector('#order-status').classList = responseJson['code']; 


  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
document.querySelector('#order-form').addEventListener('submit', orderMelons);
