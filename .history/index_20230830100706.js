const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 8000;

const credentials = {
  apiKey: "601b14b1d2bcb02b15eabc079db7408131751e123cbfe8b34062a5528dfba7c1",
  username: "HireMate",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

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
    const voice = AfricasTalkings.VOICE;

    function makeCall(phoneNumber1) {
      const options = {
        callFrom: "+254730731029",

        callTo: [phoneNumber1],
      };

      console.log("calling");
      voice.call(options).then(console.log).catch(console.log);
    }

    makeCall(phoneNumber);

    response = `END you will receive a call shortly `;
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
    response = `CON you will receive an sms with a link to a document about it shortly \n`;
 
  }



  else if (text === "3") {
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
     response = `CON YOU WILL RECEIVE A LINK TO THE VOLUNTEER FORM SHORTLY \n 
    0. Back`;;
  }
  else if (text === "4") {
    // Calculate the amount to be paid
    const amount = 100; // Example amount

    // Construct STK Push request
    const stkPushPayload = {
      BusinessShortCode: "YOUR_BUSINESS_SHORTCODE",
      Password: "YOUR_ENCODED_PASSWORD",
      Timestamp: "YOUR_TIMESTAMP",
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: "YOUR_PAYBILL_NUMBER",
      PhoneNumber: phoneNumber,
      CallBackURL: "YOUR_CALLBACK_URL",
      AccountReference: "YOUR_ACCOUNT_REFERENCE",
      TransactionDesc: "Payment for donation",
    };

    try {
      const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        stkPushPayload,
        {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN", // Your OAuth access token
          },
        }
      );

      console.log("STK Push response:", response.data);

      // Handle the response and provide USSD feedback
      response = `CON You will receive an M-PESA payment prompt shortly\n`;
    } catch (error) {
      console.error("STK Push error:", error);

      // Handle the error and provide USSD feedback
      response = `CON Failed to initiate M-PESA payment\n`;
    }
  // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
