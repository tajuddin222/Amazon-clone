const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")("sk_test_51IwloDSGByQzW6SVL8QyslHpapdmeFYxiAHrsEkDnE8qDvVJLSFJgvIAytXHiuVRWQ9zvHajLLPPAN3gufYRKu3W00QUZJ89zx")

//API

//App config
const app = express();

//middlewaews
app.use(cors({ origin: true}));
app.use(express.json());

//API routes
app.get('/', (request, response) => response.status(200).send('hello world'));
app.get('/taj', (request, response) => response.status(200).send('hello taj'));


app.post('./payments/create', async (request, response) => {
    const total = request.query.total; //you can use params
    
    console.log('payment request recieved for the amount >>>', total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,   //submits of currency
        currency: "usd",
    });
    // ok-created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//app.get('/taj', (request, response) => response.status(200).send('hello taj'))

//listen command
exports.api = functions.https.onRequest(app)

//example end point
//http://localhost:5001/app-30644/us-central1/api