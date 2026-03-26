// ERP Finanças MS Informática - Update Versão 1.9.7
// Ajuste de Renda Extra e Renomeação do Sistema
const CACHE_NAME = 'erp-ms-financas-v1.9.7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. Instalação: Cacheia os arquivos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW MS Informática: Cacheando arquivos essenciais');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Ativação: Limpeza agressiva de caches antigos (Finance-App v1.7.4 e anteriores)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('SW MS Informática: Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Estratégia Fetch: Network-First (Tenta internet, se falhar usa o cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
