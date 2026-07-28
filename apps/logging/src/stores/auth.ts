import { writable, derived, get, type Readable } from 'svelte/store';
import { createAuth0Client, type Auth0Client, type User } from '@auth0/auth0-spa-js';
import { browser } from '$app/environment';

export const auth0Client = writable<Auth0Client | null>(null);
export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);
export const isLoading = writable(true);
export const error = writable<string | null>(null);

export const isLoggedIn: Readable<boolean> = derived(
	[isAuthenticated, isLoading],
	([$isAuthenticated, $isLoading]) => $isAuthenticated && !$isLoading
);

function getRedirectUri() {
	return `${window.location.origin}/auth/callback`;
}

export async function initializeAuth() {
	if (!browser) return;

	isLoading.set(true);

	try {
		let client = get(auth0Client);

		if (!client) {
			client = await createAuth0Client({
				domain: import.meta.env.VITE_AUTH0_DOMAIN,
				clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
				authorizationParams: {
					redirect_uri: getRedirectUri()
				},
				useRefreshTokens: true,
				cacheLocation: 'localstorage',
				useCookiesForTransactions: true
			});

			auth0Client.set(client);
		}

		const authenticated = await client.isAuthenticated();

		isAuthenticated.set(authenticated);

		console.log('AUTHENTICATED:', authenticated);

		const userData = await client.getUser();

		console.log('USER DATA:', userData);

		if (authenticated) {
			user.set((await client.getUser()) ?? null);
		} else {
			user.set(null);
		}

		error.set(null);
	} catch (err) {
		console.error(err);

		error.set(err instanceof Error ? err.message : 'Authentication initialization failed');
	} finally {
		isLoading.set(false);
	}
}

export async function handleCallback() {
	const client = get(auth0Client);

	if (!client) {
		throw new Error('Auth0 client has not been initialized.');
	}

	await client.handleRedirectCallback();

	const authenticated = await client.isAuthenticated();

	isAuthenticated.set(authenticated);

	if (authenticated) {
		user.set((await client.getUser()) ?? null);
	}
}

export async function login() {
	const client = get(auth0Client);

	if (!client) {
		throw new Error('Auth0 client has not been initialized.');
	}

	await client.loginWithRedirect();
}

export async function logout() {
	const client = get(auth0Client);

	if (!client) return;

	client.logout({
		logoutParams: {
			returnTo: window.location.origin
		}
	});
}

export async function getToken(): Promise<string | null> {
	const client = get(auth0Client);

	if (!client) return null;

	try {
		return await client.getTokenSilently();
	} catch (err: any) {
		if (err.error === 'login_required') {
			await login();
		}

		return null;
	}
}
