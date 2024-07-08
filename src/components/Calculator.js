import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [secondOperand, setSecondOperand] = useState(false);

  const [theme, setTheme] = useState("light");
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    if (["+", "-", "*", "÷"].includes(value)) {
      handleOperatorClick(value);
      return;
    }
    switch (value) {
      case "C":
        clearDisplay();
        break;

      case "=":
        equalClick();
        break;

      case "+/-":
        plusMinusSign();
        break;

      case ".":
        decimal();
        break;

      case "x!":
        factorial();
        break;

      case "Clear History":
        clearHistory();
        break;

      case "sin":
      case "cos":
      case "tan":
      case "sinh":
      case "cosh":
      case "tanh":
      case "ln":
      case "log10":
      case "x^2":
      case "x^3":
      case "x^y":
      case "e^x":
      case "10^x":
      case "2√x":
      case "3√x":
      case "y√x":
      case "π":
        specialCLick(value);
        break;
      default:
        symbol(value);
    }
  };
  const handleOperatorClick = (nextOperator) => {
    const currInp = parseFloat(displayValue);

    switch (nextOperator) {
      case "+":
      case "-":
      case "*":
        if (operator && secondOperand) {
          setOperator(nextOperator);
          return;
        }
        if (firstOperand === null) {
          setFirstOperand(currInp);
        } else if (operator) {
          const result = provideOutput(operator, firstOperand, nextOperator);
          setDisplayValue(result.toString());
          setFirstOperand(result);
        }
        setOperator(nextOperator);
        setSecondOperand(true);
        break;
      case "÷":
        divideClick();
        break;
      default:
        break;
    }
  };
  const equalClick = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(displayValue);
      const result = provideOutput(operator, firstOperand, secondOperand);
      setDisplayValue(result.toString());
      setFirstOperand(result);
      setOperator(null);
      setSecondOperand(false);

      const newHistoryItem = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
      setHistory((prevHistory) => [...prevHistory, newHistoryItem]);
    }
  };

  const provideOutput = (opr, value1, value2) => {
    switch (opr) {
      case "+":
        return value1 + value2;
      case "-":
        return value1 - value2;
      case "*":
        return value1 * value2;
      case "÷":
        return value1 / value2;
      default:
        return value2;
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstOperand(null);
    setSecondOperand(false);
  };

  const plusMinusSign = () => {
    setDisplayValue((prevValue) => (parseFloat(prevValue) * -1).toString());
  };

  const decimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const factorial = () => {
    const num = parseFloat(displayValue);
    if (num < 0) {
      setDisplayValue("Error");
      return;
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    setDisplayValue(result.toString());
    setSecondOperand(true);
  };

  const specialCLick = (value) => {
    const currInp = parseFloat(displayValue);

    switch (value) {
      case "sin":
        setDisplayValue(Math.sin((currInp * Math.PI) / 180).toFixed(8));
        break;
      case "cos":
        setDisplayValue(Math.cos((currInp * Math.PI) / 180).toFixed(8));
        break;
      case "tan":
        setDisplayValue(Math.tan((currInp * Math.PI) / 180).toFixed(8));
        break;
      case "sinh":
        setDisplayValue(Math.sinh(currInp.toString()));
        break;
      case "cosh":
        setDisplayValue(Math.cosh(currInp.toString()));
        break;
      case "tanh":
        setDisplayValue(Math.tanh(currInp.toString()));
        break;
      case "ln":
        setDisplayValue(Math.ln(currInp.toString()));
        break;
      case "log10":
        setDisplayValue(Math.log10(currInp.toString()));
        break;
      case "x^2":
        setDisplayValue(Math.pow(currInp, 2).toString());
        break;
      case "x^3":
        setDisplayValue(Math.pow(currInp, 3).toString());
        break;
      case "x^y":
        // setDisplayValue(Math.exp(currInp).toString());
        break;
      case "e^x":
        setDisplayValue(Math.exp(currInp).toString());
        break;
      case "10^x":
        setDisplayValue(Math.exp(10, currInp).toString());
        break;
      case "2√x":
        setDisplayValue(Math.sqrt(currInp).toString());
        break;
      case "3√x":
        setDisplayValue(Math.cqrt(currInp).toString());
        break;
      case "y√x":
        break;
      case "π":
        setDisplayValue(Math.PI.toString());
        break;
      default:
        break;
    }
    setSecondOperand(true);
  };
  const symbol = (value) => {
    if (secondOperand) {
      setDisplayValue(value);
      setSecondOperand(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const divideClick = () => {
    const currInp = parseFloat(displayValue);
    if (operator && secondOperand) {
      setOperator("÷");
      return;
    }
    if (firstOperand === null) {
      setFirstOperand(currInp);
    } else if (operator) {
      const result = provideOutput(operator, firstOperand, secondOperand);
      setDisplayValue(result.toString());
      setFirstOperand(result);
    }
    setOperator("÷");
    setSecondOperand(true);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const buttons = [
    "(",
    ")",
    "mc",
    "m+",
    "m-",
    "mr",
    "C",
    "+/-",
    "%",
    "÷",
    "2nd",
    "x^2",
    "x^3",
    "x^y",
    "e^x",
    "10^x",
    "7",
    "8",
    "9",
    "*",
    "1/x",
    "2√x",
    "3√x",
    "y√x",
    "ln",
    "log10",
    "4",
    "5",
    "6",
    "-",
    "x!",
    "sin",
    "cos",
    "tan",
    "e",
    "EE",
    "1",
    "2",
    "3",
    "+",
    "Rad",
    "sinh",
    "cosh",
    "tanh",
    "π",
    "Rand",
    "0",
    ".",
    "=",
    "Clear History",
  ];

  const getButtonClassName = (value) => {
    switch (value) {
      case "C":
        return "clear";
      case "+/-":
        return "plus-minus";
      case "0":
        return "Zero Number";
      case "Rad":
        return "rad-btm-lgt";
      case "=":
        return "eql-btm-rgt yellow operator";
      case "+":
      case "-":
      case "*":
      case "÷":
        return "yellow operator";
      case "Clear History":
        return "clear-history";
      default:
        return !isNaN(value) || value === "." ? "number" : "";
    }
  };
  return (
    <div className="calculator">
      <div className="dots">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>

      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>

      <Display value={displayValue} />

      <div className="history">
        {history.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div className="buttons">
        {buttons.map((value, index) => (
          <Button
            key={index}
            value={value}
            className={getButtonClassName(value)}
            onClick={() => handleButtonClick(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
