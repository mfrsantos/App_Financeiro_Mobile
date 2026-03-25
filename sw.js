const CACHE_NAME = 'controle-financeiro-v1';
// Lista de arquivos com o caminho do repositório
const ASSETS = [
  '/App_Financeiro/',
  '/App_Financeiro/index.html',
  '/App_Financeiro/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});