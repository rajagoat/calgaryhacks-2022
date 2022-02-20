require('dotenv').config();

const account_sid = process.env.TWILIO_ACCOUNT_SID;
console.log(account_sid);
const auth_token = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(account_sid, auth_token);


// client.messages.create({
//     body: "This is a test text message",
//     from: "+19126179148",
//     to: "5877071978"

// })
// .then( message => console.log(message))
// .catch((err) => console.log(err));

// sendMessage("Another Test Message");

// Send a message
function sendMessage(b)
{
    client.messages.create({
        body: b,
        from: "+19126179148",
        to: "5877071978"
    
    })
    .then( message => console.log(message))
    .catch((err) => console.log(err));
}