declare module '#auth-utils' {
    interface User {
        name: string;
        email: string;
    }

    interface UserSession {
        user: User
    }
}