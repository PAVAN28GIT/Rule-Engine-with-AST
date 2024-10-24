import React, { useEffect } from 'react'
import { useState } from 'react';
import { API_URL } from '../../constants/constants';
import axios from 'axios';
import { showToast } from '../utils/toast';

const UpdateRule = ({ rules, fetchRules }) => {
  const [selectedRuleName, setSelectedRuleName] = useState(""); // old rule name
  const [ruleString, setRuleString] = useState("");
  const [placeholderString, setPlaceholderString] = useState("");

  const handleRuleName = (e) => {
    setSelectedRuleName(e.target.value);
  };

  useEffect(() => {
    const fetchOldRuleString = async () => {
      if (selectedRuleName) {
        try {
          let old_string = await axios.get(`${API_URL}/api/rules/getone?ruleName=${selectedRuleName}`);
          setPlaceholderString(old_string.data.ruleString);
        } catch (error) {
          console.error("Error fetching rule string:", error);
        }
      }
    };
    fetchOldRuleString();
  }, [selectedRuleName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRuleName || !ruleString) {
      showToast("Please fill in both fields to update Rules", "error");
      return;
    }

    try {
      showToast("Updating the rule", "loading");

      let resp = await axios.put(`${API_URL}/api/rules/update`, {
        ruleName: selectedRuleName,
        ruleString,
      });

      showToast("", "dismiss");
      showToast("Updated Rule in database", "success");

      fetchRules();
    } catch (error) {
      showToast("", "dismiss");
      let errorMessage = error.response?.data?.error || error.message;
      showToast(errorMessage, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-auto sm:h-80 rounded-xl px-4 py-6 sm:py-0 flex flex-col justify-evenly shadow-lg border-2 border-sky-900"
    >
      <h1 className="text-white text-lg sm:text-xl font-bold">Update Rule</h1>

      <div className="w-full p-2 text-white">
        <select
          value={selectedRuleName}
          onChange={handleRuleName}
          className="w-full px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600"
        >
          <option value="">Select Previous Rule</option>
          {rules.map((rule, index) => (
            <option key={index} value={rule.ruleName}>
              {rule.ruleName}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full p-1">
        <textarea
          placeholder={placeholderString || "Select Rule to See the previous string"}
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          className="w-full p-2 h-24 sm:h-28 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>

      <div className="flex justify-center sm:justify-end">
        <button className="w-full sm:w-1/3 p-2 text-lg sm:text-xl font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-800 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateRule;
