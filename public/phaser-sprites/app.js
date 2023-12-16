




////////////////////
// phaser-sprites //
////////////////////


// 1) Ajout de la boîte à outils
import {addDiv,clear, print} from "/toolbox.js"

// 2) Message d'accueuil
print(
  "<center><h1><orange>👀<br><yellow>Sprites 2.0 loading 😁</h1>"
)

// 3) Run !
run(main)

// 4) Fonction principale
function main() {
    // efface le message d'accueil
    setTimeout(() => clear(), 5000)

    let blitter
    let gravity = 0.5
    let idx = 1

    // 🌟 EXAMPLE
    class Example extends Phaser.Scene {
        constructor () {
            super();
            this.fpsText = null; // Ajout de la variable pour le texte des FPS
            this.autoIncreaseMode = true; // Activation du mode d'augmentation automatique

        }

        // 1) PRELOAD 📦 Pré-chargement des assets
        preload () {
            this.load.setBaseURL('https://labs.phaser.io');
            this.load.atlas('atlas', 'assets/tests/fruit/veg.png', 'assets/tests/fruit/veg.json');
            this.numbers = [];
            this.iter = 0;
        }

        // 2) 🚀 Lancement des objets
        launch () {
            let frame = 'veg01';
            idx++;

            if (idx === 38) {
                idx = 1;
            }

            if (idx < 10) {
                frame = 'veg0' + idx.toString();
            } else {
                frame = 'veg' + idx.toString();
            }

            const bob = blitter.create(0, 0, frame);

            bob.data.vx = Math.random() * 10;
            bob.data.vy = Math.random() * 10;
            bob.data.bounce = 0.8 + (Math.random() * 0.3);
        }

        // 3) 🔨 Création des objets et de la scène
        create () {
            let digitY = gameContainer.offsetHeight - 100
            
            for (var i = 0; i < 7; i++) {
                this.numbers.push(this.add.image(32 + i * 25, digitY, 'atlas', '0').setScale(0.5).setDepth(1));
            }

            blitter = this.add.blitter(0, 0, 'atlas');

            for (var i = 0; i < 100; ++i) {
                this.launch();
            }

            this.updateDigits();

            // Ajout de l'écouteur d'événements pour le redimensionnement
            window.addEventListener('resize', () => this.resizeGame());

            // Création de l'objet texte pour les FPS
            this.fpsText = this.add.text(10, 10, '', { font: '32px Impact', fill: '#ffffff' });
        }

        // 4) 🔄 Mise à jour de la scène à chaque frame
        update () {
            /*if (this.input.activePointer.isDown) {
                for (var i = 0; i < 250; ++i) {
                    this.launch();
                }

                this.updateDigits();
            }*/

            let maxWidth = gameContainer.offsetWidth
            let maxHeight = gameContainer.offsetHeight

            for (var index = 0, length = blitter.children.list.length; index < length; ++index) {
                var bob = blitter.children.list[index];

                bob.data.vy += gravity;

                bob.y += bob.data.vy;
                bob.x += bob.data.vx;

                if (bob.x > maxWidth) {
                    bob.x = maxWidth;
                    bob.data.vx *= -bob.data.bounce;
                } else if (bob.x < 0) {
                    bob.x = 0;
                    bob.data.vx *= -bob.data.bounce;
                }

                if (bob.y > maxHeight) {
                    bob.y = maxHeight;
                    bob.data.vy *= -bob.data.bounce;
                }
            }

            // Mise à jour du texte des FPS et contrôle du mode d'augmentation
            const currentFps = Math.round(this.game.loop.actualFps);
            this.fpsText.setText(`FPS: ${currentFps} ${blitter.children.list.length.toString()}`);
    
            // Si le mode d'augmentation est activé et que le FPS est supérieur à 60
            if (this.autoIncreaseMode && currentFps >= 60) {
                for (var i = 0; i < 100; ++i) { // Vous pouvez ajuster ce nombre pour contrôler la vitesse d'augmentation
                    this.launch();
                }
                this.updateDigits();
            }  
        }

        // 5) 🎲 Mise à jour des chiffres à l'écran
        updateDigits () {
            const len = Phaser.Utils.String.Pad(blitter.children.list.length.toString(), 7, '0', 1);
            for (var i = 0; i < this.numbers.length; i++) {
                this.numbers[i].setFrame(len[i]);
            }
        }

        // 6) Méthode de redimensionnement
        resizeGame() {
            let digitY = window.innerHeight - 100;
            for (var i = 0; i < this.numbers.length; i++) {
                this.numbers[i].y = digitY;
            }
        }
    }

  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Largeur initiale basée sur la fenêtre du navigateur
    height: window.innerHeight, // Hauteur initiale basée sur la fenêtre du navigateur
    scene: Example,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE, // Active le redimensionnement automatique
      parent: "gameContainer", // Optionnel: ID de l'élément conteneur du jeu
      width: "200%", // hack for android 7 moto g5
      height: "200%", // allow rotating works nicely
    },
  };


  
    // 🕹️ Création du jeu
    const game = new Phaser.Game(config);
}



// Code de run

function run(mainFunction) {
  // création espace de dessin phaser
  addDiv('<div id="gameContainer" style="width:100%; height:100%"></div>');

  // 🚀 Ajout synchrone de la lib Phaser
  syncImport('https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js', mainFunction)

  // 🌐 Fonction d'importation asynchrone
  function syncImport(url, func) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = func;
    document.head.appendChild(script);
  }
}
