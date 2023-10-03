const getPaymentAmount = ({
  loanAmount,
  monthlyRate,
  term,
}: {
  loanAmount: number;
  monthlyRate: number;
  term: number;
}) => {
  const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term);
  const denominator = Math.pow(1 + monthlyRate, term) - 1;
  return Math.round(numerator / denominator);
};
export default getPaymentAmount;
