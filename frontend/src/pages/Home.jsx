import React from "react";
import CreateRule from "../components/CreateRule";
import CombineRule from "../components/CombineRule";
import { UpdateRule } from "../components/UpdateRule";
import EvaluateRules from "../components/EvaluateRules";
import Rules from "../components/Rules";

const Home = () => {
  return (
    <div className="bg-zinc-950 flex w-full gap-4 p-10 h-full relative overflow-y-auto font-nunito">
      <div className="w-3/5 h-full">
        <CreateRule />
        <CombineRule />
        <UpdateRule />
      </div>

      <div className="w-2/6 h-full fixed m-5 right-2 top-5">
        <Rules />
        <EvaluateRules />
      </div>
    </div>
  );
};

export default Home;
