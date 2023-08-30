const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

const PORT = 8000;

const credentials = {
  apiKey: "601b14b1d2bcb02b15eabc079db7408131751e123cbfe8b34062a5528dfba7c1",
  username: "HireMate",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;
const voice = AfricasTalking.VOICE;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { phoneNumber, text } = req.body;

  console.log("wwwwwww");

  if (text === "") {
    console.log(text);

    response = `CON What would you like to do
            1. HelpLine
            2. How to deal with Baby Blues
            3. Volunteer to help mothers
            4. Donate to support the cause
            `;
  } else if (text === "1") {
    // Get the voice service
    const credentials = {
      apiKey:
        "7695515aabed876f3d981151e44b5c7fbb0d3dbe7ef8375d3e852ea540e2e587",
      username: "HireMate",
    };
    const AfricasTalking = require("africastalking")(credentials);
    const voice = AfricasTalking.VOICE;

    function makeCall(phoneNumber) {
      const options = {
        callFrom: "+254711082581",

        callTo: [phoneNumber],
      };

      console.log("calling");
      voice.call(options).then(console.log).catch(console.log);
    }

    makeCall(phoneNumber);

    response = `CON you will receive a call shortly \n
    0. Back`;
  } else if (text === "2") {
    function sendSms() {
      console.log("wwwww");
      const options = {
        to: phoneNumber,
        message:
          "https://docs.google.com/forms/d/1Gx7sMnqxxs-WXlKdx8k32_GW811mBUWw12Tr4Sk6WP4/prefill",
      };
      sms
        .send(options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    sendSms();

    console.log("smssssss");
    response = `CON you will receive an sms with a link to a document about it shortly \n
    0. Back`;
  } else if (text === "3") {
    function sendSms() {
      console.log("wwwww");
      const options = {
        to: phoneNumber,

        message:
          "https://docs.google.com/forms/d/1Gx7sMnqxxs-WXlKdx8k32_GW811mBUWw12Tr4Sk6WP4/prefill",
      };
      sms
        .send(options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    sendSms();
    // Business logic for first level response
    response = `ECON YOU WILL RECEIVE A LINK TO THE VOLUNTEER FORM SHORTLY \n 
    0. Back`;
  } else if (text === "4") {
    console.log("wwwww222");

       response = `CON thank you \n 
    0. Back`;
  }
  else if (text === "1*0") {
    console.log(text);

    response = `CON What would you like to do
            1. HelpLine
            2. How to deal with Baby Blues
            3. Volunteer to help mothers
            4. Donate to support the cause
            `;
  } else if (text === "2*0") {
    console.log(text);

    response = `CON What would you like to do
            1. HelpLine
            2. How to deal with Baby Blues
            3. Volunteer to help mothers
            4. Donate to support the cause
            `;
  } else if (text === "3*0") {
    console.log(text);

    response = `CON What would you like to do
            1. HelpLine
            2. How to deal with Baby Blues
            3. Volunteer to help mothers
            4. Donate to support the cause
            `;
  } else if (text === "4*0") {
    //     console.log(text);

    response = `CON What would you like to do
            1. HelpLine
            2. How to deal with Baby Blues
            3. Volunteer to help mothers
            4. Donate to support the cause
            `;
  
  }
            // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
