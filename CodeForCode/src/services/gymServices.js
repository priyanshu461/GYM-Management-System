import { BASE_API_URL, TOKEN } from "@/Utils/data";

const gymServices = {};

gymServices.getStats = async (data) => {
  try {
    // Simulate fetching stats data
    const res = await fetch(`${BASE_API_URL}dashboard/stats`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return mock data if API fails
    return {
      stats: [
        { id: 1, title: 'Total Members', value: '1,250', change: '+12%', changeType: 'positive', icon: 'Users' },
        { id: 2, title: 'Active Trainers', value: '15', change: '+5%', changeType: 'positive', icon: 'UserCheck' },
        { id: 3, title: 'Revenue This Month', value: '$45,000', change: '+8%', changeType: 'positive', icon: 'DollarSign' },
        { id: 4, title: 'Classes Today', value: '8', change: '+2%', changeType: 'positive', icon: 'Calendar' },
      ]
    };
  }
};

gymServices.getProducts = async (data) => {
  try {
    // Simulate fetching products data
    const res = await fetch(`${BASE_API_URL}dashboard/products`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data if API fails
    return {
      stats: [
        { id: 1, title: 'Protein Powder', sold: '320', price: '$50', image: '💪' },
        { id: 2, title: 'Gym Gloves', sold: '150', price: '$25', image: '🧤' },
        { id: 3, title: 'Yoga Mat', sold: '200', price: '$30', image: '🧘' },
      ]
    };
  }
};

gymServices.getOrders = async (data) => {
  try {
    // Simulate fetching orders data
    const res = await fetch(`${BASE_API_URL}dashboard/orders`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return mock data if API fails
    return {
      orders: [
        { id: 1001, customer: 'John Doe', amount: 150, status: 'Delivered', date: '2023-10-01' },
        { id: 1002, customer: 'Jane Smith', amount: 200, status: 'Pending', date: '2023-10-02' },
        { id: 1003, customer: 'Bob Johnson', amount: 75, status: 'Returned', date: '2023-10-03' },
        { id: 1004, customer: 'Alice Brown', amount: 300, status: 'Delivered', date: '2023-10-04' },
        { id: 1005, customer: 'Charlie Wilson', amount: 125, status: 'Pending', date: '2023-10-05' },
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

export default gymServices;
