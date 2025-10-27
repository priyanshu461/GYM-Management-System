const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getStats,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  addReply,
  bulkUpdate
} = require("../http/controllers/SupportController");

// GET /api/support - Get all tickets with filtering
router.get("/", getAllTickets);

// GET /api/support/stats - Get ticket statistics
router.get("/stats", getStats);

// GET /api/support/:id - Get single ticket
router.get("/:id", getTicket);

// POST /api/support - Create new ticket
router.post("/", createTicket);

// PUT /api/support/:id - Update ticket
router.put("/:id", updateTicket);

// DELETE /api/support/:id - Delete ticket
router.delete("/:id", deleteTicket);

// POST /api/support/:id/reply - Add reply to ticket
router.post("/:id/reply", addReply);

// POST /api/support/bulk-update - Bulk update tickets
router.post("/bulk-update", bulkUpdate);

module.exports = router;
