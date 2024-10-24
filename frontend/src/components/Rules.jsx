import React, { useEffect, useState } from "react";

const Rules = ({ rules, fetchRules }) => {
  // Fetch rules on component mount
  useEffect(() => {
    fetchRules();
  }, []);

  const showRuleDialog = (ruleName, ruleString) => {
    const modal = document.getElementById('my_modal_1');
    // Set the content in the modal
    document.getElementById('modal_rule_name').innerText = ruleName;
    document.getElementById('modal_rule_string').innerText = ruleString;
    modal.showModal();
  };

  return (
    <div className="bg-zinc-800 h-60 sm:h-3/5 px-4 rounded-lg shadow-lg text-white overflow-auto border-2 border-sky-900">
      <h1 className="mb-1 text-xl sm:text-2xl font-bold sticky top-0 bg-zinc-800 w-full p-3 z-10">
        Rules
      </h1>

      <div className="flex pt-2 flex-col gap-2 w-full relative">
        {rules.length > 0 ? (
          rules.map((rule, index) => (
            <button
              onClick={() => showRuleDialog(rule.ruleName, rule.ruleString)}
              key={index}
              className="p-2 px-4 sm:px-5 bg-zinc-700 rounded-lg mx-1 sm:mx-2 hover:bg-slate-600 text-sm sm:text-base"
            >
              {rule.ruleName}
            </button>
          ))
        ) : (
          <div className="text-sm sm:text-base"> No rules available</div>
        )}
      </div>
    </div>
  );
};

export default Rules;
