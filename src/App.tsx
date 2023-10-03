import * as React from "react";
import { AutoLoan } from "./components";

const LOAN = {
  AUTO: "auto",
  MORTGAGE: "mortgage",
  STUDENT: "student",
  CREDIT_CARD: "credit_card",
} as const;
type LoanType = (typeof LOAN)[keyof typeof LOAN];

function App() {
  const [type, setType] = React.useState<LoanType>(LOAN.AUTO);
  const getLoanType = (val: string) => {
    switch (val) {
      case LOAN.AUTO:
        return LOAN.AUTO;
      case LOAN.CREDIT_CARD:
        return LOAN.CREDIT_CARD;
      case LOAN.MORTGAGE:
        return LOAN.MORTGAGE;
      default:
        return LOAN.STUDENT;
    }
  };
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="type">Loan Type</label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(getLoanType(e.target.value))}
        >
          <option>auto</option>
          <option>mortgage</option>
          <option>student</option>
          <option>credit card</option>
        </select>
      </div>
      {type === LOAN.AUTO && <AutoLoan />}
    </div>
  );
}

export default App;
