import React from "react";
import { useState } from "react";
import { API_URL } from "../../constants/constants";
import { showToast } from "../utils/toast";
import axios from "axios";

const CombineRule = ({ rules, fetchRules }) => {
  const [selectedRuleName, setSelectedRuleName] = useState(""); // old rule name
  const [ruleName, setRuleName] = useState(""); // new rule name
  const [combineString, setCombineString] = useState(""); //new rule string
  const [operator, setOperator] = useState("");

  const handleRuleName = (e) => {
    setSelectedRuleName(e.target.value);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!ruleName || !combineString || !operator || !selectedRuleName) {
      showToast("Please fill in all the fields to combine.", "error");
      return;
    }
  
    try {
      let old_string = await axios.get(`${API_URL}/api/rules/getone?ruleName=${selectedRuleName}`);
      console.log(old_string)
      let new_string = String(old_string.data.ruleString) + " " + String(operator) + " " + String(combineString);

      console.log("new string :")

      showToast("Creating the rule", "loading");
  
      let resp = await axios.post(`${API_URL}/api/rules/create`, {
        ruleName,
        ruleString : new_string,
      });

      console.log(resp)
      
      showToast("", "dismiss");
      showToast("Saved Rule to database", "success");
  
      fetchRules();
      setRuleName("");
      setCombineString("");
    } catch (error) {
      showToast("", "dismiss");
      let errorMessage = error.response?.data?.error || error.message;
      showToast(errorMessage, "error");
      console.log("Error creating rule:", errorMessage);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-80 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-800"
    >
      <h1 className="text-white text-xl font-bold">Combine Rules</h1>

      <div className="w-full p-1">
        <input
          type="text"
          placeholder="New Rule Name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="w-full p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600"
        />
      </div>

      <div className="w-full flex flex-row justify-around p-1 font-nunito text-white">
        <select
          value={selectedRuleName}
          onChange={handleRuleName}
          className="px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600"
        >
          <option value="">Select Previous rule</option>
          {rules.map((rule, index) => (
            <option key={index} value={rule.ruleName}>
              {rule.ruleName}
            </option>
          ))}
        </select>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="w-44 px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600"
        >
          <option value="">Select operator</option>

          <option value="AND"> AND </option>
          <option value="OR"> OR </option>
        </select>
      </div>

      <div className="w-full p-1">
        <textarea
          placeholder={`Enter Rule string : ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)`}
          value={combineString}
          onChange={(e) => setCombineString(e.target.value)}
          className="w-full p-2 h-28 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-sky-500 to-purple-900 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
          Combine
        </button>
      </div>
    </form>
  );
};

export default CombineRule;
