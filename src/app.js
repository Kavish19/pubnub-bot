const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get('/api/botuser', (req,res)=> {

  res.send("Hi there, I am Max - your virtual assistant from ABC wallet How can I help you ?\n Type 1 for Last transaction details.\n Type 2 for Statement \n Type 3 to know more about our Value Added Services  \n Type 4 to talk to a real agent");
    

})

app.post("/api/botuser", (req, res) => {
  var inboundPayload = req.body;
  console.log("inboundPayload", inboundPayload);
  var message = inboundPayload.payload.payload.text;
  var senderPhoneNumber = inboundPayload.payload.sender.phone;
  var botresponse = "";

  if (!message) {
    botresponse =
      "Hi there, I am Max- your virtual assistant from ABC wallet How can I help you? \n Type 1 for Last transaction details. \n Type 2 for Statement \n Type 3 to know more about our Value Added Services  \n Type 4 to talk to a real agent";
    res.send(botresponse);
  } else if (message == 1) {
    botresponse =
      "Your last transaction from you ABC wallet was $10 debited towards SaveDogs foundation on 11th March, 2020 \n Type 'menu' to go back to the main menu";
    res.send(botresponse);
  } else if (message == 2) {
    botresponse =
      "Please enter the time line you need the statement for, in the format- ddmmyyyy-ddmmyyyy. For eg, if you need statement from 11th feb to 11th march, 2020. Please type in: 11022020-11032020 \n Type 'Menu' to go back to the main menu";
    res.send(botresponse);
  } else if (message == 3) {
    botresponse =
      "We have introduced PostPaid wallet, where you first use the money and pay back later. Follow this link to read more: http://tc.im/w52ev \n Type 'Menu' to go back to the main menu";
    res.send(botresponse);
  } else if (message == 4) {
    botresponse =
      "An agent will shortly take over this conversation. The wait time is 1 minute. \n Type 'Max' to continue conversation with me:";
    res.send(botresponse);
  } else {
    res.send("Wrong Input");
  }

  var request = require("request");
  var options = {
    method: "POST",
    url: "https://api.gupshup.io/sm/api/v1/msg",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      apikey: "092707e829664994c90f5e8430f818ad"
    },
    form: {
      channel: "whatsapp",
      source: "918452850482",
      destination: senderPhoneNumber,
      "src.name": "Jeet20",
      "message.payload": botresponse
    }
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
});

// if(message=== "1") {
//     res.send("<h3>Your last transaction from you ABC wallet was $10 debited towards SaveDogs foundation on 11th March, 2020 <br> Type 'menu' to go back to the main menu </h3>");
// }
// else if(message==="2"){
//     res.send("<h3>Please enter the time line you need the statement for, in the format- ddmmyyyy-ddmmyyyy. For eg, if you need statement from 11th feb to 11th march, 2020. Please type in: 11022020-11032020 <br> Type 'Menu' to go back to the main menu</h3>");
// }
// else if(message==="3"){
//     res.send("<h3>We have introduced PostPaid wallet, where you first use the money and pay back later. Follow this link to read more: http://tc.im/w52ev <br> Type 'Menu' to go back to the main menu</h3>");
// }
// else if(message==="4"){
//     res.send("<h3>An agent will shortly take over this conversation. The wait time is 1 minute. <br> Type 'Max' to continue conversation with me:</h3>");
// }
// else{
//     res.send("<h3>Wrong Input</h3>");
// }

app.listen(port, console.log("Server started on port " + port));
