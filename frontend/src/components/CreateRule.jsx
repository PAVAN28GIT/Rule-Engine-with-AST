import React from "react";
import { useState } from "react";
import axios from 'axios';


//import { API_URL } from "../../constants/constants.js";

const API_URL = "http://localhost:8000"

const CreateRule = () => {
 

  const [ruleName, setRuleName] = useState("");
  const [ruleString, setRuleString] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!ruleName || !ruleString) {
      alert("Please fill in both fields.");
      return;
    }
  
    try {
      console.log("sending to backend");
      const startTime = performance.now();
      
      // Send the data to the backend using Axios
      const response = await axios.post(`${API_URL}/api/rules/create`, {
        ruleName,
        ruleString,
      });
  
      const endTime = performance.now();
      console.log(`Request took ${endTime - startTime} ms`);
  
      alert("Rule created successfully");
      console.log("Response:", response.data);
  
      setRuleName("");
      setRuleString("");
    } catch (error) {
      console.error("Error creating rule:", error);
      alert("Failed to create rule");
    }
  };
  

  
  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-80 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-800">
      <h1 className="text-white text-xl font-bold">Create Rule</h1>

      <div className="w-full p-1">
        <input
          type="text"
          placeholder="Rule Name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="w-full p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600"
        />
      </div>

      <div className="w-full p-1">
        <textarea
          placeholder={`Enter Rule string : ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)`}
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          className="w-full p-2 h-28 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-sky-500 to-purple-900 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
          Create Rule
        </button>
      </div>
    </form>
  );
}

export default CreateRule;
