//Update Versão 1.7.7 - Correção tabelas fixas e variaveis
const CACHE_NAME = 'finance-app-v1.7.4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. Instalação: Força o cache de todos os recursos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Cacheando arquivos essenciais para instalação');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Ativação: Limpa caches antigos imediatamente
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('SW: Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Estratégia Fetch: Network-First com Fallback para Cache
// Isso garante que o app use o código novo se houver internet, 
// mas não quebre se estiver offline (essencial para o botão de instalação)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
