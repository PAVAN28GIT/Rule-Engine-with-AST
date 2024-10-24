// Core business logic (AST parsing and evaluation)

function parseRule(ruleString) {
  // Base case
  if (ruleString.includes(">")) {
    const [field, value] = ruleString.split(" > ");
    return {
      type: "operand",
      field: field.trim(),
      operator: ">",
      value: parseInt(value.trim()),
    };
  }
  if (ruleString.includes("=")) {
    const [field, value] = ruleString.split(" = ");
    return {
      type: "operand",
      field: field.trim(),
      operator: "=",
      value: value.trim().replace(/'/g, ""),
    };
  }

  // Recursive case: handle AND/OR
  if (ruleString.includes("AND")) {
    const [left, right] = ruleString.split(" AND ");
    return {
      type: "operator",
      operator: "AND",
      left: parseRule(left),
      right: parseRule(right),
    };
  }
  if (ruleString.includes("OR")) {
    const [left, right] = ruleString.split(" OR ");
    return {
      type: "operator",
      operator: "OR",
      left: parseRule(left),
      right: parseRule(right),
    };
  }

  return null; // For cases where there's no valid parsing
}

function checkSyntax(ruleString) {
  try {
    // Check if the rule string is empty
    if (!ruleString || typeof ruleString !== 'string') {
      throw new Error('Invalid rule string: Rule cannot be empty and must be a string');
    }
    
    // Check for mismatched parentheses
    const openBrackets = (ruleString.match(/\(/g) || []).length;
    const closeBrackets = (ruleString.match(/\)/g) || []).length;
    
    if (openBrackets !== closeBrackets) {
      throw new Error('Syntax Error: Mismatched parentheses');
    }
    
    // Check for missing logical operators (AND/OR)
    if (!/AND|OR/.test(ruleString) && !ruleString.includes(">") && !ruleString.includes("=")) {
      throw new Error('Syntax Error: Rule must contain logical operators (AND/OR) or comparison operators.');
    }

    return { valid: true };  // If everything is valid
  
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Evaluate AST against user input
function evaluateAST(ast, userData) {
  if (ast.type === "operand") {
    const field = userData[ast.field];
    switch (ast.operator) {
      case ">":
        return field > ast.value;
      case "<":
        return field < ast.value;
      case "=":
        return field === ast.value;
      default:
        throw new Error("Unknown operator");
    }
  } else if (ast.type === "operator") {
    const leftResult = evaluateAST(ast.left, userData);
    const rightResult = evaluateAST(ast.right, userData);

    if (ast.operator === "AND") return leftResult && rightResult;
    if (ast.operator === "OR") return leftResult || rightResult;
  }
}

module.exports = { checkSyntax, parseRule, evaluateAST};