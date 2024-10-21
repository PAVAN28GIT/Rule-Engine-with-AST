import React from 'react'

export const UpdateRule = () => {
  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-80 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-500">
    {/* Heading */}
    <h1 className="text-white text-xl font-bold">Update Rule</h1>
  
    {/* Dropdown to Select Existing Rule */}
    <div className="w-full p-1">
      <select className="w-full p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-zinc-600">
        <option value="" disabled selected>Select an Existing Rule</option>
        <option value="rule1">Rule 1</option>
        <option value="rule2">Rule 2</option>
        <option value="rule3">Rule 3</option>
      </select>
    </div>
  
    {/* Text Area for New String Input */}
    <div className="w-full p-1">
      <textarea
        placeholder="Enter new rule string"
        className="w-full p-2 h-28 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
      />
    </div>
  
    {/* Update Button */}
    <div className="flex justify-end">
      <button className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-800 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
        Update
      </button>
    </div>
  </div>
  
  )
}
