// Core business logic (AST parsing and evaluation)

// function that converts a rule string into an AST
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
}

// Evaluate the AST against user input
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

module.exports = { parseRule, evaluateAST };