import { BASE_API_URL, TOKEN } from "@/Utils/data";

const financeService = {};

financeService.getAllTransactions = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}management/finance`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch transactions');
    }
    const transactions = await res.json();
    return { transactions };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    // Return mock data if API fails
    return {
      transactions: [
        { _id: 1, date: "2025-10-01", type: "Income", amount: 5000, description: "Membership Fees" },
        { _id: 2, date: "2025-10-02", type: "Expense", amount: 2000, description: "Equipment Maintenance" },
      ]
    };
  }
};

financeService.addTransaction = async (transactionData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (TOKEN) {
      headers.Authorization = `Bearer ${TOKEN}`;
    }
    const res = await fetch(`${BASE_API_URL}management/finance`, {
      method: 'POST',
      headers,
      body: JSON.stringify(transactionData),
    });
    if (!res.ok) {
      throw new Error('Failed to add transaction');
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

financeService.updateTransaction = async (id, transactionData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (TOKEN) {
      headers.Authorization = `Bearer ${TOKEN}`;
    }
    const res = await fetch(`${BASE_API_URL}management/finance/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(transactionData),
    });
    if (!res.ok) {
      throw new Error('Failed to update transaction');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

financeService.deleteTransaction = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/finance/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to delete transaction');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export default financeService;
