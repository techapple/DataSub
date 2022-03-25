const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

const utils = require('./utils/utils.js');

const STARTED = 200;

const PORT = process.env.PORT || 3030;
const Card = require('./models/Card')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router();

const addCard = utils.addCardWrapper(Card);

async function start() {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/Bank',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    app.get("/", (req, res) => {
      res.send("I am bank");
    });

    router.get('/', function(req, res) {
      res.json({
        message: 'API Initialized!',
        status: STARTED
      });
    });

    // Populate with random cards
    router.route('/populate')
    .get(function(req, res) {
      let i = 0;
      for(i = 0; i < 50; i++) {
        addCard({
          cardNumber: utils.randomCardNum(),
          expDate: "12/24",
          cvv: 123,
          amount: i * 100,
        });
      }
      res.json({
        message: `Populated ${i} cards.`,
      });
    })

    // Get all cards from DB
    router.route('/cards')
    .get((req, res) => utils.dbExec(Card, "find", req, res));

    // Remove cards from DB
    router.route('/remove-cards')
    .get((req, res) => utils.dbExec(Card, "deleteMany", req, res));

    // New Card to DB
    router.route('/add-card')
    .post(function(req, res) {
      var card = new Card();

      card.CardName = req.body.CardName;
      card.CardNumber = req.body.CardNumber;
      card.ExpDate = req.body.ExpDate;
      card.Cvv = req.body.Cvv;
      card.Amount = req.body.Amount;

      card.save(function(err, item) {
        if(err)
          return res.send(err);
        res.json({
          message: 'Card successfully added!',
          RequestId: item.id,
          Amount: item.Amount
        });
      });
    });

    app.use(cors({
      origin: "http://localhost:3000"
    }));

    app.use('/api', router);

    app.listen(PORT, () => {
      console.log('Server has been started...')
    })

  }
  catch
    (e) {
    console.log(e)
  }
}

start();