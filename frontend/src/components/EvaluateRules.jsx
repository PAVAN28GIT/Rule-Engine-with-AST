import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../constants/constants";
import { showToast } from "../utils/toast";

const EvaluateRules = ({ rules }) => {
  const [selectedRuleName, setSelectedRuleName] = useState("");
  const [userdata, setUserData] = useState("");

  const handleRuleName = (e) => {
    setSelectedRuleName(e.target.value);
    console.log(e.target.value); // Log the current value for debugging
  };

  const handleUserData = (e) => {
    setUserData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (selectedRuleName === "" ) {
      showToast("Please select a rule", "error");
      return;
    }
    if (userdata === "" ) {
      showToast("Please Enter Json data to evaluate", "error");
      return;
    }
 

    try {
      showToast("Evaluating the rule", "loading");
      const parsedUserData = JSON.parse(userdata);

      const payload = {
        ruleName: selectedRuleName,
        userData: parsedUserData,
      };

      let response = await axios.post(`${API_URL}/api/rules/evaluate`, payload);
      showToast("", "dismiss");
      console.log(response);
      response.data.match
        ? showToast("Evaluate Success", "success")
        : showToast("Evaluation Failed", "error");

    } catch (error) {
      showToast("", "dismiss");
      showToast(error.message, "error");
      console.log("Error evaluating rule:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b py-3 from-zinc-800 to-zinc-900 mt-5 h-auto sm:h-60 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-500"
    >
      <h1 className="text-white text-xl sm:text-2xl font-bold">Evaluate Rule</h1>
      
      <div className="w-full p-1">
        <textarea
          value={userdata}
          onChange={handleUserData}
          placeholder={`Enter JSON data example: {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`}
          className="w-full p-2 h-24 sm:h-20 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="w-full sm:w-auto font-nunito text-white">
          <select
            id="ruleDropdown"
            value={selectedRuleName}
            onChange={handleRuleName}
            className="w-full sm:w-44 px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600"
          >
            <option value="">Select a rule</option>
            {rules.map((rule, index) => (
              <option key={index} value={rule.ruleName}>
                {rule.ruleName}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm sm:text-base">Selected Rule: {selectedRuleName}</p>
        </div>

        <button
          type="submit"
          className="w-full sm:w-1/3 h-12 px-2 text-lg sm:text-xl font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-800 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out"
        >
          Evaluate
        </button>
      </div>
    </form>
  );
};

export default EvaluateRules;
