import React from 'react'

const CreateRule = () => {
  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 mt-5 h-80 rounded-xl px-4 flex flex-col justify-evenly shadow-lg border-2 border-sky-800">

  <h1 className="text-white text-xl font-bold">Create Rule</h1>

  <div className="w-full p-1">
    <input
      type="text"
      placeholder="Rule Name"
      className="w-full p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600"
    />
  </div>

  <div className="w-full p-1">
    <textarea
        placeholder={`Enter Rule string : ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)`}

      className="w-full p-2 h-28 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-zinc-600 resize-none"
    />
  </div>

  <div className="flex justify-end">
    <button className="w-1/3 p-2 text-xl font-bold rounded-lg bg-gradient-to-r from-sky-500 to-purple-900 text-white hover:from-blue-400 hover:to-purple-500 transition duration-300 ease-in-out">
      Create Rule
    </button>
  </div>
</div>

  )
}

export default CreateRule