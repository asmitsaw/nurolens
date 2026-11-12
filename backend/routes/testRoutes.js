const express = require('express');
const router = express.Router();

const {
  submitMMSE,
  submitMoCA,
  submitClock,
  submitTMT,
  getTestHistory,
  getLatestScores
} = require('../controllers/testController');
const { protect } = require('../middleware/auth');

// All test routes require authentication
router.use(protect);

// POST /api/tests/mmse  — Submit MMSE answers
router.post('/mmse', submitMMSE);

// POST /api/tests/moca  — Submit MoCA answers
router.post('/moca', submitMoCA);

// POST /api/tests/clock — Submit Clock Drawing answers
router.post('/clock', submitClock);

// POST /api/tests/tmt   — Submit Trail Making Test answers
router.post('/tmt', submitTMT);

// GET  /api/tests/history  — Get all past test results (?test_type=MMSE&limit=10)
router.get('/history', getTestHistory);

// GET  /api/tests/latest-scores  — Get newest MMSE + MoCA for dashboard
router.get('/latest-scores', getLatestScores);

module.exports = router;
