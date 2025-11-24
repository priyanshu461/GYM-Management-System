const Membership = require("../models/MembershipModel");
const Plans = require("../models/PlansModel");
const WorkoutCompletion = require("../models/WorkoutCompletionModel");
const ClassAttendance = require("../models/ClassAttendanceModel");
const Class = require("../models/ClassModel");
const Progress = require("../models/ProgressModel");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");
// Get all members
const getAllMembers = async (req, res) => {
  try {
    const params = { user_type: "Member" };
    const gymId = req.user.gymId;
    if (gymId) {
      params.gymId = gymId;
    }
    if (req.user.user_type && req.user.user_type.toLowerCase() === "trainer") {
      params.assignedTrainer = req.user.id; //new mongoose.Types.ObjectId(req.user.id);
    }

    const members = await User.find(params).populate("assignedTrainer", "name");
    const membersWithPlans = await Promise.all(
      members.map(async (member) => {
        const membership = await Membership.findOne({
          customer: member._id,
          status: "Active",
        }).populate("plan", "name");
        return {
          ...member.toObject(),
          plan: membership ? membership.plan.name : "Basic",
        };
      })
    );
    res.status(200).json(membersWithPlans);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching members", error: error.message });
  }
};

// Get member by ID
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, user_type: "Member" };
    if (req.user.gymId) {
      query.gymId = req.user.gymId;
    }
    const member = await User.findOne(query);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    const membership = await Membership.findOne({
      customer: member._id,
      status: "Active",
    }).populate("plan", "name");
    const memberWithPlan = {
      ...member.toObject(),
      plan: membership ? membership.plan.name : "Basic",
    };
    res.status(200).json(memberWithPlan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching member", error: error.message });
  }
};

// Add member
const addMember = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      aadharNo,
      address,
      emergencyContact,
      dob,
      gender,
      occupation,
      plan,
      gymId,
    } = req.body;

    // Determine gymId: use req.user.gymId if present, otherwise require from body
    const memberGymId = req.user.gymId || gymId;
    if (!memberGymId) {
      return res.status(400).json({ message: "Gym ID is required" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if mobile already exists (optional, but consistent with update profile)
    if (mobile) {
      const existingMobile = await User.findOne({ mobile });
      if (existingMobile) {
        return res
          .status(400)
          .json({ message: "Mobile number already exists" });
      }
    }

    const customer = new User({
      name,
      email: email.toLowerCase(),
      mobile,
      password: bcrypt.hashSync(mobile, 10), // Default password is mobile number
      address,
      assignedTrainer: req.body.assignedTrainer || null,
      profile: {
        aadharNo,
        emergencyContact,
        dob,
        ...(gender && gender !== "" && { gender }),
        occupation,
      },
      user_type: "Member",
      gymId: memberGymId,
      status: "Active",
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
          endDate: new Date(
            Date.now() + planDoc.duration * 30 * 24 * 60 * 60 * 1000
          ),
        });
        await membership.save();
      }
    }
    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding member", error: error.message });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      mobile,
      email,
      aadharNo,
      address,
      emergencyContact,
      dob,
      gender,
      occupation,
      plan,
    } = req.body;

    const query = { _id: id, user_type: "Member" };
    if (req.user.gymId) {
      query.gymId = req.user.gymId;
    }

    const updateData = {
      name,
      mobile,
      email,
      address,
      assignedTrainer: req.body.assignedTrainer || null,
      gymId: req.user.gymId || req.body.gymId || null,
    };

    // Update profile fields using $set to avoid overwriting the entire profile
    const profileUpdates = {};
    if (aadharNo !== undefined) profileUpdates["profile.aadharNo"] = aadharNo;
    if (emergencyContact !== undefined)
      profileUpdates["profile.emergencyContact"] = emergencyContact;
    if (dob !== undefined) profileUpdates["profile.dob"] = dob;
    if (gender && gender !== "") profileUpdates["profile.gender"] = gender;
    if (occupation !== undefined)
      profileUpdates["profile.occupation"] = occupation;

    if (Object.keys(profileUpdates).length > 0) {
      updateData.$set = profileUpdates;
    }

    const updatedMember = await User.findOneAndUpdate(query, updateData);
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Update membership if plan changed
    if (plan) {
      const planDoc = await Plans.findOne({ name: plan });
      if (planDoc) {
        await Membership.findOneAndUpdate(
          { customer: id, status: "Active" },
          { plan: planDoc._id }
        );
      }
    }
    res.status(200).json({ message: "Member updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating member", error: error.message });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, user_type: "Member" };
    if (req.user.gymId) {
      query.gymId = req.user.gymId;
    }
    const customer = await User.findOneAndDelete(query);
    if (!customer) {
      return res.status(404).json({ message: "Member not found" });
    }
    await Membership.updateMany({ customer: id }, { status: "Cancelled" });
    res
      .status(200)
      .json({ message: "Member deleted successfully", data: customer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting member", error: error.message });
  }
};

// Get member profile (for authenticated member)
const getMemberProfile = async (req, res) => {
  try {
    // Only allow members to access their own profile
    if (req.user.type !== "Member") {
      return res
        .status(403)
        .json({ message: "Access denied. Member access required." });
    }

    const member = await User.findById(req.user.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const membership = await Membership.findOne({
      customer: member._id,
      status: "Active",
    }).populate("plan", "name");
    const memberWithPlan = {
      ...member.toObject(),
      plan: membership ? membership.plan.name : "Basic",
    };

    res.status(200).json(memberWithPlan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching member profile", error: error.message });
  }
};

// Update member profile (for authenticated member)
const updateMemberProfile = async (req, res) => {
  try {
    // Only allow members to update their own profile
    if (req.user.type !== "Member") {
      return res
        .status(403)
        .json({ message: "Access denied. Member access required." });
    }

    const { name, mobile, email, address, image } = req.body;

    // Validate email if provided
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if mobile is being changed and if it's already taken
    if (mobile) {
      const existingCustomer = await User.findOne({
        mobile,
        _id: { $ne: req.user.id },
      });
      if (existingCustomer) {
        return res
          .status(400)
          .json({ message: "Mobile number already exists" });
      }
    }

    // Check if email is being changed and if it's already taken
    if (email) {
      const existingCustomer = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.user.id },
      });
      if (existingCustomer) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (mobile) updateData.mobile = mobile;
    if (email !== undefined)
      updateData.email = email ? email.toLowerCase() : "";
    if (address !== undefined) updateData.address = address;
    if (image !== undefined) updateData.image = image;

    const updatedMember = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedMember._id,
        name: updatedMember.name,
        mobile: updatedMember.mobile,
        email: updatedMember.email,
        address: updatedMember.address,
        image: updatedMember.image,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating member profile", error: error.message });
  }
};

// Get member stats (for authenticated member)
const getMemberStats = async (req, res) => {
  try {
    // Only allow members to access their own stats
    if (req.user.type !== "Member") {
      return res
        .status(403)
        .json({ message: "Access denied. Member access required." });
    }

    const memberId = req.user.id;

    // Get member details for BMI calculation
    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Calculate BMI if height and weight are available
    let bmi = null;
    const latestProgress = await Progress.findOne({ customer: memberId }).sort({
      date: -1,
    });
    if (member.height && latestProgress && latestProgress.weight) {
      const heightInMeters = member.height / 100;
      bmi = (latestProgress.weight / (heightInMeters * heightInMeters)).toFixed(
        1
      );
    }

    // Count workouts completed this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const workoutsCompleted = await WorkoutCompletion.countDocuments({
      customer: memberId,
      completedDate: { $gte: startOfMonth },
    });

    // Count classes attended this month
    const classesAttended = await ClassAttendance.countDocuments({
      customer: memberId,
      attendedDate: { $gte: startOfMonth },
      status: "Present",
    });

    // Calculate progress points (simplified: 10 points per workout + 15 per class)
    const progressPoints = workoutsCompleted * 10 + classesAttended * 15;

    // Calculate total training hours from workouts this month
    const workoutResults = await WorkoutCompletion.aggregate([
      { $match: { customer: memberId, completedDate: { $gte: startOfMonth } } },
      { $group: { _id: null, totalMinutes: { $sum: "$duration" } } },
    ]);
    const totalHours =
      workoutResults.length > 0
        ? Math.round(workoutResults[0].totalMinutes / 60)
        : 0;

    const stats = {
      bmi: bmi || 0,
      workoutsCompleted,
      classesAttended,
      progressPoints,
      totalHours,
    };

    res.status(200).json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching member stats", error: error.message });
  }
};

// Get recent activities (for authenticated member)
const getRecentActivities = async (req, res) => {
  try {
    // Only allow members to access their own activities
    if (req.user.type !== "Member") {
      return res
        .status(403)
        .json({ message: "Access denied. Member access required." });
    }

    const memberId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    // Get recent workout completions
    const workouts = await WorkoutCompletion.find({ customer: memberId })
      .populate("workoutRoutine", "name")
      .sort({ completedDate: -1 })
      .limit(limit)
      .select("completedDate duration workoutRoutine");

    // Get recent class attendances
    const classes = await ClassAttendance.find({ customer: memberId })
      .populate("class", "name instructor")
      .sort({ attendedDate: -1 })
      .limit(limit)
      .select("attendedDate status class");

    // Get recent progress entries
    const progress = await Progress.find({ customer: memberId })
      .sort({ date: -1 })
      .limit(limit)
      .select("date weight notes");

    // Combine and sort all activities
    const activities = [
      ...workouts.map((w) => ({
        type: "workout",
        date: w.completedDate,
        title: `Completed ${w.workoutRoutine?.name || "Workout"}`,
        description: `${w.duration} minutes`,
        icon: "🏋️‍♂️",
      })),
      ...classes.map((c) => ({
        type: "class",
        date: c.attendedDate,
        title: `Attended ${c.class?.name || "Class"}`,
        description: `with ${c.class?.instructor || "Instructor"}`,
        icon: "📅",
      })),
      ...progress.map((p) => ({
        type: "progress",
        date: p.date,
        title: "Progress Update",
        description: `Weight: ${p.weight}kg${p.notes ? ` - ${p.notes}` : ""}`,
        icon: "📊",
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recent activities",
      error: error.message,
    });
  }
};

// Get upcoming classes (for authenticated member)
const getUpcomingClasses = async (req, res) => {
  try {
    // Only allow members to access upcoming classes
    if (req.user.type !== "Member") {
      return res
        .status(403)
        .json({ message: "Access denied. Member access required." });
    }

    const limit = parseInt(req.query.limit) || 5;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get upcoming classes (simplified - assuming classes repeat weekly)
    // In a real app, you'd have a schedule system
    const classes = await Class.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("name instructor time days image description");

    // Format for dashboard display
    const upcomingClasses = classes.map((cls) => ({
      id: cls._id,
      name: cls.name,
      instructor: cls.instructor,
      time: cls.time,
      days: cls.days,
      image: cls.image || "🏋️‍♂️",
    }));

    res.status(200).json(upcomingClasses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching upcoming classes",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  getMemberProfile,
  updateMemberProfile,
  getMemberStats,
  getRecentActivities,
  getUpcomingClasses,
};
