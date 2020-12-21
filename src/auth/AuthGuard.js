import { getInstance } from './Auth0';

export const AuthGuard = (to, _from, next) => {
    const authService = getInstance();

    const fn = () => {
        if ('/authorized' === to.path) {
            try {
                authService.handleRedirectCallback(to.fullPath)
                next({ name: 'dashboard' });
            } catch (err) {
                authService.logout();
            }
        }

        if ('/login' === to.path) {
            if (authService.isAuthenticated) {
                next({ name: 'dashboard' });
            } else {
                authService.logout();
            }
        }

        if ('/logout' === to.path) {
            authService.logout();
        }

        if ('/welcome' === to.path) {
            if (authService.user.finished_registration) {
                next({ name: 'dashboard' });
            } else {
                next();
            }
        }

        if (authService.isAuthenticated) {
            if (!authService.user.finished_registration && to.path !== '/welcome') {
                next({ name: 'welcome' });
            } else {
                next();
            }
        } else {
            authService.login();
        }
    };

    // If loading has already finished, check our auth state using `fn()`
    if (!authService.loading) {
        return fn();
    }

    // Watch for the loading property to change before we check isAuthenticated
    authService.$watch('loading', loading => {
        if (loading === false) {
            return fn();
        }
    });
};
