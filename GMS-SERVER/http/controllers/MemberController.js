const Customer = require("../../models/CustomerModel");
const Membership = require("../../models/MembershipModel");
const Plans = require("../../models/PlansModel");

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Customer.find({ status: "Active" }).select("name email");
    // For simplicity, assume plan is from membership, but frontend has plan in member
    // Need to populate or adjust
    const membersWithPlans = await Promise.all(
      members.map(async (member) => {
        const membership = await Membership.findOne({ customer: member._id, status: "Active" }).populate("plan", "name");
        return {
          id: member._id,
          name: member.name,
          email: member.email,
          plan: membership ? membership.plan.name : "Basic",
        };
      })
    );
    res.status(200).json(membersWithPlans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error: error.message });
  }
};

// Add member
const addMember = async (req, res) => {
  try {
    const { name, email, plan, mobile = "1234567890", aadharNo = "123456789012" } = req.body;
    const customer = new Customer({ name, email, mobile, aadharNo, status: "Active" });
    await customer.save();
    // Find plan by name
    const planDoc = await Plans.findOne({ name: plan });
    if (planDoc) {
      const membership = new Membership({ customer: customer._id, plan: planDoc._id, startDate: new Date(), endDate: new Date(Date.now() + planDoc.duration * 30 * 24 * 60 * 60 * 1000) });
      await membership.save();
    }
    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error: error.message });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, plan } = req.body;
    await Customer.findByIdAndUpdate(id, { name, email });
    // Update membership if plan changed
    const planDoc = await Plans.findOne({ name: plan });
    if (planDoc) {
      await Membership.findOneAndUpdate({ customer: id, status: "Active" }, { plan: planDoc._id });
    }
    res.status(200).json({ message: "Member updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating member", error: error.message });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndUpdate(id, { status: "Inactive" });
    await Membership.updateMany({ customer: id }, { status: "Cancelled" });
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error: error.message });
  }
};

module.exports = {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
};
