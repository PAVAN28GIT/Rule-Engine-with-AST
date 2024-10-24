import React from "react";

const CombineRule = ({rules}) => {
  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-80 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-800">
  
      <h1 className="text-white text-xl font-bold">Combine Rules</h1>

      <div className="w-full p-1">
        <input
          type="text"
          placeholder="New Rule Name"
          className="w-full p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600"
        />
      </div>

      <div className="w-full p-1">
        <select className="w-full p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600">
          <option value="" disabled selected>
            Select an Existing Rule
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
      </div>
      <div className="w-full p-1">
        <textarea
          placeholder="New rule string to combine"
          className="w-full p-2 h-20 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-sky-500 to-purple-900 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
          Combine
        </button>
      </div>
    </div>
  );
};

export default CombineRule;
