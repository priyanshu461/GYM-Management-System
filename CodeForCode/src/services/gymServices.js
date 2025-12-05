// import { BASE_API_URL, getToken } from "../utils/data";

import { BASE_API_URL, getToken } from "@/Utils/data";

const gymServices = {};

gymServices.getStats = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }
    const stats = await res.json();
    // Map backend stats to frontend expected format
    const mappedStats = stats.map(stat => {
      let icon = 'Users';
      if (stat.title === 'Total Sales') icon = 'DollarSign';
      else if (stat.title === 'Orders') icon = 'Users';
      else if (stat.title === 'Customers') icon = 'UserCheck';
      else if (stat.title === 'Traffic') icon = 'TrendingUp';
      return { ...stat, icon };
    });
    return { stats: mappedStats };
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return mock data if API fails
    return {
      stats: [
        { id: 1, title: 'Membership Revenue', value: '₹0', change: '+0%', changeType: 'positive', icon: 'DollarSign' },
        { id: 2, title: 'Active Members', value: '0', change: '+0%', changeType: 'positive', icon: 'Users' },
        { id: 3, title: 'Total Members', value: '0', change: '+0%', changeType: 'positive', icon: 'UserCheck' },
        { id: 4, title: 'Monthly Attendance', value: '0', change: '+0%', changeType: 'positive', icon: 'TrendingUp' },
      ]
    };
  }
};

gymServices.getProducts = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}dashboard/top-products`, {
      headers: { Authorization: `Bearer ${token}` },
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

gymServices.getOrders = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}dashboard/recent-orders`, {
      headers: { Authorization: `Bearer ${token}` },
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
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}workout`, {
      headers: { Authorization: `Bearer ${token}` },
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
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}workout/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}workout/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
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

gymServices.getUser = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members`, {
      headers: { Authorization: `Bearer ${token}` },
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

gymServices.getCustomers = gymServices.getUser;

gymServices.addUser = async (customerData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_API_URL}management/members`, {
      method: 'POST',
      headers,
      body: JSON.stringify(customerData),
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to add customer');
    }
    return responseData;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

gymServices.getUserById = async (id) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch customer');
    }
    const customer = await res.json();
    return { customer };
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

gymServices.updateUser = async (id, customerData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_API_URL}management/members/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(customerData),
    });
    if (!res.ok) {
      throw new Error('Failed to update customer');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

gymServices.deleteUser = async (id) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
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

gymServices.getAllGyms = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}gyms`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch gyms');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching gyms:', error);
    // Return fallback data if API fails
    return {
      gyms: [
        { _id: '1', name: 'Main Branch', status: 'Active' },
        { _id: '2', name: 'North Branch', status: 'Active' },
        { _id: '3', name: 'South Branch', status: 'Active' }
      ]
    };
  }
};

gymServices.getGymById = async (id) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}gyms/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch gym');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching gym:', error);
    throw error;
  }
};

gymServices.addGym = async (gymData) => {
  try {
    const token = getToken();
    console.log('Sending gym data:', gymData); // Debug log
    const res = await fetch(`${BASE_API_URL}gyms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gymData),
    });
    console.log('Response status:', res.status); // Debug log
    const responseData = await res.json();
    console.log('Response data:', responseData); // Debug log
    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to add gym');
    }
    return responseData;
  } catch (error) {
    console.error('Error adding gym:', error);
    throw error;
  }
};

gymServices.updateGym = async (id, gymData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}gyms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gymData),
    });
    if (!res.ok) {
      throw new Error('Failed to update gym');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating gym:', error);
    throw error;
  }
};

gymServices.deleteGym = async (id) => {
  try {
    const token = getToken();
    console.log('Deleting gym with ID:', id); // Debug log
    const res = await fetch(`${BASE_API_URL}gyms/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Delete response status:', res.status); // Debug log
    const responseData = await res.json();
    console.log('Delete response data:', responseData); // Debug log
    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to delete gym');
    }
    return responseData;
  } catch (error) {
    console.error('Error deleting gym:', error);
    throw error;
  }
};

gymServices.getAllTrainers = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/trainers/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch trainers');
    }
    const data = await res.json();
    return data.trainers || [];
  } catch (error) {
    console.error('Error fetching trainers:', error);
    throw error;
  }
};

gymServices.getTrainersByGym = async (gymId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/trainers/gym/${gymId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch trainers by gym');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching trainers by gym:', error);
    throw error;
  }
};

gymServices.updateTrainer = async (trainerId, trainerData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/trainers/${trainerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(trainerData),
    });
    if (!res.ok) {
      throw new Error('Failed to update trainer');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating trainer:', error);
    throw error;
  }
};

gymServices.registerMember = async (memberData) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/members/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to register member");
  }
};

export default gymServices;
