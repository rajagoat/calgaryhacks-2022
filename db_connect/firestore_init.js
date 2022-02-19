//Run these commands in you npm console 
// run on local machine change file location where you json is located-> 
// for windows: export GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Mansoor\Desktop\CalHacks2022\calgaryhack2022-36518d7424ea.json"
// for mac: export GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Mansoor\Desktop\CalHacks2022\calgaryhack2022-36518d7424ea.json"
// npm install --save @google-cloud/firestore

//Initialize an instance of Firestore:
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'calgaryhack2022',
  keyFilename: '\calgaryhack2022-36518d7424ea.json',
});

//Create a new collection and a document using the following example code.
const docRef = db.collection('users').doc('alovelace');

(async function(){
    await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    pronouns: 'she/her',
    org_id: 1815,
    home_addr: '2500 University Dr NW, Calgary, AB T2N 1N4',
    email: 'ada.lovelace@ucalgary.ca',
    phone_num:'403-467-1346',
    password: 'calhacks2022'
});

// const aTuringRef = db.collection('users').doc('aturing');

// await aTuringRef.set({
//   'first': 'Alan',
//   'middle': 'Mathison',
//   'last': 'Turing',
//   'born': 1912
// });

    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    });
})()

