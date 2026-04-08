declare module '#auth-utils' {
    interface User {
        name: string;
        email: string;
        password?: string;
    }

    interface UserSession {
        user: User
    }
}