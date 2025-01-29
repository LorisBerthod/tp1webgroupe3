// Sélection des boutons par leurs classes spécifiques
const buttonAjouterPanier1 = document.querySelector('.btn1');
const buttonAjouterPanier2 = document.querySelector('.btn2');
const buttonAjouterPanier3 = document.querySelector('.btn3');

// Ajout d'événements click pour chaque bouton
buttonAjouterPanier1.addEventListener('click', () => {
    alert('Botte 1 ajoutée au panier avec succès');
});

buttonAjouterPanier2.addEventListener('click', () => {
    alert('Botte 2 ajoutée au panier avec succès');
});

buttonAjouterPanier3.addEventListener('click', () => {
    alert('Botte 3 ajoutée au panier avec succès');
});
