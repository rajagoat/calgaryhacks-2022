//Run these commands in you npm console 
// run on local machine change file location where you json is located-> 
// for windows: export GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Mansoor\Desktop\CalHacks2022\calgaryhack2022-36518d7424ea.json"
// for mac: export GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Mansoor\Desktop\CalHacks2022\calgaryhack2022-36518d7424ea.json"
// npm install --save @google-cloud/firestore

//Initialize an instance of Firestore:

// initialize_dbconnection();
// console.log('Instantiated an instance of the DB!');
// //========**testing**==========
// //add_user
// // add_user('nuha', 'shaikh', 'she/her', 20, 30087631, '614b 17 Ave SW, Calgary, AB T2S 0B4', 'nuha.shaikh1@ucalgary.ca', '403-455-9917', 'password1234');


// //delete_user()
// delete_user(30087631);
// print_users();
// // get_user_addr()
// let calling_getuseraddr = function(ucid) {
//   return get_user_addr(ucid).then(token => { return token } )
// }

// let addr = calling_getuseraddr('alovelace');

// addr.then(function(result) 
// {
//    console.log("This will work, positive affirmation: ", result) // "Some User token"
// })


// add_organization('University of Calgary', '2500 University Dr NW, Calgary, AB T2N 1N4');
// print_organizations();


// print_users();
//=======**end-testing**========

//=========================USER DB FUNCTIONALITIES=====================================
//Add a new user to the User collection -> works
//  const db = new Firestore({
//         projectId: 'calgaryhack2022',
//         keyFilename: '\calgaryhack2022-36518d7424ea.json',
//     });
var db;
module.exports = {
    initialize_dbconnection: function(){
    console.log('Hello world initializing firestore DB!');
    const { setLogFunction } = require('@google-cloud/firestore');
    const Firestore = require('@google-cloud/firestore');
    const { useCallback } = require('react/cjs/react.development');
    db= new Firestore({
        projectId: 'calgaryhack2022',
        keyFilename: '\calgaryhack2022-36518d7424ea.json',
    });
},
add_user: function (first, last, pronouns, org_id, ucid, home_addr, email, phone_num, password)
{
    //autogenerated ID
    var exists=0;
    const data={
        first: first,
        last: last,
        pronouns: pronouns,
        org_id: org_id,
        ucid: ucid, 
        home_addr: home_addr,
        email: email,
        phone_num:phone_num,
        password: password
    };
    (async function(){
        // Add a new document with a generated id.
        const snapshot = await db.collection('users').get();
        snapshot.forEach((doc) => {
            //make sure ucid is unique
            if(doc.ucid==data.ucid){
                console.log("Duplicate UCID, please change ucid number to a unique number");
                exists=1;
            }
        });
        if(exists==1){
            return; //dont add
        }
        const res = await db.collection('users').add(data);
        console.log('Added document with ID: ', res.id);
    })()
},


// function delete_user(ucid)
// { //pass the id of document -> id of specific user
//     const citiesRef = db.collection('users');
//     const snapshot = citiesRef.where('ucid', '==', ucid).get();
//     if (snapshot.empty) 
//     {
//         console.log('No matching documents.');
//         return;
//     }  

//     //says 
//     snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//         (async function(){
//             const res = await db.collection('users').doc(doc.id).delete();
//         })()
//     });
// }

get_user: async function(ucid)
{
    var users= [];
    const journye_requests = db.collection('users');
    const snapshot = await journye_requests.where('ucid', '==', ucid).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
    snapshot.forEach(doc => {
        console.log('hey lololol');
        users.push(doc.data());
    });
    return users[0];
},

get_user_addr: async function(ucid) {//*****user id should be set *******
    console.log("In get user addr function!: ", ucid);
    var add;
    console.log("In async portion of user addr!");
    const snapshot = await db.collection('users').where('ucid', '==', ucid).get();
    snapshot.forEach((doc) => 
    {
        console.log(doc.id, '=>', doc.data());
        if(doc.data().ucid==ucid)
        {
            console.log("they are equal");
            console.log("this is home_addr: ", doc.data().home_addr);
            add = doc.data().home_addr;
            console.log("this is home_add in let: ", add);
        }
    }
    );
    return add;
},


print_users:function()
{
    //printing out each collection
    console.log("In print_users function!");
    (async function(){
        console.log("In print_users async function!");
        const snapshot = await db.collection('users').get();
        snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    })()
},
//=========================**END USER DB FUNCTIONALITIES**=====================================

//=========================ORG DB FUNCTIONALITIES=====================================
//Add a new organization to the organization collection
add_organization: function (org_id, name, address){
    //autogenerated ID
    const data={
        org_id:org_id,
        name: name,
        address: address
    };
    (async function(){
        // Add a new document with a generated id.
        const res = await db.collection('organizations').add(data);
        console.log('Added document with ID: ', res.id);
    })()
},

//may have to diversify this -> if organization name is passed then might have to extract org_id from name
delete_organization: function (org_id){ //pass the id of document -> id of specific organization
    (async function(){
        const res = await db.collection('organizations').doc(org_id).delete();
    })()
},

//******get organization address *********
get_org_addr: async function(org_id) {//*****user id should be set *******
    console.log("In get user addr function!: ", org_id);
    var add;
    console.log("In async portion of user addr!");
    const snapshot = await db.collection('organizations').where('org_id', '==', org_id).get();
    snapshot.forEach((doc) => 
    {
        console.log(doc.id, '=>', doc.data());
        if(doc.data().org_id==org_id)
        {
            console.log("they are equal");
            console.log("this is home_addr: ", doc.data().address);
            add = doc.data().address;
            console.log("this is home_add in let: ", add);
        }
    }
    );
    return add;
},

print_organizations: function (){
    //printing out each collection
    console.log("In print_users function!");
    (async function(){
        console.log("In print_orgs async function!");
        const snapshot = await db.collection('organizations').get();
        snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    })()
},
//=========================**ORG DB FUNCTIONALITIES**=====================================

//=========================journey_request FUNCTIONALITIES=====================================

add_journey_request_driver: function (ucid, user_type, no_passengers, arrival_time){
    //autogenerated ID
    const data={
        ucid: ucid,
        user_type: user_type,
        no_passengers: no_passengers,
        arrival_time: arrival_time
    };
    (async function(){
        // Add a new document with a generated id.
        const res = await db.collection('journey_request').add(data);
        console.log('Added document with ID: ', res.id);
    })()
},

add_journey_request_passenger: function (ucid, user_type,arrival_time){
    //autogenerated ID
    const data={
        ucid: ucid,
        user_type: user_type,
        arrival_time: arrival_time
    };
    (async function(){
        // Add a new document with a generated id.
        const res = await db.collection('journey_request').add(data);
        console.log('Added document with ID: ', res.id);
    })()
},

print_journey_requests: function (){
    //printing out each collection
    console.log("In print_journey_requests function!");
    (async function(){
        console.log("In print_journey_requests async function!");
        const snapshot = await db.collection('journey_request').get();
        snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    })()
},

get_journey_requests: async function(){
    var journeys= [];
    const journye_requests = db.collection('journey_request');
    const snapshot = await journye_requests.where('ucid', '!=', null).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
    snapshot.forEach(doc => {
        journeys.push(doc.data());
    });
    // snapshot.forEach((doc) => {
    //         console.log(doc.id, '=>', doc.data());
    //         journeys.push(doc);
    //     }
    // );
    return journeys;
},

//may have to diversify this -> if organization name is passed then might have to extract org_id from name
delete_journey_request: function(journey_id){ //pass the id of document -> id of specific organization
    (async function(){
        const res = await db.collection('journey_request').doc(journey_id).delete();
    })()
},

//=========================**END journey_request FUNCTIONALITIES**=====================================

//=========================carpool_trip FUNCTIONALITIES=====================================
add_carpool_trip: function(travel_time, driver_id, departure_time, pass_pickup_times, cost_per_pass,no_of_passenger, passengers){
    //autogenerated ID
    const data={
        travel_time: travel_time,
        driver_id: driver_id,
        departure_time: departure_time,
        pass_pickup_times: pass_pickup_times,
        cost_per_pass: cost_per_pass,
        no_of_passenger: no_of_passenger,
        passengers: passengers
    };
    (async function(){
        // Add a new document with a generated id.
        const res = await db.collection('carpool_trip').add(data);
        console.log('Added document with ID: ', res.id);
    })()
},

//may have to diversify this -> if organization name is passed then might have to extract org_id from name
delete_carpool_trip: function(carpool_trip_id){ //pass the id of document -> id of specific organization
    (async function(){
        const res = await db.collection('journey_request').doc(carpool_trip_id).delete();
    })()
}
};
//=========================**ENDcarpool_trip FUNCTIONALITIES**=====================================





