const SupportTicket = require("../models/SupportTicketModel");

// Get all tickets with filtering and pagination
const getAllTickets = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      category,
      assignee,
      search,
      sort = "updatedAt",
      order = "desc"
    } = req.query;

    const skip = (page - 1) * limit;
    let filter = {};

    if (status && status !== "all") filter.status = status;
    if (priority && priority !== "all") filter.priority = priority;
    if (category && category !== "all") filter.category = category;
    if (assignee && assignee !== "all") filter.assignee = assignee;

    if (search) {
      filter.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { member: { $regex: search, $options: "i" } },
        { club: { $regex: search, $options: "i" } },
        { assignee: { $regex: search, $options: "i" } }
      ];
    }

    const sortOptions = {};
    sortOptions[sort] = order === "desc" ? -1 : 1;

    const tickets = await SupportTicket.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

    const total = await SupportTicket.countDocuments(filter);

    res.status(200).json({
      tickets,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets", error: error.message });
  }
};

// Get ticket stats
const getStats = async (req, res) => {
  try {
    const open = await SupportTicket.countDocuments({ status: "Open" });
    const pending = await SupportTicket.countDocuments({ status: "Pending" });
    const resolved = await SupportTicket.countDocuments({ status: "Resolved" });
    const urgent = await SupportTicket.countDocuments({ priority: "Urgent" });

    res.status(200).json({
      open,
      pending,
      resolved,
      urgent
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};

// Get single ticket with replies
const getTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await SupportTicket.findById(id).populate('createdBy', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ticket", error: error.message });
  }
};

// Create new ticket
const createTicket = async (req, res) => {
  try {
    const { subject, description, member, club, priority, category, assignee } = req.body;
    const createdBy = req.user?.id || req.body.createdBy; // Assuming auth middleware sets req.user

    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }

    const ticket = new SupportTicket({
      subject,
      description,
      member: member || "",
      club: club || "Online",
      priority: priority || "Medium",
      category: category || "App",
      assignee: assignee || "",
      createdBy
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error creating ticket", error: error.message });
  }
};

// Update ticket
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBy = req.user?.id || req.body.updatedBy;

    const ticket = await SupportTicket.findByIdAndUpdate(
      id,
      { ...updates, updatedBy },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket", error: error.message });
  }
};

// Delete ticket
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await SupportTicket.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ticket", error: error.message });
  }
};

// Add reply to ticket
const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, message } = req.body;

    if (!author || !message) {
      return res.status(400).json({ message: "Author and message are required" });
    }

    const ticket = await SupportTicket.findByIdAndUpdate(
      id,
      {
        $push: { replies: { author, message } },
        updatedBy: req.user?.id || req.body.updatedBy
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error: error.message });
  }
};

// Bulk update tickets
const bulkUpdate = async (req, res) => {
  try {
    const { ticketIds, updates } = req.body;

    if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
      return res.status(400).json({ message: "Ticket IDs array is required" });
    }

    const result = await SupportTicket.updateMany(
      { _id: { $in: ticketIds } },
      { ...updates, updatedBy: req.user?.id || req.body.updatedBy }
    );

    res.status(200).json({
      message: `${result.modifiedCount} tickets updated`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ message: "Error bulk updating tickets", error: error.message });
  }
};

module.exports = {
  getAllTickets,
  getStats,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  addReply,
  bulkUpdate
};
