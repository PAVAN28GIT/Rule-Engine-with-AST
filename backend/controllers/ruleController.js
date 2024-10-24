const Rule = require("../models/Rule");
const { checkSyntax, parseRule , evaluateAST } = require("../services/ruleService");


// API logic  to accept rule string and generate AST
const createRules = async (req, res) => {
  try {
    console.log("Received in backend", req.body);

    const { ruleName, ruleString } = req.body;

    const syntaxCheck = checkSyntax(ruleString);
    if (!syntaxCheck.valid) {
      console.log("Syntax error detected:", syntaxCheck.error);
      return res.status(400).json({ error: syntaxCheck.error });
    }
    const ast = parseRule(ruleString); 
    if (ast === null) {
      return res.status(400).json({ error: "AST was not created. Check your syntax." });
    }

    console.log("Saving rule to the database");
    const newRule = new Rule({ ruleName, ruleString, ast });
    await newRule.save();
    
    console.log("Rule saved to database", ast);
    res.status(201).json(newRule);

  } catch (error) {
    // Send generic error response
    console.error("Error creating rule:", error.message);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};


// API logic to evaluate the AST with user input
const evaluateRule = async (req, res) => {
  try {
    const { ruleName, userData } = req.body;
    const rule = await Rule.findOne({ ruleName });

    if (!rule) return res.status(400).json({ message: "Rule not found" });

    const result = evaluateAST(rule.ast, userData);
    res.status(200).json({ match: result });
  } catch (error) {
    res.status(500).json({ message: "Error evaluating rule", error });
  }
};


const getRule = async(req, res)=>{
  try{

    const rules = await Rule.find();
    res.status(200).json(rules);
  }catch(error){
    res.status(500).json({ message: "Error retrieving rules", error });
  }
}


module.exports = { createRules, evaluateRule, getRule};