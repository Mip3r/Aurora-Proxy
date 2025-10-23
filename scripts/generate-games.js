#!/usr/bin/env node
// Generates the top-level games.html by scanning the ./games directory
// Run: node scripts/generate-games.js

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const gamesDir = path.join(repoRoot, 'games');
const outFile = path.join(repoRoot, 'games.html');

function slugToTitle(name){
  // remove extension and replace separators with spaces
  const base = name.replace(/\.html?$/i,'');
  return base.replace(/[-_\.]/g,' ').replace(/\b\w/g, c=>c.toUpperCase());
}

const files = fs.readdirSync(gamesDir).filter(f => f.toLowerCase().endsWith('.html') && f.toLowerCase() !== 'game.html');

const cards = files.map(f => {
  const title = slugToTitle(f);
  const thumb = '../assets/logo.png';
  return `          <div class="game-card">
            <img src="${thumb}" alt="${title}">
            <h3>${title}</h3>
            <div><button onclick="openModal('games/${f}')">Open</button> <a href="games/${f}" target="_blank">New tab</a></div>
          </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Games - SunMoon Proxy</title>
  <link rel="stylesheet" href="assets/style.css">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style> .hero{ padding:22px } </style>
</head>
<body>
  <div class="aurora"></div>
  <div class="app">
    <header class="header">
      <a class="brand" href="index.html">
        <img src="assets/logo.png" alt="logo">
        <div class="name">SunMoon Proxy</div>
      </a>
      <nav class="nav">
        <a href="index.html">Home</a>
        <a href="info.html">Info</a>
      </nav>
    </header>
    <main class="main">
      <section class="hero">
        <div class="title">Games</div>
        <div class="subtitle">Click a game to open it in an embedded view.</div>

        <div class="games-grid" id="gamesGrid">
${cards}
        </div>
      </section>
    </main>
  </div>

  <div id="modalBackdrop" class="modal-backdrop">
    <div class="modal">
      <div class="controls">
        <div class="meta">Game</div>
        <button class="close" onclick="closeModal()">Close</button>
      </div>
      <iframe id="gameFrame" src="about:blank" allowfullscreen></iframe>
    </div>
  </div>

  <script>
    function openModal(url){
      document.getElementById('gameFrame').src = url;
      document.getElementById('modalBackdrop').classList.add('show');
    }
    function closeModal(){
      document.getElementById('gameFrame').src = 'about:blank';
      document.getElementById('modalBackdrop').classList.remove('show');
    }
  </script>
</body>
</html>`;

fs.writeFileSync(outFile, html, 'utf8');
console.log('Generated', outFile, 'with', files.length, 'games');
