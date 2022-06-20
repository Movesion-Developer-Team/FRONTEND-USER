const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;

const Stripe = require("stripe");
const stripe = Stripe("pk_test_51L8ip2FfGn5fJOchgEPyBjBCF8Tvr0fCY8T2OWkT6syBvVUFAFumFe1DmsdwkyqJqjgagJo6M7l8RAlHxTZyU5UL00SD24xMCO");

const app = express();
app.use(bodyParser.json());
app.post("/create-payment-intent", (req, res) => {
  stripe.paymentIntents.create(
    {
      amount: parseInt(req.body.amount),
      currency: "usd",
      payment_method_types: ["card"],
    },
    function (err, paymentIntent) {
      if (err) {
        res.status(500).json(err.message);
      } else {
        res.status(201).json(paymentIntent);
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server ready on port ${4201}`));