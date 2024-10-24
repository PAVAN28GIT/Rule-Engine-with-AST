const express = require('express');
const { createRules, evaluateRule ,getRule} = require('../controllers/ruleController');

const router = express.Router();

// Route to create a new rule
router.post('/create', createRules);

// Route to evaluate rule with user data
router.post('/evaluate', evaluateRule);

router.get('/view' , getRule);

module.exports = router;