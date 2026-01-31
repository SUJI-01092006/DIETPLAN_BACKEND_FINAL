const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get user ID from localStorage
function getUserId() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  return userData._id || userData.id || userData.email; // fallback to email if no ID
}

// API helper functions
const api = {
  // Meal Plans
  async getMealPlans() {
    const userId = getUserId();
    if (!userId) return [];
    const response = await fetch(`${API_BASE_URL}/meal-plans/${userId}`);
    return response.json();
  },

  async saveMealPlan(planData) {
    const userId = getUserId();
    if (!userId) return null;
    const response = await fetch(`${API_BASE_URL}/meal-plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...planData, userId })
    });
    return response.json();
  },

  async deleteMealPlan(planId) {
    const response = await fetch(`${API_BASE_URL}/meal-plans/${planId}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Progress
  async getProgress() {
    const userId = getUserId();
    if (!userId) return { weightEntries: [], measurements: {}, goals: {} };
    const response = await fetch(`${API_BASE_URL}/progress/${userId}`);
    return response.json();
  },

  async saveProgress(progressData) {
    const userId = getUserId();
    if (!userId) return null;
    const response = await fetch(`${API_BASE_URL}/progress/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progressData)
    });
    return response.json();
  },

  async addWeightEntry(weightData) {
    const userId = getUserId();
    if (!userId) return null;
    const response = await fetch(`${API_BASE_URL}/progress/${userId}/weight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weightData)
    });
    return response.json();
  },

  // Grocery List
  async getGroceryList() {
    const userId = getUserId();
    if (!userId) return { items: [] };
    const response = await fetch(`${API_BASE_URL}/grocery-list/${userId}`);
    return response.json();
  },

  async saveGroceryList(items) {
    const userId = getUserId();
    if (!userId) return null;
    const response = await fetch(`${API_BASE_URL}/grocery-list/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    return response.json();
  },

  // History
  async getHistory(type = 'all') {
    const userId = getUserId();
    if (!userId) return [];
    const response = await fetch(`${API_BASE_URL}/history/${userId}?type=${type}`);
    return response.json();
  },

  async addToHistory(historyData) {
    const userId = getUserId();
    if (!userId) return null;
    const response = await fetch(`${API_BASE_URL}/history/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(historyData)
    });
    return response.json();
  },

  async deleteHistoryItem(itemId) {
    const response = await fetch(`${API_BASE_URL}/history/${itemId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Make api available globally
window.api = api;