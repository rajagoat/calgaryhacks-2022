var tools = require('./db_connection_modules.js');
console.log(typeof tools.initialize_dbconnection); // => 'function'

tools.initialize_dbconnection();
// tools.get_user_addr(30087631);
let calling_getuseraddr = function(ucid) {
  return tools.get_user_addr(ucid).then(token => { return token } )
}

let addr = calling_getuseraddr(30087631);

addr.then(function(result) 
{
   console.log("This will work, positive affirmation: ", result) // "Some User token"
})


tools.add_organization(679, 'nuhas uni', '2500 University Dr NW, Calgary, AB T2N 1N4');
let calling_getorgaddr = function(org_id) {
  return tools.get_org_addr(org_id).then(token => { return token } )
}

let addre = calling_getorgaddr(679);

addre.then(function(result) 
{
   console.log("This will work, positive affirmation for organization ID: ", result) // "Some User token"
})

// tools.add_journey_request_driver(30087631, 'passenger', 100,'February 20, 2022 9:00:00' );
// tools.add_journey_request_passenger(30087631, 'driver', 'February 20, 2022 9:00:00');
let calling_getjur = function(org_id) {
  return tools.get_journey_requests().then(token => { return token } )
}

let addres = calling_getjur();

addres.then(function(result) 
{
   console.log("This will work, positive affirmation for JOURNEYS: ", result) // "Some User token"
})
// var jur= tools.get_journey_requests();
// console.log(jur[0]);
// console.log('Instantiated an instance of the DB!');
// //========**testing**==========
// //add_user
// // add_user('nuha', 'shaikh', 'she/her', 20, 30087631, '614b 17 Ave SW, Calgary, AB T2S 0B4', 'nuha.shaikh1@ucalgary.ca', '403-455-9917', 'password1234');


// //delete_user()
// delete_user(30087631);
// print_users();




// add_organization('University of Calgary', '2500 University Dr NW, Calgary, AB T2N 1N4');
// print_organizations();


// print_users();