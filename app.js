const base_url = 'http://api.aviationstack.com/v1/flights?';
const key = "18921a801b34a7ef06b1349fa18f5f10";
const params = {
    access_key: "18921a801b34a7ef06b1349fa18f5f10"
}
var airport = document.getElementsByName("textbox1").value;
var current_request;
var flightNum;
var temp_num;
function processRequest(airport) {
    fetch(base_url + '&access_key=' + key + "&arr_iata=" + airport)
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            //console.log(data.data[1].flight_status);
            updateTable(data);
            current_request = data.data;
            console.log(current_request);
            //appendData(data);
            //displayResults(data);
            // getItem(data);
          })
        .catch(function () {
            // catch any errors
          });
  }

function updateTable(d){
  var flights = d.data;
  var table = document.getElementById("showData");

  for (var i=0; i<flights.length; i++) {
    var row = table.insertRow(1);
    var f = flights[i];
    var baggage = row.insertCell(0);
    var gate = row.insertCell(0);
    var estimated = row.insertCell(0);
    var scheduled = row.insertCell(0);
    var status = row.insertCell(0);
    var departure_airport = row.insertCell(0);
    var airline = row.insertCell(0);
    var flight_num = row.insertCell(0);
    
    estimated1 = f.arrival.estimated;
    estimatedSplit = estimated1.split("T");
    estimatedSplit2 = estimatedSplit[1].split(":00+00");
    estimatedFinal = estimatedSplit2[0];
    scheduled1 = f.arrival.scheduled;
    scheduledSplit = scheduled1.split("T");
    scheduledSplit2 = scheduledSplit[1].split(":00+00");
    scheduledFinal = scheduledSplit2[0];

    baggage.innerHTML = f.arrival.baggage;
    gate.innerHTML = f.arrival.gate;
    estimated.innerHTML = estimatedFinal;
    scheduled.innerHTML = scheduledFinal;
    status.innerHTML = f.flight_status;
    departure_airport.innerHTML = f.departure.airport;
    airline.innerHTML = f.airline.name;
    temp_num = f.flight.number;
    flight_num.innerHTML=  '<a href="#" onclick="setFlightNum(temp_num)" value="f.flight.num"">'+f.flight.number+'</a>';
  }
} 

function clearTable(){
  var table = document.getElementById("showData");
  var num_rows = document.getElementById("showData").rows.length;
  for (var i=num_rows; i>1; i--){
    table.deleteRow(i-1);
  }
}

function setFlightNum(fn){
  flightNum = fn;
  console.log(flightNum);
  console.log(current_request);
  console.log(current_request.length);
  for (var i=0; i<current_request.length; i++){
    c = current_request[i];
    if (c.flight.number == flightNum){
      console.log('FOUND FLIGHT');
      $('#modal1').on('hidden.bs.modal', function () {
        $('.modal-content').html("");
      });
      $('#modal1').modal('show');
      $('#modal1').find('.modal-content').append('Flight number: '+c.flight.number);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Airline: '+c.airline.name);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Departure Airport: '+c.departure.airport);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Status: '+c.flight_status);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Schduled: '+c.arrival.scheduled);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Estimated: '+c.arrival.estimated);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Delay: '+c.arrival.delay);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Gate: '+c.arrival.gate);
      $('#modal1').find('.modal-content').append('<br>');
      $('#modal1').find('.modal-content').append('Baggage: '+c.arrival.baggage);
      $('#modal1').find('.modal-content').append('<br>');
    }
  }
  
}