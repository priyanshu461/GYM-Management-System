const Payment = require("../models/PaymentModel");
const Membership = require("../models/MembershipModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

// Get dashboard stats
const getStats = async (req, res) => {
  try {
    // Total Sales: Sum of all payment amounts
    const totalSalesResult = await Payment.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].total : 0;

    // Orders: Count of completed payments
    const orders = await Payment.countDocuments({ status: "Completed" });

    // Customers: Count of active members
    const customers = await User.countDocuments({ user_type: "Member", isActive: true });

    // Traffic: For simplicity, count of memberships (or could be visits if tracked)
    const traffic = await Membership.countDocuments();

    const stats = [
      {
        id: 1,
        title: "Total Sales",
        value: `₹${totalSales.toLocaleString()}`,
        change: "+12.5%",
        changeType: "positive"
      },
      {
        id: 2,
        title: "Orders",
        value: orders.toString(),
        change: "+8.2%",
        changeType: "positive"
      },
      {
        id: 3,
        title: "Customers",
        value: customers.toString(),
        change: "+15.3%",
        changeType: "positive"
      },
      {
        id: 4,
        title: "Traffic",
        value: traffic.toString(),
        change: "-2.1%",
        changeType: "negative"
      }
    ];

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};

// Get top products based on rating and stock
const getTopProducts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const topProducts = await Product.find({ isActive: true })
      .sort({ rating: -1, stock: -1 })
      .limit(parseInt(limit))
      .select("name price image rating stock category brand");

    // Format for dashboard display
    const formattedProducts = topProducts.map(product => ({
      id: product._id,
      title: product.name,
      price: `₹${product.price.toLocaleString()}`,
      sold: product.stock, // Using stock as proxy for sold units
      image: product.image || "🏋️‍♂️", // Default gym emoji if no image
      category: product.category,
      brand: product.brand
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top products", error: error.message });
  }
};

// Get recent orders (from payments)
const getRecentOrders = async (req, res) => {
  try {
    const orders = await Payment.find({ status: "Completed" })
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .limit(6)
      .select("customer amount status createdAt");

    const formattedOrders = orders.map((order, index) => ({
      id: order._id,
      customer: order.customer ? order.customer.name : "Unknown",
      amount: order.amount,
      status: order.status,
      date: order.createdAt.toISOString().split('T')[0] // YYYY-MM-DD
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent orders", error: error.message });
  }
};

// Get all orders (paginated)
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const orders = await Payment.find()
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("customer amount status createdAt");

    const total = await Payment.countDocuments();

    const formattedOrders = orders.map(order => ({
      id: order._id,
      customer: order.customer ? order.customer.name : "Unknown",
      amount: order.amount,
      status: order.status,
      date: order.createdAt.toISOString().split('T')[0]
    }));

    res.status(200).json({
      orders: formattedOrders,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders", error: error.message });
  }
};

// Get sales overview data (for chart)
const getSalesOverview = async (req, res) => {
  try {
    // Aggregate sales by month for last 30 days or something
    // For simplicity, return sample data points
    const salesData = [
      { date: "2025-09-01", sales: 12000 },
      { date: "2025-09-02", sales: 15000 },
      { date: "2025-09-03", sales: 18000 },
      // Add more points as needed
    ];

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales overview", error: error.message });
  }
};

module.exports = {
  getStats,
  getTopProducts,
  getRecentOrders,
  getAllOrders,
  getSalesOverview
};
