// Check if user is authenticated
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Logout function
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userData');
  window.location.href = 'login.html';
}

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', checkAuth);
