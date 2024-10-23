// handling API logic
const Rule = require("../models/Rule");
const { processRule, evaluateAST } = require("../services/ruleService");


// API logic  to accept rule string and generate AST
const createRule = async (req, res) => {
  try {
    console.log("recieved in backend");
    console.log(req.body);

    const { ruleName, ruleString } = req.body;
    const ast = processRule(ruleString); 

    const newRule = new Rule({ ruleName, ruleString, ast });
    await newRule.save();
    console.log("saved to database");
    console.log(ast);

    res.status(201).json(newRule);
  } catch (error) {
    res.status(500).json({ message: "Error creating rule", error: error.message });
  }
};

// API logic to evaluate the AST with user input
const evaluateRule = async (req, res) => {
  try {
    const { ruleName, userData } = req.body;
    const rule = await Rule.findOne({ ruleName });

    if (!rule) return res.status(404).json({ message: "Rule not found" });

    const result = evaluateAST(rule.ast, userData);
    res.status(200).json({ match: result });
  } catch (error) {
    res.status(500).json({ message: "Error evaluating rule", error });
  }
};


const getRule = async(req, res)=>{
  try{

    const rules = await Rule.find();
    if (rules.length === 0) {
      return res.status(404).json({ message: "No rules are created" });
    }
    res.status(200).json(rules);

  }catch(error){
    res.status(500).json({ message: "Error retrieving rules", error });
  }
}


module.exports = { createRule, evaluateRule };