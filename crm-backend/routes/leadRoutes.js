const express = require('express');
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  addNote,
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createLead).get(getLeads);
router.route('/:id').get(getLeadById).put(updateLead).delete(deleteLead);
router.post('/:id/notes', addNote);

module.exports = router;
