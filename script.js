// Utilitaires globaux
const Utils = {
    getFromStorage: (key) => JSON.parse(localStorage.getItem(key)),
    saveToStorage: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    getCurrentUser: () => JSON.parse(localStorage.getItem('propfirm_current_user')),
    setCurrentUser: (user) => localStorage.setItem('propfirm_current_user', JSON.stringify(user)),
    getAllUsers: () => JSON.parse(localStorage.getItem('propfirm_users')) || [],
    saveAllUsers: (users) => localStorage.setItem('propfirm_users', JSON.stringify(users))
};

// Vérifier si l'utilisateur est connecté
function checkAuth() {
    const currentUser = Utils.getCurrentUser();
    const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('index.html');
    
    if (!currentUser && !isAuthPage && !window.location.pathname.includes('pricing.html')) {
        window.location.href = 'login.html';
    }
}

// Appel initial
document.addEventListener('DOMContentLoaded', checkAuth);