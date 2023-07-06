const express = require('express');

const { getAll, add } = require('../data/question');

const router = express.Router();

// Get all stored responses and their question and next question
router.get('/', async (req, res, next) => {
  try {
    const events = await getAll();
    setTimeout(()=>res.json(events), 2000);
  } catch (error) {
    next(error);
  }
});

// Post a question response and get next question
router.post('/:questionId', async (req, res, next) => {
  const data = req.body;

  try {
    await add(req.params.questionId, data.response);
    const events = await getAll();
    res.status(201).json(events);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
