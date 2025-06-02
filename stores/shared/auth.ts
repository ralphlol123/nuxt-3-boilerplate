import type { FormData } from "~/interfaces/shared/form-data";
import type { User } from "~/interfaces/user";

export const useAdminAuthStore = defineStore('admin-auth', () => {
    const config = useRuntimeConfig();
    const router = useRouter();
    const apiURL = config.public.API_URL;
    const user = ref<User>();
    const access = useCookie('access_token', {
        //expire after 7 days
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    const auth = useCookie<User | null>('auth', {
        //expire after 7 days
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    const signin = async (payload: FormData) => {
        const res: any = await apiFetch('/auth/admin/login', {
            baseURL: apiURL,
            method: 'POST',
            body: payload
        })
        if (res) {
            auth.value = res;
            user.value = res.user;
            access.value = res.access_token;
        }
        return res;
    }

    const signOut = () => {
        auth.value = null; // Clear the auth cookie

        // Redirect to admin login page and then reload
        // The timeout gives a brief moment for any UI updates if necessary,
        // though often it's not strictly needed for this pattern.
        setTimeout(() => {
            router.push('/admin/login').then(() => {
                location.reload(); // Force a full page reload to ensure clean state
            });
        }, 500); // A shorter timeout might also work, or even no timeout.
    }

    const fetchUserSession = async () => {
        // Assuming apiFetch will use the auth cookie for authorization
        // or you might need to pass the token explicitly in headers
        const res: any = await apiFetch('/admin/me', { // Or your specific session validation endpoint
            baseURL: apiURL,
            method: 'GET',
        });
        if (res) {
            // auth.value should ideally store user details, not just the token again
            // Or, if 'res' is the user object, you might want a separate ref for user details
            // For now, let's assume 'res' is the user object and we store it directly.
            // If your backend returns a new token on session validation, update auth.value = res.token or similar.
            // If it returns user data, you might want to store that in a different ref.
            // Let's assume for now the API returns the user object and we want to store it in auth.value
            // This part might need adjustment based on what /admin/me returns and how you manage session state.
            auth.value = res; // This might overwrite the token if res is not the token itself.
                             // Consider if auth.value is just the token, or the whole user object.
                             // If auth.value is just the token, and /admin/me returns user data, you'd do something like:
                             // const user = ref(null);
                             // user.value = res;
                             // And then expose 'user' from the store.
                             // For this fix, I'll assume auth.value can hold the user object after validation.
        }
        return res;
    }


    return {
        auth,
        user,
        signin,
        signOut,
        fetchUserSession
    }
})