const org1 = {
  org_id:1, 
  org_name:"University of Calgary", 
  org_addr:"2500 University Dr NW, Calgary, AB T2N 1N4"
};

const user1 = {
  user_id: 1, 
  firstName:"John", 
  lastName:"Doe", 
  org_id:1, 
  userid:30087827, 
  home_addr: "1239 Strathcona Dr SW, Calgary, AB T3H 3S1",
  email:"john.doe@ucalgary.ca", 
  phone:"403-555-1234", 
  password:"password" 
};

const user2 = {
  user_id: 2, 
  firstName:"Huda", 
  lastName:"Abbas", 
  org_id:1, 
  userid:123456, 
  home_addr:"4604 80 St NW, Calgary, AB T3B 2P3", 
  email:"huda.abbas@ucalgary.ca", 
  phone:"403-555-1234", 
  password:"password" 
};

const user3 = {
  user_id: 3, 
  firstName:"Nuha", 
  lastName:"Shaikh", 
  org_id:1, 
  userid:30087827, 
  home_addr:"80 Strathridge Crescent SW, Calgary, AB T3H 3R9", 
  email:"nuha.shaikh@ucalgary.ca", 
  phone:"403-555-1234", 
  password:"password" 
};

const journeyRequest1 = {
  user_id: 3,
  user_type: "Driver",
  vehicle_size: 4,
  arrival_time: "February 20, 2022 8:50:00",
};

const journeyRequest2 = {
  user_id: 2,
  user_type: "Rider",
  arrival_time: "February 20, 2022 8:52:00",
};

const journeyRequest3 = {
  user_id: 1,
  user_type: "Rider",
  arrival_time: "February 20, 2022 9:00:00",
};

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

var axios = require('axios');
var users = [journeyRequest1, journeyRequest2, journeyRequest3];
var allUsers = [user1, user2, user3];

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

  for(var i = 0; i < users.length; i++) { // for each user
    if(users[i].user_type == "Driver") { // if the user is a driver
      carpoolTrip.driver_id = users[i].user_id;
      vehicle_size = users[i].vehicle_size;
      driver_arrival_time = users[i].arrival_time;
    }
  }

  //selecting all riders in the journey
  for(var i = 0; i < users.length; i++) { // for each journey request
    if(carpoolTrip.driver_id != 0) { // if the driver has been assigned
      for(var j = 0; j < allUsers.length; j++) { // for each user
        if(allUsers[j].user_id == carpoolTrip.driver_id) { // find the driver
          driver = allUsers[j];
        }
      }
      if(users[i].user_type == "Rider") { // if the user is a rider
        //if(user1.org_id == org1.org_id) { // if the user is in the same org as the driver
        console.log("The driver is: " + driver.firstName);
        let arrival_time_1 = new Date(driver_arrival_time).getTime()/1000; // convert ms to seconds
        let arrival_time_2 = new Date(users[i].arrival_time).getTime()/1000;
        let time_difference = Math.abs(arrival_time_2 - arrival_time_1);
        console.log("The arrival times are: " + time_difference/60 + " minutes apart");
        if( time_difference <= 600) { //arriving within 10 minutes (600 seconds)
          for(var j = 0; j < allUsers.length; j++) { // for each user
            if(users[i].user_id == allUsers[j].user_id) { // if the user is the same as the user we are looking at
              var time_from_driver_to_user = await duration(allUsers[j].home_addr, driver.home_addr);
              if(time_from_driver_to_user < 5){ // 5 minutes
                if(carpoolTrip.no_passengers < vehicle_size) { // if there is room for the rider
                  carpoolTrip.no_passengers++;
                  carpoolTrip.riders.push(allUsers[j]); //add the passenger to the carpool
                  console.log("The rider being added is: " + allUsers[j].firstName + " " + allUsers[j].lastName);
                } else{
                  console.log("Sorry.. No drivers available");
                  //go back and look for new driver?
                  break;
                }
                destination = users[i].home_addr;
                break;
              } 
            }  
          }
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
      let destination = org1.org_addr;
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
  } else{
    console.log("Sorry...No ride available. All drivers are too far away");
  }
}



  






