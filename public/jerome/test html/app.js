




<!DOCTYPE html>
<html lang="en">
  
  <head>
    <meta charset="utf-8" />

    <title>The Super Cool Computer</title>
    
    <meta name="application-name" content="Qwark" />
    <meta name="description" content="Qwark Web Computer" />
    <meta name="viewport" content="viewport-fit=cover,user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>
    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: light)"/>
    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"/>
    <link id="favicon" rel="icon" href="https://cdn.glitch.global/e73a15d2-2f8a-477d-80bc-a6e8167fe97a/icon-computer-512.png?v=1700841061555"/>

    <!-- PWA - manifest -->
    <link rel="manifest" href="manifest.json" />

    <!-- PWA - apple specific -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Qwark" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <link rel="apple-touch-icon" href="https://cdn.glitch.global/e73a15d2-2f8a-477d-80bc-a6e8167fe97a/icon-computer-512.png?v=1700841061555"/>

    <!-- PWA - microsoft specific -->
    <meta name="msapplication-TileColor" content="#0000FF" />
    <meta name="msapplication-TileImage" content="https://cdn.glitch.global/e73a15d2-2f8a-477d-80bc-a6e8167fe97a/icon-computer-512.png?v=1700841061555"/>
  
    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    
    <!-- if not running in localhost or file, force running in https mode -->
    <script src="index-https.js"></script>
    
    <!-- lib : phaser 3.7 -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
    <!-- lib : Code Mirror 6 -->
    <script src="cm6.bundle.min.js"></script>
    
    <!-- PWA - service worker registration-->
    <script src="index-sw.js"></script>
 
    <link rel="stylesheet" type="text/css" href="index.css">
  </head>
  
  <body>
    <!-- UI -->    
    <div id="toolbar" class="toolbar">
      <button id="loadButton" class="toolbar-btn" title="Charger une application"><i class="fas fa-cloud-download-alt"></i></button>
      <!--button id="runButton" class="toolbar-btn" title="Exécuter le code"><i class="fas fa-play"></i></button-->
      <button id="saveButton" class="toolbar-btn" title="Sauvegarder le projet"><i class="fas fa-cloud-upload-alt"></i></button>
      <button id="linkButton" class="toolbar-btn" title="lien"><i class="fas fa-link"></i></button>
      <button id="zoomOutButton" class="toolbar-btn" title="Réduire la police"><i class="fas fa-search-minus"></i></button>
      <button id="zoomInButton" class="toolbar-btn" title="Agrandir la police"><i class="fas fa-search-plus"></i></button>
      <button id="newProjectButton" class="toolbar-btn" title="Nouveau projet"><i class="fas fa-plus"></i></button>
      <button id="settingsButton" class="toolbar-btn" title="Paramètres"><i class="fas fa-cog"></i></button>
    </div>
    
    <button id="actionButton" class="toolbar-btn"><i class="fas fa-code"></i></button>
    
    <div id="editor"></div>
    <div id="ui"><div id="gameContainer" style="width:100%; height:100%"></div></div>
    <div id="console-messages"></div>
    
    <div id="progressBar" style="display: none;"></div>

    <div class="appsList-container"></div>

    <!-- main script -->    
    <script src="index.js"></script>
  </body>
  
</html>