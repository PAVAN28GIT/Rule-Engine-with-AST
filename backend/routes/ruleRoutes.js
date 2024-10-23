const express = require('express');
const { createRule, evaluateRule } = require('../controllers/ruleController');

const router = express.Router();

// Route to create a new rule
router.post('/create', createRule);

// Route to evaluate rule with user data
router.post('/evaluate', evaluateRule);

module.exports = router;