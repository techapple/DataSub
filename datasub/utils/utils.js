module.exports = {
  randomCardNum: () => {
    let res = '';
    for(let i = 0; i < 16; i++) {
      let r = (Math.round(Math.random() * 10) - 1).toString()
      res += Math.abs(r);
    }
    return res;
  },

  addCardWrapper: card => ({cardNumber, expDate, cvv, amount}) => {
    card.create(
      {
        CardNumber: cardNumber,
        ExpDate: expDate,
        Cvv: cvv,
        Amount: amount,
      },
      function(err, res) {
        if(err) {
          return res.status(400).send({ success: false, err });
        } else {
          console.log(`Card ${cardNumber} Successfully saved`);
        }
      }
    );
  },
  dbExec: (model, operation, req, res) => {
    model[operation](function(err, items) {
      if(err)
        res.send(err);
      res.json(items)
    });
  }
}