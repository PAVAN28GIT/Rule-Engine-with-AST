import React, { useEffect } from 'react'
import { useState } from 'react';
import { API_URL } from '../../constants/constants';
import axios from 'axios';
import { showToast } from '../utils/toast';


export const UpdateRule = ({rules,fetchRules}) => {

  const [selectedRuleName, setSelectedRuleName] = useState(""); // old rule name
  const [ruleString, setRuleString] = useState("");
  const [placeholderString, setPlaceholderString] = useState("")

  const handleRuleName = (e) => {
    setSelectedRuleName(e.target.value);
    console.log(selectedRuleName);
  };

  useEffect(() => {
    const fetchOldRuleString = async () => {
      if (selectedRuleName) {  // Only fetch if rule name is selected
        try {
          let old_string = await axios.get(`${API_URL}/api/rules/getone?ruleName=${selectedRuleName}`);
          setPlaceholderString(old_string.data.ruleString);
          console.log("Fetched rule string:", old_string.data.ruleString);
        } catch (error) {
          console.error("Error fetching rule string:", error);
        }
      }
    };
    
    fetchOldRuleString();
  }, [selectedRuleName]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
  
    if (!selectedRuleName || !ruleString) {
      showToast("Please fill in both fields to update Rules", "error");
      return;
    }
  
    try {
      // Show loading notification
      showToast("Updating the rule", "loading");
  
      let resp = await axios.put(`${API_URL}/api/rules/update`, {
        ruleName: selectedRuleName,  // Use selectedRuleName here
        ruleString,
      });
  
      // On success
      console.log(resp);
      showToast("", "dismiss");
      showToast("Updated Rule in database", "success");
  
      // Fetch updated rules and reset form fields
      fetchRules();
    
  
    } catch (error) {
      showToast("", "dismiss");
      let errorMessage = error.response?.data?.error || error.message;
      showToast(errorMessage, "error");
      console.log("Error updating rule:", errorMessage);
    }
  };
  


  return (
    <form 
    onSubmit={handleSubmit}
    className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-80 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-900">
    {/* Heading */}
    <h1 className="text-white text-xl font-bold">Update Rule</h1>
  
    {/* Dropdown to Select Existing Rule */}
    <div className='w-full p-2 text-white'>
        <select
          value={selectedRuleName}
          onChange={handleRuleName}
          className="w-full px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600"
        >
          <option value="">Select Previous rule</option>
          {rules.map((rule, index) => (
            <option key={index} value={rule.ruleName}>
              {rule.ruleName}
            </option>
          ))}
        </select>
    </div>
  
    {/* Text Area for New String Input */}
    <div className="w-full p-1">
        <textarea
          placeholder={placeholderString || "Select Rule to See the previous string"}
          value={ruleString } 
          onChange={(e) => setRuleString(e.target.value)}
          className="w-full p-2 h-28 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>
  
    {/* Update Button */}
    <div className="flex justify-end">
      <button className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-800 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
        Update
      </button>
    </div>
  </form>
  
  )
}
