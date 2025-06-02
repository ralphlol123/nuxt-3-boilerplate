export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAdminAuthStore();
    const { auth } = storeToRefs(authStore); // auth is a ref to the user state in store
    const accessToken = useCookie<string | null | undefined>('auth');

    // Step 1: Ensure session is loaded if a token exists and not already in store.
    // Assumes fetchUserSession updates the store internally or returns user data.
    if (accessToken.value && !auth.value) {
        try {
            const userSession = await authStore.fetchUserSession();
            auth.value = userSession; // Update store state based on fetched session
            if (!userSession) {
                // If session is explicitly null/false after fetch, token might be invalid
                accessToken.value = null; // Clear invalid token
            }
        } catch (error) {
            console.error("Error fetching user session:", error);
            // If fetching fails, treat as unauthenticated. Clear potentially invalid token.
            accessToken.value = null;
            auth.value = null; // Ensure auth state is cleared
        }
    }

    // Step 2: Handle routing based on authentication status and target route.
    const isAuthenticated = !!auth.value && !!accessToken.value; // Check both store and cookie

    if (to.path === '/admin/login') {
        if (isAuthenticated) {
            // User is logged in and trying to access login page, redirect to dashboard.
            // You can change '/admin/dashboard' to your actual admin home page.
            return navigateTo('/admin/dashboard'); 
        }
        // User is not logged in or token is missing, allow access to login page.
        return; // Allow navigation
    }

    // For any other route (assumed to be protected admin routes)
    if (!isAuthenticated) {
        // User is not logged in, redirect to login page.
        return navigateTo('/admin/login');
    }

    // User is logged in, allow access to the protected route.
    // No explicit return navigateTo(to) needed; middleware will allow if no redirect occurs.
});      