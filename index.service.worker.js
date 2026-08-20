// Replaces the caching worker that earlier builds installed. It clears every
// cache this origin holds, unregisters itself, and reloads any open page once,
// so a visitor who is stuck on a stale loader recovers without clearing data.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
	event.waitUntil((async () => {
		for (const key of await caches.keys()) {
			await caches.delete(key);
		}
		await self.registration.unregister();
		for (const client of await self.clients.matchAll({ type: "window" })) {
			client.navigate(client.url);
		}
	})());
});
