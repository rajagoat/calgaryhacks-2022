var db = require('./db_connection_modules.js');

db.initialize_dbconnection();

//set_up();

function set_up(){
  /*const org1 = {
    org_id:1, 
    org_name:"University of Calgary", 
    org_addr:"2500 University Dr NW, Calgary, AB T2N 1N4"
  };*/
  db.add_organization(1, 'University of Calgary', '2500 University Dr NW, Calgary, AB T2N 1N4');

  /*const user1 = {
    user_id: 1, 
    firstName:"John", 
    lastName:"Doe", 
    org_id:1, 
    userid:30087827, 
    home_addr: "1239 Strathcona Dr SW, Calgary, AB T3H 3S1",
    email:"john.doe@ucalgary.ca", 
    phone:"403-555-1234", 
    password:"password" 
  };*/
  db.add_user('John', 'Doe', 'he/him', 1, 30087827, '1239 Strathcona Dr SW, Calgary, AB T3H 3S1', 'john.doe@ucalgary.ca', '403-555-1234', 'password');

  /*const user2 = {
    user_id: 2, 
    firstName:"Huda", 
    lastName:"Abbas", 
    org_id:1, 
    userid:123456, 
    home_addr:"4604 80 St NW, Calgary, AB T3B 2P3", 
    email:"huda.abbas@ucalgary.ca", 
    phone:"403-555-1234", 
    password:"password" 
  };*/
  db.add_user('Huda', 'Abbas', 'she/her', 1, 123456, '4604 80 St NW, Calgary, AB T3B 2P3', 'huda.abbas@ucalgary.ca', '403-555-1234', 'password');

  /*const user3 = {
    user_id: 3, 
    firstName:"Nuha", 
    lastName:"Shaikh", 
    org_id:1, 
    userid:30087827, 
    home_addr:"614b 17 Ave SW, Calgary, AB T2S 0B4", 
    email:"nuha.shaikh@ucalgary.ca", 
    phone:"403-555-1234", 
    password:"password" 
  };*/
  db.add_user('Nuha', 'Shaikh', 'she/her', 1, 30087631, '614b 17 Ave SW, Calgary, AB T2S 0B4', 'nuha.shaikh1@ucalgary.ca', '403-455-9917', 'password1234');

  /*const user3 = {
    user_id: 3, 
    firstName:"Lubaba", 
    lastName:"Sheikh", 
    org_id:1, 
    userid:150160, 
    home_addr:"80 Strathridge Crescent SW, Calgary, AB T3H 3R9", 
    email:"nuha.shaikh@ucalgary.ca", 
    phone:"403-555-1234", 
    password:"password" 
  };*/
  db.add_user('Lubaba', 'Sheikh', 'she/her', 1, 150160, '80 Strathridge Crescent SW, Calgary, AB T3H 3R9', 'lubaba.sheikh@ucalgary.ca', '403-455-9917', 'password1234');

  /*const journeyRequest1 = {
    user_id: 150160,
    user_type: "Driver",
    vehicle_size: 4,
    arrival_time: "February 20, 2022 8:50:00",
  };*/
  db.add_journey_request_driver(150160, 'Driver', 4,'February 20, 2022 8:50:00');

  /*const journeyRequest2 = {
    user_id: 30087631,
    user_type: "Rider",
    arrival_time: "February 20, 2022 8:52:00",
  };*/
  db.add_journey_request_passenger(30087631, 'Passenger', 'February 20, 2022 8:52:00');

  /*const journeyRequest3 = {
    user_id: 30087827,
    user_type: "Rider",
    arrival_time: "February 20, 2022 9:00:00",
  };*/
  db.add_journey_request_passenger(30087827, 'Passenger', 'February 20, 2022 9:00:00');

  /*const journeyRequest3 = {
    user_id: 123456,
    user_type: "Rider",
    arrival_time: "February 20, 2022 9:01:00",
  };*/
  db.add_journey_request_passenger(123456, 'Passenger', 'February 20, 2022 9:01:00');
}

let calling_getuseraddr = function(ucid) {
  return db.get_user_addr(ucid).then(token => { return token } )
}

let calling_getorgaddr = function(org_id) {
  return db.get_org_addr(org_id).then(token => { return token } )
}

let calling_get_journeys = function(org_id) {
  return db.get_journey_requests().then(token => { return token } )
}

//carpoolTrip template
const carpoolTrip = {
  trip_id: 1,
  travel_time: 0,
  driver_id: 0,
  departure_time: "",
  passeneger_pickup_times: [],
  cost_per_rider: 0,
  no_passengers: 0,
  riders: [] 
};

//db.print_users();
//db.print_organizations();

var axios = require('axios');

algorithm();

function duration(address1, address2) { // returns the distance between two addresses in minutes
  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + address1 + '&destinations=' + address2 + '&key=AIzaSyAiT_67z4JJg_Vhc3KaPmOjyR9KktIN3HU',
    headers: { }
  };
  return axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    console.log("The time from " + address1 + " to " + address2 + " is: " + response.data.rows[0].elements[0].duration.text);
    return response.data.rows[0].elements[0].duration.value/60;
  })
  .catch(function (error) {
    console.log(error);
  });
}

function distance(address1, address2) { // returns the distance between two addresses in km
  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + address1 + '&destinations=' + address2 + '&key=AIzaSyAiT_67z4JJg_Vhc3KaPmOjyR9KktIN3HU',
    headers: { }
  };
  return axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    console.log("The distance from " + address1 + " to " + address2 + " is: " + response.data.rows[0].elements[0].distance.text);
    return response.data.rows[0].elements[0].distance.value/1000;
  })
  .catch(function (error) {
    console.log(error);
  });
}

async function algorithm() {

  var total_time = 0; // in minutes
  var gas_cost = 11*1.39/100; // cost of gas per km (11L/100 km * $1.39/L)
  var driver_arrival_time = "";
  var driver;
  var vehicle_size;
  var org_id;

  /*
let home_addr = await calling_getuseraddr(30087631);
    console.log("Home address with ucid of 30087631: ", result);


    let org_addr = await calling_getorgaddr(1);

    console.log("Organization address for org_id = 1: ", result);
 */

  var journey_requests = await calling_get_journeys();
  console.log("All journeys: ", journey_requests);

  for(var i = 0; i < journey_requests.length; i++) { // for each journery request
    if(journey_requests[i].user_type == "Driver") { // if the user is a driver
      carpoolTrip.driver_id = journey_requests[i].ucid;
      vehicle_size = journey_requests[i].no_passengers;
      driver_arrival_time = journey_requests[i].arrival_time;
      console.log("Driver: ", carpoolTrip.driver_id + "  with vehicle size " + vehicle_size + " and driver arrival time of " + driver_arrival_time);
    }
  }

  //selecting all riders in the journey
  for(var i = 0; i < journey_requests.length; i++) { // for each journey request
    if(carpoolTrip.driver_id != 0) { // if the driver has been assigned
      driver = await calling_get_user(carpoolTrip.driver_id);
      if( journey_requests[i].user_type == "Passenger") { // if the user is a rider
        org_id = driver.org_id; //set driver org id
        console.log("The driver is: " + driver.firstName);
        let arrival_time_1 = new Date(driver_arrival_time).getTime()/1000; // convert ms to seconds
        let arrival_time_2 = new Date(journey_requests[i].arrival_time).getTime()/1000;
        let time_difference = Math.abs(arrival_time_2 - arrival_time_1);
        console.log("The arrival times are: " + time_difference/60 + " minutes apart");
        if(time_difference <= 600) { //arriving within 10 minutes (600 seconds)
          let user = await calling_get_user(journey_requests[i].ucid);
          let user_addr = await calling_getuseraddr(journey_requests[i].ucid); // for each user (find the address for the user is the same as the user we are looking at)
          var time_from_driver_to_user = await duration(user.home_addr, driver.home_addr);
          if(time_from_driver_to_user < 5){ // 5 minutes
            if(carpoolTrip.no_passengers < vehicle_size) { // if there is room for the rider
              carpoolTrip.no_passengers++;
              carpoolTrip.riders.push(user); //add the passenger to the carpool
              console.log("The rider being added is: " + user.firstName + " " + user.lastName);
            } else{
              console.log("Sorry.. no more space available for this trip");
              //go back and look for new driver?
              break;
            }
          } else {
            console.log("Sorry.. no drivers in your area are available");
            break;
          }   
        } else {
          console.log("Sorry.. no drivers leaving within 10 minutes of your arrival time");
          break;
        } 
      }
    } else{
      console.log("Sorry...No drivers available");
    }
  }

  carpoolTrip.riders.sort(async function(a, b){return await duration(a, driver.home_addr) - await duration(b, driver.home_addr)}); //sort in aseending order from closest to driver to furthest
  
  var total_distance = 0; //in km

  for(var i = carpoolTrip.riders.length - 1; i >= 0 ; i--) { // for each rider, set pickup time
    console.log("Rider # " + carpoolTrip.riders.length);
    var time = 0;
    if(i == carpoolTrip.riders.length - 1 ) { //last ride
      let destination = org_address;
      time = await duration(carpoolTrip.riders[i].home_addr, destination); //time from last rider to destination
      total_distance += await distance(carpoolTrip.riders[i].home_addr, destination); //distance from last rider to destination
    } else{
      time = await duration(carpoolTrip.riders[i].home_addr,  carpoolTrip.riders[i+1].home_addr);
      total_distance += await distance(carpoolTrip.riders[i].home_addr,  carpoolTrip.riders[i+1].home_addr); //distance from last rider to destination
    }
    let arrival_date = new Date(driver_arrival_time);
    console.log("The arrival date is: " + arrival_date);
    carpoolTrip.passeneger_pickup_times[i] = new Date(arrival_date.getTime() - time*60000); //set pickup time
    console.log("For rider " + carpoolTrip.riders[i].firstName + " " + carpoolTrip.riders[i].lastName + " the pickup time is: " + carpoolTrip.passeneger_pickup_times[i]);
    total_time += time;
  }

  if(carpoolTrip.no_passengers != 0) { // if there are no riders
    var time = await duration(driver.home_addr, carpoolTrip.riders[0].home_addr);
    total_distance += await distance(driver.home_addr, carpoolTrip.riders[0].home_addr);
    carpoolTrip.departure_time = new Date(carpoolTrip.passeneger_pickup_times[0]  - time*60000); //time from driver to first rider
    total_time += time;

    carpoolTrip.travel_time = total_time;
    console.log("The total trip in km is: " + total_distance);
    console.log("The total trip is: " + carpoolTrip.travel_time);
    console.log("Departure time for driver: " + carpoolTrip.departure_time);
    carpoolTrip.cost_per_rider = total_distance * gas_cost / carpoolTrip.no_passengers;
    console.log("Cost per rider: " + carpoolTrip.cost_per_rider);
    db.add_carpool_trip(carpoolTrip.travel_time, carpoolTrip.driver_id, carpoolTrip.departure_time, carpoolTrip.passenger_pickup_times, carpoolTrip.cost_per_rider,no_of_passenger, carpoolTrip.no_passengers, carpoolTrip.riders);
  } else{
    console.log("Sorry.. No ride available. All drivers are too far away");
  }
}



  






