import React, { useState , useEffect } from "react";
import CreateRule from "../components/CreateRule";
import CombineRule from "../components/CombineRule";
import UpdateRule  from "../components/UpdateRule";
import EvaluateRules from "../components/EvaluateRules";
import Rules from "../components/Rules";
import { showToast } from "../utils/toast";
import axios from "axios";
import { API_URL } from "../../constants/constants";

const Home = () => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      showToast("Loading Rules","loading")
      const response = await axios.get(`${API_URL}/api/rules/view`);
      setRules(response.data); // Set the fetched rules in state
      showToast("" , "dismiss");
    } catch (err) {
      showToast("" , "dismiss");
      showToast(err.message, "error");
    }
  };

  useEffect(() => {
    fetchRules();
  }, []); 

  return (
    <div className="bg-zinc-950 flex flex-col lg:flex-row w-full gap-4 p-5 lg:p-10 h-full relative overflow-y-auto font-nunito">
      <div className="w-full lg:w-3/5 h-full">
        <CreateRule fetchRules={fetchRules} />
        <CombineRule rules={rules} fetchRules={fetchRules} />
        <UpdateRule rules={rules} fetchRules={fetchRules} />
      </div>

      <div className="w-full lg:w-2/6 h-full lg:fixed lg:m-5 right-2 top-2">
        <Rules rules={rules} fetchRules={fetchRules} />
        <EvaluateRules rules={rules} />
      </div>

      <dialog
        id="my_modal_1"
        className="bg-cyan-100 w-full sm:w-2/3 lg:w-1/3 bg-gradient-to-r to-purple-400 from-sky-500 border-2 border-blue-300 p-8 rounded-xl"
      >
        <div className="modal-box space-y-3">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
            onClick={() => document.getElementById("my_modal_1").close()}
          >
            ✕
          </button>
          <h3
            id="modal_rule_name"
            className="font-extrabold font-nunito text-2xl sm:text-3xl lg:text-4xl"
          ></h3>
          <p id="modal_rule_string" className="font-bold"></p>
          <div className="modal-action">
            {/* Add any additional actions here */}
          </div>
        </div>
      </dialog>
    </div>
  );
};


export default Home;
