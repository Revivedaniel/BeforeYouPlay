import decode from 'jwt-decode';

class AuthService {
    public getProfile() {
        return decode(this.getToken() as string);
    }

    public loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    private isTokenExpired(token: string) {
        try {
            const decoded: { exp: number } = decode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    }

    private getToken() {
        return localStorage.getItem('id_token');
    }

    public login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
        // window.history.back();
    }

    public logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
