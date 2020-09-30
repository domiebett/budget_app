import UserAgent, { mockCreateUser, mockGetUserByEmailWithPassword } from '../__mocks__/agents/UserAgent';
import { AuthController } from '../../../src/controllers/AuthController';
import JWT, { mockToken } from '../__mocks__/libs/JWT';
import { UserFaker } from '../../__fakes__/userFakes';

describe('Auth Controller Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('#signup should return a successful message', async () => {
        const authController = new AuthController(new UserAgent(), new JWT());

        const response = await authController.signup(UserFaker.valid);
        const expected = { message: 'Sign Up successful...!!', success: true };

        expect(mockCreateUser).toHaveBeenCalledTimes(1);
        expect(response).toEqual(expected);
    });

    it('#signin should return an authentication token and the user', async () => {
        const authController = new AuthController(new UserAgent(), new JWT());

        const response = await authController.signin(UserFaker.valid);
        const expected = { token: mockToken, user: UserFaker.valid, success: true }

        expect(mockGetUserByEmailWithPassword).toHaveBeenCalledTimes(1);
        expect(mockGetUserByEmailWithPassword).toHaveBeenCalledWith(UserFaker.valid.email);

        expect(response).toEqual(expected);
    });
});
