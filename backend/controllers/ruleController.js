const Rule = require("../models/Rule");
const { Parser } = require('expr-eval'); 

const parser = new Parser(); // Initialize parser


const createRules = async (req, res) => {
  try {
    console.log("Received in backend", req.body);

    const { ruleName, ruleString } = req.body;

    const cleanedRuleString = `"${ruleString.trim()}"`;
    console.log("Cleaned rule string:", cleanedRuleString);


    let ast;
    try {
      ast = parser.parse(cleanedRuleString);  // Parse rule into an AST
    } catch (parseError) {
      console.error("Syntax error detected:", parseError.message);
      return res.status(400).json({ error: "Invalid syntax: " + parseError.message });
    }

    console.log("Saving rule to the database");
    const newRule = new Rule({ ruleName, ruleString, ast });
    await newRule.save();
    
    console.log("Rule saved to database");
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
    console.log("Received in backend", userData);
    const rule = await Rule.findOne({ ruleName });

    if (!rule) return res.status(400).json({ message: "Rule not found" });

    const ast = parser.parse(rule.ruleString); // Re-parse the rule string
    const result = ast.evaluate(userData);  

 
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

const getOneRule = async (req, res) => {
  try {
    let { ruleName } = req.query; // change from req.body to req.query
    const rules = await Rule.findOne({ ruleName });

    if (!rules) return res.status(400).json({ message: "Rule not found" });
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving rules", error });
  }
};

const updaterule = async (req, res) => {
  try {
    const { ruleName, ruleString } = req.body;

    // Find the existing rule by ruleName
    const existingRule = await Rule.findOne({ ruleName });
    if (!existingRule) {
      return res.status(404).json({ error: "Rule not found." });
    }

    let ast;
    try {
      ast = parser.parse(ruleString);  // Parse rule into an AST
    } catch (parseError) {
      console.log("Syntax error detected:", parseError.message);
      return res.status(400).json({ error: "Invalid syntax: " + parseError.message });
    }

    // Update the rule in the database
    existingRule.ruleString = ruleString;
    existingRule.ast = ast;
    await existingRule.save();


    console.log("Rule updated in database", existingRule);
    res.status(200).json(existingRule);

  } catch (error) {
    console.error("Error updating rule:", error.message);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};


module.exports = { createRules, evaluateRule, getRule, getOneRule , updaterule};