import React, { useState } from "react";
import "./App.css";

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];

const OPERATION = {
  multiply: "multiply",
  percent: "percent",
  divide: "divide",
  subtract: "subtract",
  add: "add",
};

const Button = ({ value, onClick, large, color }) => {
  return (
    <button
      className={`button ${large ? "span-2" : ""}`}
      style={{ backgroundColor: color ? color : "rgb(119, 118, 118)" }}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

const App = () => {
  const [value, setValue] = useState("0");
  const [operation, setOperation] = useState(null);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const clear = () => {
    setValue("0");
    setOperation(null);
    setNum1(0);
    setNum2(0);
  };

  const flipSign = () => {
    setValue((Number(value) * -1).toString());
  };

  const onOperationPress = (button) => {
    const num = operation ? num2 : num1;
    switch (button) {
      case "%":
        let result = num / 100;
        setValue(result.toString());
        break;
      case "/":
        setOperation(OPERATION.divide);
        break;
      case "x":
        setOperation(OPERATION.multiply);
        break;
      case "-":
        setOperation(OPERATION.subtract);
        break;
      case "+":
        setOperation(OPERATION.add);
        break;
      case ".":
        // check if not already a fraction, i.e. a whole number
        if (num % 1 === 0) {
          setValue(num.toString() + ".");
        }
    }
  };

  const onNumberPress = (num) => {
    let result = 0;
    const decimal = value[value.length - 1] === "."; // Check if in process of adding decimal

    if (operation) {
      const n2 = num2.toString();
      result = Number(`${n2}${decimal ? "." : ""}${num}`);
      setNum2(result);
    } else {
      const n1 = num1.toString();
      result = Number(`${n1}${decimal ? "." : ""}${num}`);
      setNum1(result);
    }

    setValue(result.toString());
  };

  const handleEquals = () => {
    let result = 0;
    console.log("equals", num1, num2);
    switch (operation) {
      case OPERATION.add:
        result = Number((num1 + num2).toFixed(6));
        break;
      case OPERATION.divide:
        if (num2 === 0) {
          result = "NaN";
        } else {
          result = num1 / num2;
        }
        break;
      case OPERATION.multiply:
        result = num1 * num2;
        break;
      case OPERATION.subtract:
        result = num1 - num2;
        break;
    }

    setValue(result.toString());
    setNum1(result);
  };

  return (
    <div className="app">
      {console.log("State:", num1, operation, num2)}
      <div className="calculator-container">
        <div className="buttons-container">
          <div className="display">{value}</div>
          <div className="top-ops">
            <Button value={"C"} onClick={clear} />
            <Button value={"+/-"} onClick={flipSign} />
            <Button value={"%"} onClick={onOperationPress} />
          </div>
          <div className="ops">
            <Button value={"/"} onClick={onOperationPress} color="orange" />
            <Button value={"x"} onClick={onOperationPress} color="orange" />
            <Button value={"-"} onClick={onOperationPress} color="orange" />
            <Button value={"+"} onClick={onOperationPress} color="orange" />
            <Button value={"="} onClick={handleEquals} color="orange" />
          </div>
          <div className="nums">
            <Button value={7} onClick={onNumberPress} />
            <Button value={8} onClick={onNumberPress} />
            <Button value={9} onClick={onNumberPress} />
            <Button value={4} onClick={onNumberPress} />
            <Button value={5} onClick={onNumberPress} />
            <Button value={6} onClick={onNumberPress} />
            <Button value={1} onClick={onNumberPress} />
            <Button value={2} onClick={onNumberPress} />
            <Button value={3} onClick={onNumberPress} />
            <Button value={0} onClick={onNumberPress} large />
            <Button value={"."} onClick={onOperationPress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
