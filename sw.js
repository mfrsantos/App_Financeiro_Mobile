// Versão do Cache - Altere este número (ex: v1.1, v1.2) toda vez que subir código novo
const CACHE_NAME = 'financeiro-app-v1.1';
const ASSETS = [
  '/App_Financeiro_Mobile/',
  '/App_Financeiro_Mobile/index.html',
  '/App_Financeiro_Mobile/manifest.json',
  // Adicione aqui outros arquivos como ícones se houver, ex: 'icon.png'
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto!');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Força o novo Service Worker a assumir o controle imediatamente
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Limpando cache antigo...', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Busca: Tenta o cache primeiro, se não tiver, vai na rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
