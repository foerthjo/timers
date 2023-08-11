const statics = [
	'/', 'favicon.ico', 'manifest.json', 'icon_512.png', 'jsEssentials.js',
	'style.css',
	'validation.js',
	'time.js', 'timerList.js', 'timer.js',
	'days.js', 'minutes.js', 'months.js', 'weeks.js', 'years.js', 'once.js'
];

const cacheName = 'cache_@version';

self.addEventListener('install', (e) => {
	self.skipWaiting();

	e.waitUntil(
		caches.open(cacheName).then(cache => {
			statics.forEach(url => {
				cache.add(url);
			});
		})
	);
});

async function networkFirst(request) {
	try {
		return await fetch(request);
	} catch (e) {}
	return await caches.match(request);
}

self.addEventListener('fetch', async (e) => {
	e.respondWith(networkFirst(e.request));
});

async function cleanCaches() {
	(await caches.keys()).forEach(name => {
		if (name != cacheName) caches.delete(name);
	});
}

self.addEventListener('activate', (event) => {
	event.waitUntil(cleanCaches().then(() => {
		clients.claim();
	}));
});