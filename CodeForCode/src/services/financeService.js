import { BASE_API_URL, getToken } from "@/Utils/data";

const financeService = {};

// Get all transactions with filtering and pagination
financeService.getAllTransactions = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Add filters to params
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'All') {
        params.append(key, filters[key]);
      }
    });
    
    const url = `${BASE_API_URL}management/finance${params.toString() ? `?${params.toString()}` : ''}`;
    
    console.log('🌐 FinanceService - API URL:', url);
    console.log('🌐 FinanceService - Filters:', filters);
    console.log('🌐 FinanceService - Query params:', params.toString());
    
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    
    console.log('🌐 FinanceService - Response status:', res.status);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch transactions: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('🌐 FinanceService - Response data:', data);
    return data;
  } catch (error) {
    console.error('❌ FinanceService - Error fetching transactions:', error);
    throw error;
  }
};

// Add new transaction
financeService.addTransaction = async (transactionData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await fetch(`${BASE_API_URL}management/finance`, {
      method: 'POST',
      headers,
      body: JSON.stringify(transactionData),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to add transaction');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

// Update existing transaction
financeService.updateTransaction = async (id, transactionData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await fetch(`${BASE_API_URL}management/finance/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(transactionData),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update transaction');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Delete transaction
financeService.deleteTransaction = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/finance/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to delete transaction');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Get transaction by ID
financeService.getTransactionById = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/finance/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch transaction');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
};

// Get financial summary/dashboard data
financeService.getFinancialSummary = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'All') {
        params.append(key, filters[key]);
      }
    });
    
    const url = `${BASE_API_URL}management/finance/summary${params.toString() ? `?${params.toString()}` : ''}`;
    
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch financial summary');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching financial summary:', error);
    throw error;
  }
};

export default financeService;
