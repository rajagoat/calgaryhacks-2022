const person = {firstName:"John", lastName:"Doe", org_id:1, userid:30087827, home_addr:"54 Tuscany Glen Way NW Calgary, AB T3L 2V8", email:"john.doe@ucalgary.ca", phone:"403-555-1234", password:"password"};
const org = {org_id:1, org_name:"University of Calgary", org_addr:"2500 University Dr NW, Calgary, AB T2N 1N4"}

var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101%2C-73.89188969999998|' + user_address + '&destinations=40.659569%2C-73.933783%2500 University Dr NW, Calgary, AB T2N 1N4%7C40.729029%2C-73.851524&key=AIzaSyAiT_67z4JJg_Vhc3KaPmOjyR9KktIN3HU',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  console.log("The distance is: " + response.data.rows[1].elements[0].duration.text);
})
.catch(function (error) {
  console.log(error);
});

function algorithm() {
  var time = 0; // in minutes
  var address1 = "54 Tuscany Glen Way NW Calgary, AB T3L 2V8";
  var address2 = "40.659569,-73.933783";
  var address3 = "40.729029,-73.851524";
  var destination = "2500 University Dr NW, Calgary, AB T2N 1N4";