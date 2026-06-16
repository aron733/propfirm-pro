// Données globales
let candidates = JSON.parse(localStorage.getItem('tradex_candidates')) || [];
let members = JSON.parse(localStorage.getItem('tradex_members')) || [];
let posts = JSON.parse(localStorage.getItem('tradex_posts')) || [];
let currentUser = JSON.parse(localStorage.getItem('tradex_current_user'));
const adminEmail = 'admin@tradex.com';

// Courses data
const courses = {
    free: [
        { id: 1, title: 'Les Fondamentaux du Trading', content: 'Découvrez comment fonctionne le marché, les différents types d\'actifs, les ordres... Contenu complet avec 50+ lignes d\'enseignement.' },
        { id: 2, title: 'Analyse Technique 101', content: 'Apprenez à lire les chandelles, identifier les supports et résistances, comprendre les tendances... Contenu détaillé sur 50+ lignes.' },
        { id: 3, title: 'Gestion du Risque Basique', content: 'Les règles essentielles pour protéger votre capital, calculer votre risque, gérer vos positions... Enseignement complet sur 50+ lignes.' }
    ],
    beginner: [
        { id: 1, title: 'Introduction aux Marchés', content: 'Comprendre les marchés financiers, les heures de trading, la volatilité...' },
        { id: 2, title: 'Types d\'Ordres Avancés', content: 'Maîtriser les ordres limités, stop-loss, take-profit...' },
        { id: 3, title: 'Psychologie du Trading', content: 'Gérer les émotions, développer la discipline...' },
        { id: 4, title: 'Première Stratégie Simple', content: 'Votre première stratégie pas à pas...' },
        { id: 5, title: 'Analyse des Graphiques', content: 'Lire et interpréter les graphiques...' },
        { id: 6, title: 'Gestion du Portefeuille', content: 'Diversifier vos investissements...' },
        { id: 7, title: 'Les Erreurs Courantes', content: 'Éviter les pièges du débutant...' },
        { id: 8, title: 'Pratique sur Démo', content: 'Comment utiliser un compte de démonstration...' }
    ],
    intermediate: [
        { id: 1, title: 'Stratégies Avancées', content: 'Stratégies de scalping, swing trading, position trading...' },
        { id: 2, title: 'Analyse Fondamentale', content: 'Comprendre les données économiques...' },
        { id: 3, title: 'Corrélations entre Actifs', content: 'Comment les marchés s\'influencent mutuellement...' },
        { id: 4, title: 'Trading sur Fibonacci', content: 'Utiliser les retracements et extensions de Fibonacci...' },
        { id: 5, title: 'Patterns de Chandelles', content: 'Identifier les patterns profitables...' },
        { id: 6, title: 'Indicateurs Techniques Avancés', content: 'MACD, RSI, Stochastique, Bollinger Bands...' },
        { id: 7, title: 'Gestion Avancée du Risque', content: 'Techniques de money management professionnelles...' },
        { id: 8, title: 'Backtesting de Stratégies', content: 'Tester vos stratégies sur l\'historique...' },
        { id: 9, title: 'Trading Multi-Timeframe', content: 'Combiner différents timeframes...' },
        { id: 10, title: 'Psychologie Avancée', content: 'Mastering trading psychology...' }
    ],
    advanced: [
        { id: 1, title: 'Trading Algorithmique', content: 'Créer des robots de trading...' },
        { id: 2, title: 'Machine Learning et Trading', content: 'Utiliser l\'IA pour prédire les marchés...' },
        { id: 3, title: 'Stratégies de Couverture', content: 'Techniques de hedging avancées...' },
        { id: 4, title: 'Trading d\'Volatilité', content: 'Exploiter la volatilité du marché...' },
        { id: 5, title: 'Stratégies de Spread', content: 'Trading pair trading et arbitrage...' },
        { id: 6, title: 'Options Avancées', content: 'Greeks, volatilité implicite, stratégies complexes...' },
        { id: 7, title: 'Optimisation de Portefeuille', content: 'Modern portfolio theory et optimisation...' },
        { id: 8, title: 'Trading Haute Fréquence', content: 'Concepts du HFT et latence...' },
        { id: 9, title: 'Analyse Quantitative', content: 'Mathématiques et statistiques avancées...' },
        { id: 10, title: 'Maîtrise Complète du Trading', content: 'Devenir trader professionnel...' },
        { id: 11, title: 'Risk Management Extrême', content: 'Gestion des risques au niveau institutionnel...' },
        { id: 12, title: 'Stratégies Black Swan', content: 'Trader les événements rares et extrêmes...' }
    ]
};

// Toggle menu
function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'admin') {
        renderAdminPanel();
    } else if (sectionId === 'candidates') {
        renderCandidates();
    } else if (sectionId === 'memberArea') {
        renderMemberArea();
    }
}

function showMemberSection(sectionId) {
    document.querySelectorAll('.member-section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId + '-section').classList.add('active');
    
    document.querySelectorAll('.member-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    if (sectionId === 'courses') {
        renderCourses();
    } else if (sectionId === 'community') {
        renderMembers();
    } else if (sectionId === 'chat') {
        renderChat();
    } else if (sectionId === 'profile') {
        renderProfile();
    }
}

// Submit application
function submitApplication(e) {
    e.preventDefault();
    
    const email = document.getElementById('appEmail').value;
    const firstName = document.getElementById('appFirstName').value;
    const lastName = document.getElementById('appLastName').value;
    const password = document.getElementById('appPassword').value;
    const level = document.getElementById('appLevel').value;
    
    if (!email || !firstName || !lastName || !password || !level) {
        showMessage('appMessage', 'Veuillez remplir tous les champs', 'error');
        return;
    }
    
    const candidate = {
        id: Date.now(),
        email,
        firstName,
        lastName,
        password: btoa(password),
        level,
        status: 'pending',
        date: new Date().toLocaleString()
    };
    
    candidates.push(candidate);
    localStorage.setItem('tradex_candidates', JSON.stringify(candidates));
    
    showMessage('appMessage', '✅ Candidature reçue! En attente d\'approbation.', 'success');
    document.querySelector('.application-form').reset();
    
    // Notification admin
    showAdminNotification(candidate);
}

function showAdminNotification(candidate) {
    // Simulating notification
    console.log('Nouvelle candidature:', candidate);
}

// Render candidates list
function renderCandidates() {
    const approved = candidates.filter(c => c.status === 'approved');
    const rejected = candidates.filter(c => c.status === 'rejected');
    
    document.getElementById('approvedList').innerHTML = approved.map(c => `
        <div class="candidate-item">
            <div class="name">✅ ${c.firstName} ${c.lastName}</div>
            <div class="email">${c.email}</div>
            <div class="level">Niveau: ${c.level}</div>
        </div>
    `).join('');
    
    document.getElementById('rejectedList').innerHTML = rejected.map(c => `
        <div class="candidate-item">
            <div class="name">❌ ${c.firstName} ${c.lastName}</div>
            <div class="email">${c.email}</div>
            <div class="level">Niveau: ${c.level}</div>
        </div>
    `).join('');
}

// Render admin panel
function renderAdminPanel() {
    const pending = candidates.filter(c => c.status === 'pending');
    
    document.getElementById('pendingList').innerHTML = pending.map(c => `
        <div class="pending-item">
            <div class="name">🆕 ${c.firstName} ${c.lastName}</div>
            <div class="info">Email: ${c.email}</div>
            <div class="info">Niveau: ${c.level}</div>
            <div class="info">Date: ${c.date}</div>
            <div class="pending-buttons">
                <button class="btn-approve" onclick="approveCandidiate(${c.id})">✅ Approuver</button>
                <button class="btn-reject" onclick="rejectCandidiate(${c.id})">❌ Rejeter</button>
            </div>
        </div>
    `).join('');
    
    const all = candidates.filter(c => c.status !== 'pending');
    document.getElementById('allCandidatesList').innerHTML = all.map(c => `
        <div class="candidate-item">
            <div class="name">${c.status === 'approved' ? '✅' : '❌'} ${c.firstName} ${c.lastName}</div>
            <div class="email">${c.email}</div>
            <div class="level">Niveau: ${c.level} | Statut: ${c.status}</div>
        </div>
    `).join('');
    
    // Check if user is admin
    if (currentUser && currentUser.email === adminEmail) {
        document.getElementById('adminLink').style.display = 'block';
    }
}

// Approve candidate
function approveCandidiate(candidateId) {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;
    
    candidate.status = 'approved';
    
    const member = {
        id: candidateId,
        email: candidate.email,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        password: candidate.password,
        level: candidate.level,
        joinDate: new Date().toLocaleString()
    };
    
    members.push(member);
    localStorage.setItem('tradex_candidates', JSON.stringify(candidates));
    localStorage.setItem('tradex_members', JSON.stringify(members));
    
    renderAdminPanel();
    showMessage('appMessage', '✅ Candidat approuvé!', 'success');
}

// Reject candidate
function rejectCandidiate(candidateId) {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;
    
    candidate.status = 'rejected';
    localStorage.setItem('tradex_candidates', JSON.stringify(candidates));
    
    renderAdminPanel();
    showMessage('appMessage', '❌ Candidat rejeté!', 'error');
}

// Render courses
function renderCourses() {
    document.getElementById('beginnerCourses').innerHTML = courses.beginner.map(c => `
        <div class="course-item">📖 ${c.title}</div>
    `).join('');
    
    document.getElementById('intermediateCourses').innerHTML = courses.intermediate.map(c => `
        <div class="course-item">📖 ${c.title}</div>
    `).join('');
    
    document.getElementById('advancedCourses').innerHTML = courses.advanced.map(c => `
        <div class="course-item">📖 ${c.title}</div>
    `).join('');
}

// View course
function viewCourse(type, courseId) {
    const coursesList = type === 'free' ? courses.free : null;
    if (coursesList) {
        const course = coursesList.find(c => c.id === courseId);
        if (course) {
            alert(`📚 ${course.title}\n\n${course.content}`);
        }
    }
}

// Render members
function renderMembers() {
    const membersList = members.map(m => `
        <div class="member-card">
            <div class="member-avatar">👤</div>
            <div class="member-name">${m.firstName} ${m.lastName}</div>
            <div class="member-email">${m.email}</div>
            <div class="member-email" style="margin-top: 8px; color: #dc2626;">Niveau: ${m.level}</div>
        </div>
    `).join('');
    
    document.getElementById('membersList').innerHTML = membersList || '<p style="text-align:center; color:#aaa;">Aucun membre approuvé</p>';
}

// Create post (Admin)
function createPost() {
    if (currentUser?.email !== adminEmail) return;
    
    const text = document.getElementById('postText').value;
    const imageFile = document.getElementById('postImage').files[0];
    const audioFile = document.getElementById('postAudio').files[0];
    
    if (!text && !imageFile && !audioFile) {
        alert('Veuillez ajouter du contenu');
        return;
    }
    
    const post = {
        id: Date.now(),
        author: 'TRADEX Admin',
        text: text,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        audio: audioFile ? URL.createObjectURL(audioFile) : null,
        likes: 0,
        comments: [],
        shares: 0,
        date: new Date().toLocaleString()
    };
    
    posts.unshift(post);
    localStorage.setItem('tradex_posts', JSON.stringify(posts));
    
    document.getElementById('postText').value = '';
    document.getElementById('postImage').value = '';
    document.getElementById('postAudio').value = '';
    
    renderChat();
}

// Render chat
function renderChat() {
    const feed = document.getElementById('chatFeed');
    feed.innerHTML = posts.map(p => `
        <div class="post">
            <div class="post-author">🔴 ${p.author}</div>
            <div class="post-content">${p.text}</div>
            ${p.image ? `<img src="${p.image}" class="post-image">` : ''}
            ${p.audio ? `<audio controls class="post-audio"><source src="${p.audio}"></audio>` : ''}
            <div class="post-actions">
                <span class="action-btn" onclick="likePost(${p.id})">❤️ ${p.likes}</span>
                <span class="action-btn" onclick="commentPost(${p.id})">💬 ${p.comments.length}</span>
                <span class="action-btn" onclick="sharePost(${p.id})">🔄 ${p.shares}</span>
            </div>
        </div>
    `).join('');
    
    if (currentUser?.email === adminEmail) {
        document.getElementById('adminChatPanel').style.display = 'block';
    }
}

// Like post
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        localStorage.setItem('tradex_posts', JSON.stringify(posts));
        renderChat();
    }
}

// Comment post
function commentPost(postId) {
    const comment = prompt('Votre commentaire:');
    if (comment) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                author: currentUser?.firstName || 'Anonyme',
                text: comment
            });
            localStorage.setItem('tradex_posts', JSON.stringify(posts));
            renderChat();
        }
    }
}

// Share post
function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.shares++;
        localStorage.setItem('tradex_posts', JSON.stringify(posts));
        renderChat();
    }
}

// Render profile
function renderProfile() {
    if (!currentUser) {
        document.getElementById('profileInfo').innerHTML = '<p style="color:#aaa;">Non connecté</p>';
        return;
    }
    
    document.getElementById('profileInfo').innerHTML = `
        <div class="profile-field">
            <div class="label">Prénom</div>
            <div class="value">${currentUser.firstName}</div>
        </div>
        <div class="profile-field">
            <div class="label">Nom</div>
            <div class="value">${currentUser.lastName}</div>
        </div>
        <div class="profile-field">
            <div class="label">Email</div>
            <div class="value">${currentUser.email}</div>
        </div>
        <div class="profile-field">
            <div class="label">Niveau</div>
            <div class="value">${currentUser.level}</div>
        </div>
        <div class="profile-field">
            <div class="label">Membre depuis</div>
            <div class="value">${currentUser.joinDate}</div>
        </div>
    `;
}

// Login as admin
function loginAsAdmin() {
    currentUser = {
        email: adminEmail,
        firstName: 'TRADEX',
        lastName: 'Admin'
    };
    localStorage.setItem('tradex_current_user', JSON.stringify(currentUser));
    showSection('admin');
    document.getElementById('adminLink').style.display = 'block';
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('tradex_current_user');
    showSection('landing');
    document.getElementById('adminLink').style.display = 'none';
}

// Show message
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `message ${type}`;
    
    setTimeout(() => {
        element.className = 'message';
    }, 3000);
}

// Login check
if (localStorage.getItem('tradex_current_user')) {
    currentUser = JSON.parse(localStorage.getItem('tradex_current_user'));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if admin
    if (currentUser?.email === adminEmail) {
        document.getElementById('adminLink').style.display = 'block';
    }
    
    // Demo: Add test posts
    if (posts.length === 0) {
        posts.push({
            id: 1,
            author: 'TRADEX Admin',
            text: 'Bienvenue sur la communauté TRADEX! 🎓 Commencez votre formation au trading dès aujourd\'hui.',
            image: null,
            audio: null,
            likes: 12,
            comments: [],
            shares: 3,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('tradex_posts', JSON.stringify(posts));
    }
});
