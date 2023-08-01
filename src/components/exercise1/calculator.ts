const Calculator: (x: number, y: number) => number = (x: number, y: number) => {
  let result = 0;
  let sign = 1;

  if (x < 0 || y < 0) {
    sign = -sign;
  }

  for (let i = 0; i < Math.abs(y); i++) {
    result += Math.abs(x);
  }

  return result * sign;
};

export default Calculator;
