function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');  
}

// Fonction pour initialiser le localStorage avec des utilisateurs par défaut (optionnel)
function initLocalStorage() {
    if (!localStorage.getItem('users')) {
        const users = [
            { email: 'user1@example.com', password: 'Password1!' },
            { email: 'user2@example.com', password: 'Password2!' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Vérifie les informations de connexion
function checkCredentials(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email && user.password === password);
}

// Ajoute un nouvel utilisateur
function addUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Gestion de la connexion
document.getElementById('connexionForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Adresse e-mail invalide.";
        errorMessage.style.display = "block";
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.textContent = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.";
        errorMessage.style.display = "block";
        return;
    }

    if (checkCredentials(email, password)) {
        localStorage.setItem("loggedInUser", email); // Stocke l'utilisateur connecté
        alert("Connexion réussie !");
        window.location.href = "../index.html"; // Redirige vers l'accueil
    } else {
        errorMessage.textContent = "Adresse e-mail ou mot de passe incorrect.";
        errorMessage.style.display = "block";
    }
});

// Gestion de l'inscription
document.getElementById('inscriptionForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Adresse e-mail invalide.";
        errorMessage.style.display = "block";
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.textContent = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.";
        errorMessage.style.display = "block";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        errorMessage.textContent = "Cet e-mail est déjà utilisé.";
        errorMessage.style.display = "block";
        return;
    }

    addUser(email, password);
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    window.location.href = "connexion.html";
});

// Gestion du bouton connexion/déconnexion
document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.getElementById("authButton");

    // Vérifie si le bouton existe avant de continuer
    if (authButton) {
        function updateAuthButton() {
            const isLoggedIn = localStorage.getItem("loggedInUser");

            if (isLoggedIn) {
                authButton.textContent = "Déconnexion";
                authButton.onclick = logout;
            } else {
                authButton.innerHTML = '<a href="connexion.html">Connexion</a>';
                authButton.onclick = null;
            }
        }

        function logout() {
            localStorage.removeItem("loggedInUser");
            updateAuthButton();
            alert("Vous avez été déconnecté !");
            window.location.reload(); // Recharger la page pour mettre à jour l'état
        }

        // Mettre à jour le bouton à chaque chargement de la page
        updateAuthButton();
    }
});

// Afficher les données du localStorage dans la console
console.log("Données brutes du localStorage:", localStorage.getItem('users'));

// Initialiser les données au chargement
initLocalStorage();
