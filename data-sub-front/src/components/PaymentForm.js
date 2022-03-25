import React from "react";
import Card  from "elt-react-credit-cards";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatAmount,
  formatFormData, Fetcher
} from "../utils/utils";

import "elt-react-credit-cards/es/styles-compiled.css";

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.fetcher = new Fetcher();

    this.state = {
      number: "2342234223422343",
      name: "Oleg",
      expiry: "24/2024",
      cvc: "123",
      amount: "100",
      issuer: "",
      focused: "",
      formData: null
    };
  }

  handleCallback = ({issuer}, isValid) => {
    if(isValid) {
      this.setState({issuer});
    }
  };

  handleInputFocus = ({target}) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({target}) => {
    if(target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if(target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if(target.name === "cvc") {
      target.value = formatCVC(target.value);
    } else if(target.name === "amount") {
      target.value = formatAmount(target.value);
    }

    this.setState({[target.name]: target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const {issuer} = this.state;
    const formData = [...e.target.elements]
    .filter(d => d.name)
    .reduce((acc, d) => {
      acc[d.name] = d.value;
      return acc;
    }, {});

    this.fetcher.sendCard({
      CardName: formData.name,
      CardNumber: formData.number,
      ExpDate: formData.expiry,
      Cvv: formData.cvc,
      Amount: formData.amount,
    });

    this.setState({formData});
    // this.form.reset();
  };

  render() {
    const {name, number, expiry, cvc, focused, issuer, formData} = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form className="m-5"
            ref={c => (this.form = c)}
            onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                value={this.state.number}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                value={this.state.name}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d\d\d"
                    required
                    value={this.state.expiry}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    value={this.state.cvc}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="amount"
                className="form-control"
                placeholder="Amount"
                required
                value={this.state.amount}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <input type="hidden"
              name="issuer"
              value={issuer}/>
            <div className="form-actions">
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">

            </div>
          )}
        </div>
      </div>
    );
  }
}
