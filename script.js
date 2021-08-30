/// Theme changer ///

const body = document.body;

themeOneChange = () => {
  body.classList.remove("theme-one", "theme-two", "theme-three");
  body.classList.add("theme-one");
};

themeTwoChange = () => {
  body.classList.remove("theme-one", "theme-two", "theme-three");
  body.classList.add("theme-two");
};

themeThreeChange = () => {
  body.classList.remove("theme-one", "theme-two", "theme-three");
  body.classList.add("theme-three");
};

/// Calculator ///

// whole calculator
const calculator = {
  displayValue: "0",
  firstOperand: null,
  key: null,
  secondOperand: false,
};

resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.secondOperand = false;
  calculator.key = null;
};

inputDigit = (digit) => {
  const { displayValue, secondOperand } = calculator;

  if (secondOperand === true) {
    calculator.displayValue = digit;
    calculator.secondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
};

updateDisplay = () => {
  const display = document.querySelector(".display");
  display.innerHTML = calculator.displayValue;
};

// del single character
delDigit = () => {
  const del = document.querySelector(".del");
  calculator.displayValue = calculator.displayValue.slice(0, -1);
};

inputDot = (dot) => {
  if (calculator.secondOperand === true) {
    calculator.displayValue = ".";
    calculator.secondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

handleKey = (nextOperator) => {
  const { firstOperand, displayValue, key } = calculator;
  const inputValue = parseFloat(displayValue);

  if (key && calculator.secondOperand) {
    calculator.key = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (key) {
    const result = calculate(firstOperand, inputValue, key);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.secondOperand = true;
  calculator.key = nextOperator;
};

calculate = (firstOperand, secondOperand, key) => {
  if (key === "+") {
    return firstOperand + secondOperand;
  } else if (key === "-") {
    return firstOperand - secondOperand;
  } else if (key === "*") {
    return firstOperand * secondOperand;
  } else if (key === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
};

updateDisplay();

const keys = document.querySelector(".buttons");
keys.addEventListener("click", (e) => {
  const { target } = e;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleKey(value);
      break;
    case "dot":
      inputDot(value);
      break;
    case "reset":
      resetCalculator();
      break;
    case "del":
      delDigit();
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
