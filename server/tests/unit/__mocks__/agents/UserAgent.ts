import { UserFaker } from "../../../__fakes__/userFakes";
import { mockOrmUser, mockOrmUserWithPassword } from './../entities/User';

export const mockCreateUser = jest.fn().mockReturnValue(mockOrmUser);
export const mockGetUserByEmailWithPassword = jest.fn().mockReturnValue(mockOrmUserWithPassword);

const mock = jest.fn().mockImplementation(() => {
    return {
        createUser: mockCreateUser,
        getUserByEmailWithPassword: mockGetUserByEmailWithPassword,
    }
});

export default mock;
