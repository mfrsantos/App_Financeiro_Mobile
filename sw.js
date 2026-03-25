const CACHE_NAME = 'finance-app-v1.7.4'; // Versão atualizada para identificação dos gastos variaveis
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Tenta cachear os recursos, ignorando falhas individuais se algum ícone ainda não existir
      return cache.addAll(ASSETS).catch(err => console.log("Aguardando upload dos ícones...", err));
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos (Remove a v1.7.1)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Estratégia Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
