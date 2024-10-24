import React, { useEffect, useState } from "react";

const Rules = ({rules,fetchRules}) => {
  // State to store rules

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
    <div className="bg-zinc-800 h-3/5 px-4 rounded-lg shadow-lg text-white overflow-auto border-2 border-sky-900 ">
      <h1 className="mb-2 text-2xl font-bold sticky top-0 bg-zinc-800 w-full p-3 z-10">
        Rules
      </h1>

      <div className="flex pt-2 flex-col gap-2 w-full relative">
        {rules.length > 0 ? (
          rules.map((rule, index) => (
            
            <button
              onClick={() => showRuleDialog(rule.ruleName, rule.ruleString)}
              key={index}
              className="p-2 px-5 bg-zinc-700 rounded-xl mx-2 hover:bg-slate-600"
            >
              {rule.ruleName}
            </button>
          ))
        ) : (
          <div>No rules available</div>
        )}
      </div>
    </div>
  );
};

export default Rules;
