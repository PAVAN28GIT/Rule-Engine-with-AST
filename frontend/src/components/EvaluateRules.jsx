import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../constants/constants";
import { showToast } from "../utils/toast";


const EvaluateRules = ({ rules }) => {
  const [ruleName, setRuleName] = useState(null);
  const [userdata, setUserData] = useState("");

  const handleRuleName = (e) => {
    setRuleName(e.target.value);
  };

  const handleUserData = (e) => {
    setUserData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      showToast("Evaluating the rule", "loading");
      let response = await axios.post(`${API_URL}/api/rules/evaluate`, {
        ruleName,
        userdata,
      });

      console.log(response);
      showToast("", "dismiss");
      console.log(response.data.match); 

      showToast("Evaluate Success", "success");

      setRuleName(null); 
      setUserData(""); 
      
    } catch (error) {
      showToast("", "dismiss");
      let errorMessage = error.response?.data?.error || error.message;
      showToast(errorMessage, "error"); 
      console.log("Error evaluating rule:", errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-60 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-500">
      <h1 className="text-white text-xl font-bold">Evaluate Rule</h1>
      <div className="w-full p-1">
        <textarea
          value={userdata}
          onChange={handleUserData}
          placeholder={`Enter JSON data example : {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`}
          className="w-full p-2 h-20 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>

      <div className="flex justify-between">
        <select
          onChange={handleRuleName}
          className="w-44 px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600"
          value={ruleName}
        >
          <option value="" disabled>
            Select a Rule
          </option>
          {rules.length > 0 ? (
            rules.map((rule, index) => (
              <option key={index} value={rule.ruleName}>
                {rule.ruleName}
              </option>
            ))
          ) : (
            <option value="">No rule available</option>
          )}
        </select>

        <button 
          type="submit"
          className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-800 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
          Evaluate
        </button>
      </div>
    </form>
  );
};

export default EvaluateRules;
