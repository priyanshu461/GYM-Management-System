import { BASE_API_URL, TOKEN } from "@/Utils/data";

const gymServices = {};

gymServices.getStats = async (data) => {
  try {
    const res = await fetch(`${BASE_API_URL}dashboard/stats`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }
    const stats = await res.json();
    // Map backend stats to frontend expected format
    const mappedStats = stats.map(stat => {
      let icon = 'Users';
      if (stat.title === 'Total Sales') icon = 'DollarSign';
      else if (stat.title === 'Orders') icon = 'Box';
      else if (stat.title === 'Customers') icon = 'Users';
      else if (stat.title === 'Traffic') icon = 'TrendingUp';
      return { ...stat, icon };
    });
    return { stats: mappedStats };
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return mock data if API fails
    return {
      stats: [
        { id: 1, title: 'Total Sales', value: '₹0', change: '+0%', changeType: 'positive', icon: 'DollarSign' },
        { id: 2, title: 'Orders', value: '0', change: '+0%', changeType: 'positive', icon: 'Box' },
        { id: 3, title: 'Customers', value: '0', change: '+0%', changeType: 'positive', icon: 'Users' },
        { id: 4, title: 'Traffic', value: '0', change: '+0%', changeType: 'positive', icon: 'TrendingUp' },
      ]
    };
  }
};

gymServices.getProducts = async (data) => {
  try {
    const res = await fetch(`${BASE_API_URL}dashboard/top-products`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await res.json();
    return { stats: products };
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data if API fails
    return {
      stats: [
        { id: 1, title: 'Protein Powder', sold: '0', price: '₹0', image: '💪' },
        { id: 2, title: 'Gym Gloves', sold: '0', price: '₹0', image: '🧤' },
        { id: 3, title: 'Yoga Mat', sold: '0', price: '₹0', image: '🧘' },
      ]
    };
  }
};

gymServices.getOrders = async (data) => {
  try {
    const res = await fetch(`${BASE_API_URL}dashboard/recent-orders`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await res.json();
    return { orders: data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return mock data if API fails
    return {
      orders: [
        { id: '1', customer: 'No Data', amount: 0, status: 'Pending', date: '2023-10-01' },
      ]
    };
  }
};

gymServices.getAllRoutines = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}workout`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch routines');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching routines:', error);
    throw error;
  }
};

gymServices.addRoutine = async (routineData) => {
  try {
    const res = await fetch(`${BASE_API_URL}workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(routineData),
    });
    if (!res.ok) {
      throw new Error('Failed to add routine');
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding routine:', error);
    throw error;
  }
};

gymServices.updateRoutine = async (id, routineData) => {
  try {
    const res = await fetch(`${BASE_API_URL}workout/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(routineData),
    });
    if (!res.ok) {
      throw new Error('Failed to update routine');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating routine:', error);
    throw error;
  }
};

gymServices.deleteRoutine = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}workout/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to delete routine');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting routine:', error);
    throw error;
  }
};

gymServices.getCustomers = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}management/members`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch customers');
    }
    const customers = await res.json();
    return { customers };
  } catch (error) {
    console.error('Error fetching customers:', error);
    // Return mock data if API fails
    return {
      customers: [
        { _id: 1, name: "Aadi Singh", mobile: "1234567890", email: "aadi@example.com", aadharNo: "123456789012", address: "Delhi", emergencyContact: "0987654321", dob: "1990-01-01", gender: "Male", occupation: "Engineer" },
        { _id: 2, name: "Rohit Sharma", mobile: "0987654321", email: "rohit@example.com", aadharNo: "098765432109", address: "Mumbai", emergencyContact: "1234567890", dob: "1985-05-15", gender: "Male", occupation: "Doctor" },
      ]
    };
  }
};

gymServices.addCustomer = async (customerData) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(customerData),
    });
    if (!res.ok) {
      throw new Error('Failed to add customer');
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

gymServices.deleteCustomer = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/members/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to delete customer');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export default gymServices;
