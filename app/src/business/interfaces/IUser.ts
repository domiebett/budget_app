export interface IUser {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    emailIsVerified?: boolean,
    password?: string,
}
