import { useState } from "react";

function LearnApp() {
  const [prevInput, setPrevInput] = useState(""); // Initialize as empty string
  const [nextInput, setNextInput] = useState(""); // Initialize as empty string
  const [operator, setOperator] = useState("");
  const [displayValue, setDisplayValue] = useState(""); // Controlled input state

  const buttons = [
    { type: "number", value: "9" },
    { type: "number", value: "8" },
    { type: "number", value: "7" },
    { type: "special", value: "C" }, // Clear button

    { type: "number", value: "6" },
    { type: "number", value: "5" },
    { type: "number", value: "4" },
    { type: "operator", value: "+" },

    { type: "number", value: "3" },
    { type: "number", value: "2" },
    { type: "number", value: "1" },
    { type: "operator", value: "-" },

    { type: "number", value: "0", span: 2 }, // Zero spans 2 columns
    { type: "operator", value: "*" },
    { type: "operator", value: "/" },

    { type: "special", value: "=" }, // Equals button spans full row
    { type: "special", value: "del" },
  ];

  function handleValues(value, type) {
    if (type === "number") {
      setNextInput((prev) => prev + value); // Add value to the nextInput
      setDisplayValue((prev) => prev + value); // Update the display
    } else if (type === "operator" && operator === "") {
      // Set the operator if it hasn't been set yet and nextInput is not empty
      setOperator(value);
      setPrevInput(nextInput); // Store the current input as prevInput
      setNextInput(""); // Reset nextInput for the next number
      setDisplayValue((prev) => prev + " " + value + " "); // Update the display with operator
    } else if (value === "C") {
      setPrevInput("");
      setNextInput("");
      setOperator("");
      setDisplayValue(""); // Clear display and states
    } else if (value === "del") {
      if (nextInput !== "") {
        // Case 1: Delete from nextInput
        setNextInput((prev) => prev.slice(0, -1));
        setDisplayValue((prev) => prev.slice(0, -1));
      } else if (operator !== "") {
        // Case 2: Transfer prevInput to nextInput when operator is deleted
        setOperator("");
        setNextInput(prevInput);
        setPrevInput(""); // Clear prevInput
        setDisplayValue(prevInput); // Update display value with prevInput
      }
    } else if (value === "=") {
      if (prevInput !== "" && nextInput !== "" && operator) {
        // If both inputs and operator are valid
        let result;
        const prevNumber = +prevInput;
        const nextNumber = +nextInput;

        // Perform the correct operation
        if (operator === "+") {
          result = prevNumber + nextNumber;
        } else if (operator === "-") {
          result = prevNumber - nextNumber;
        } else if (operator === "*") {
          result = prevNumber * nextNumber;
        } else if (operator === "/") {
          result = prevNumber / nextNumber;
        }

        // Set the result as the display value
        setDisplayValue(result.toString());
        setPrevInput(result.toString()); // Save the result as prevInput
        setNextInput(result.toString());
        setOperator(""); // Reset operator after calculation
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <div className="grid w-full max-w-3xl grid-cols-4 gap-2 rounded-lg bg-gray-800 p-8 shadow-lg">
        {/* Display Input */}
        <input
          className="col-span-4 rounded-lg bg-gray-900 p-3 text-right text-xl text-white"
          value={displayValue} // Controlled input
          readOnly
        />

        {/* Dynamically generate buttons */}
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleValues(btn.value, btn.type)}
            className={`w-full rounded-lg p-3 ${btn.type === "number" ? "bg-blue-700" : btn.type === "operator" ? "bg-yellow-600" : "bg-red-700"} ${btn.span ? `col-span-${btn.span}` : ""}`}
          >
            {btn.value}
          </button>
        ))}
      </div>
    </div>
  );
}
