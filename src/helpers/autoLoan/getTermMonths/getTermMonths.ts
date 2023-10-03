const getTermMonths = ({
  payment,
  loanAmount,
  monthlyRate,
}: {
  payment: number;
  loanAmount: number;
  monthlyRate: number;
}): number => {
  const numerator = Math.log(payment / (payment - loanAmount * monthlyRate));
  const denominator = Math.log(1 + monthlyRate);
  return Number(Math.round(numerator / denominator));
};
export default getTermMonths;
