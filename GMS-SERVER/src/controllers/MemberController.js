const Customer = require("../models/CustomerModel");
const Membership = require("../models/MembershipModel");
const Plans = require("../models/PlansModel");

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Customer.find({ status: "Active" });
    const membersWithPlans = await Promise.all(
      members.map(async (member) => {
        const membership = await Membership.findOne({ customer: member._id, status: "Active" }).populate("plan", "name");
        return {
          ...member.toObject(),
          plan: membership ? membership.plan.name : "Basic",
        };
      })
    );
    res.status(200).json(membersWithPlans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error: error.message });
  }
};

// Get member by ID
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Customer.findById(id);
    if (!member || member.status !== "Active") {
      return res.status(404).json({ message: "Member not found" });
    }
    const membership = await Membership.findOne({ customer: member._id, status: "Active" }).populate("plan", "name");
    const memberWithPlan = {
      ...member.toObject(),
      plan: membership ? membership.plan.name : "Basic",
    };
    res.status(200).json(memberWithPlan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error: error.message });
  }
};

// Add member
const addMember = async (req, res) => {
  try {
    const { name, email, mobile, aadharNo, address, emergencyContact, dob, gender, occupation, plan } = req.body;
    const customer = new Customer({
      name,
      email,
      mobile,
      aadharNo,
      address,
      emergencyContact,
      dob,
      gender,
      occupation,
      status: "Active"
    });
    await customer.save();
    // Find plan by name if provided
    if (plan) {
      const planDoc = await Plans.findOne({ name: plan });
      if (planDoc) {
        const membership = new Membership({
          customer: customer._id,
          plan: planDoc._id,
          startDate: new Date(),
          endDate: new Date(Date.now() + planDoc.duration * 30 * 24 * 60 * 60 * 1000)
        });
        await membership.save();
      }
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
    const { name, mobile, email, aadharNo, address, emergencyContact, dob, gender, occupation, plan } = req.body;
    await Customer.findByIdAndUpdate(id, {
      name,
      mobile,
      email,
      aadharNo,
      address,
      emergencyContact,
      dob,
      gender,
      occupation
    });
    // Update membership if plan changed
    if (plan) {
      const planDoc = await Plans.findOne({ name: plan });
      if (planDoc) {
        await Membership.findOneAndUpdate({ customer: id, status: "Active" }, { plan: planDoc._id });
      }
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
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
