import React from "react";

const EvaluateRules = () => {
  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-60 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-500">
      <h1 className="text-white text-xl font-bold">Evaluate Rule</h1>
      <div className="w-full p-1">
        <textarea
          placeholder="Json data"
          className="w-full p-2 h-20 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>

      <div className="flex justify-between">
        <select className="w-44 px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600">
          <option value="" disabled selected>
            Select a Rule
          </option>
          <option value="rule1">Rule 1</option>
          <option value="rule2">Rule 2</option>
          <option value="rule3">Rule 3</option>
        </select>

        <button className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-800 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
          Evaluate
        </button>
      </div>
    </div>
  );
};

export default EvaluateRules;
