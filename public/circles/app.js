//////////////////////////
//
// 🤩 CIRCLES with CANVAS
//

import {addDiv,clear, print} from "https://qwark.glitch.me/toolbox.js"

print("<center><h1><orange>Circles ")

// Étape 1: Initialisation du canvas et des cercles
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.getElementById('ui').appendChild(canvas);

// Fonction pour générer une couleur aléatoire
function randomColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Étape 2: Génération des cercles colorés
let circles = [];
for (let i = 0; i < 12; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 25,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    color: randomColor()
  });
}

// Fonction pour dessiner les cercles
function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
  });
}

// Fonction pour mettre à jour les cercles
function updateCircles() {
  circles.forEach(circle => {
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Collision avec les bords du canvas
    if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
      circle.dx *= -1;
    }
    if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
      circle.dy *= -1;
    }
  });

  drawCircles();
}
 
// Étape 3: Gestion des clics
canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  circles.forEach((circle, index) => {
    if (Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2) < circle.size) {
      circle.size += 5; // Le cercle grossit
      setTimeout(() => {
        circles.splice(index, 1); // Retire le cercle après qu'il a grossi
      }, 200);
    }
  });
});

// Étape 4: Boucle d'animation
function animate() {
  requestAnimationFrame(animate);
  updateCircles();
}

// Démarrage de l'animation
animate();








