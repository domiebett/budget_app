export interface IJWTPayload {
    user: IJWTUser
}

export interface IJWTUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    emailIsVerified: boolean;
}
