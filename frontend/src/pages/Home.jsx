import React, { useState } from "react";
import CreateRule from "../components/CreateRule";
import CombineRule from "../components/CombineRule";
import { UpdateRule } from "../components/UpdateRule";
import EvaluateRules from "../components/EvaluateRules";
import Rules from "../components/Rules";
import { showToast } from "../utils/toast";
import axios from "axios";
import { API_URL } from "../../constants/constants";

const Home = () => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/rules/view`);
    
      setRules(response.data); // Set the fetched rules in state
    } catch (err) {
      showToast(err.message,'error')
    }
  };

  return (
    <div className="bg-zinc-950 flex w-full gap-4 p-10 h-full relative overflow-y-auto font-nunito">
      <div className="w-3/5 h-full">
        <CreateRule fetchRules={fetchRules} />
        <CombineRule rules={rules} />
        <UpdateRule />
      </div>

      <div className="w-2/6 h-full fixed m-5 right-2 top-5">
        <Rules rules={rules} fetchRules={fetchRules} />
        <EvaluateRules rules={rules} />
      </div>
    </div>
  );
};

export default Home;
