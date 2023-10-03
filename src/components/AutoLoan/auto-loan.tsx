import * as React from "react";
import { getPaymentAmount, getTermMonths } from "../../helpers";

const AutoLoan = (): JSX.Element => {
  // const [type, setType] = React.useState("auto");
  const [loanAmount, setLoanAmount] = React.useState(0);
  const [apr, setApr] = React.useState(0.0);
  const [term, setTerm] = React.useState(0);
  const [payment, setPayment] = React.useState(0);
  const [isForPayment, setIsForPayment] = React.useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlyRate = apr && apr / 100 / 12;
    if (isForPayment && monthlyRate && loanAmount && term) {
      setPayment(getPaymentAmount({ loanAmount, monthlyRate, term }));
    } else if (payment && loanAmount && monthlyRate) {
      console.info({
        TERM: getTermMonths({ payment, loanAmount, monthlyRate }),
      });
      setTerm(getTermMonths({ payment, loanAmount, monthlyRate }));
    }
  };

  const handleRadioChange = () => {
    setIsForPayment(!isForPayment);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const val = e.target.value;
    const numVal = Number(e.target.value);
    switch (name) {
      case "amount":
        setLoanAmount(Number.isInteger(numVal) ? numVal : Math.round(numVal));
        break;
      case "apr":
        if (val.split(".")?.[1] ? val.split(".")[1].length < 3 : numVal) {
          setApr(numVal);
        }
        break;
      case "term":
        setTerm(Number.isInteger(numVal) ? numVal : Math.round(numVal));
        break;
      case "payment":
        setPayment(Number.isInteger(numVal) ? numVal : Math.round(numVal));
        break;
    }
  };
  return (
    <form data-testid="auto-loan" onSubmit={handleSubmit}>
      <h1>Auto Loan Calculator</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ margin: 0 }}>Calculate for:</p>
          <label>
            <input
              type="radio"
              value="Payment"
              checked={isForPayment}
              onChange={handleRadioChange}
            />
            Payment
          </label>
          <label>
            <input
              type="radio"
              value="Term"
              checked={!isForPayment}
              onChange={handleRadioChange}
            />
            Term
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="amount">Loan Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            onChange={handleChange}
            min={0}
            step={1}
            value={loanAmount}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="apr">Annual Percentage Rate (APR)</label>
          <input
            id="apr"
            name="apr"
            type="number"
            min={0}
            step={0.25}
            onChange={handleChange}
            value={apr}
          />
        </div>
        {isForPayment ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="term">Months in Term</label>
            <input
              id="term"
              name="term"
              type="number"
              min={1}
              onChange={handleChange}
              value={term}
            />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="payment">Payment Amount</label>
            <input
              id="payment"
              name="payment"
              type="number"
              onChange={handleChange}
              min={0}
              step={1}
              value={payment}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {isForPayment ? (
              <p>Monthly Payment: {payment}</p>
            ) : (
              <p>Months to paydown: {term}</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              height: "30px",
            }}
          >
            <button type="submit">calculate</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AutoLoan;
