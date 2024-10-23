// handling API logic

const Rule = require('../models/Rule');
import { parseRule , evaluateAST } from '../services/ruleService';


// Create a new rule (API to accept rule string and generate AST)
const createRule = async (req, res) => {
    try {
      const { ruleName, ruleString } = req.body;
      const ast = parseRule(ruleString);  // Parse rule string into AST
  
      const newRule = new Rule({ ruleName, ruleString, ast });
      await newRule.save();
  
      res.status(201).json(newRule);
    } catch (error) {
      res.status(500).json({ message: 'Error creating rule', error });
    }
  };
  

// Evaluate rule (API to evaluate the AST with user input)
const evaluateRule = async (req, res) => {
    try {
      const { ruleName, userData } = req.body;
      const rule = await Rule.findOne({ ruleName });
      
      if (!rule) return res.status(404).json({ message: 'Rule not found' });
      
      const result = evaluateAST(rule.ast, userData);
      res.status(200).json({ match: result });
    } catch (error) {
      res.status(500).json({ message: 'Error evaluating rule', error });
    }
};


module.exports = {createRule , evaluateRule};