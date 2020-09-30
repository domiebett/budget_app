const validUser = {
    id: 1,
    firstName: 'Test',
    lastName: 'Example',
    email: 'text@example.com',
    emailIsVerified: true
}

export const UserFaker = {
    valid: validUser,

    validWithPassword: Object.assign(
        {
            password: 'password'
        }, validUser),

    invalidEmail: {
        firstName: 'Test',
        lastName: 'Example',
        email: 'invalidEmail.com',
        password: 'password',
        emailIsVerified: false
    }
}
