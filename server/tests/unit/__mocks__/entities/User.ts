import { UserFaker } from "../../../__fakes__/userFakes";

export const mockIsValidPassword = jest.fn().mockReturnValue(true);
export const mockFindByEmailWithPassword = jest.fn().mockReturnThis();

export const mockOrmUserWithPassword = Object.assign(
    {
        isValidPassword: mockIsValidPassword,
        findByEmailWithPassword: mockFindByEmailWithPassword
    }, UserFaker.validWithPassword);

export const mockOrmUser = Object.assign(
    {
        isValidPassword: mockIsValidPassword,
        findByEmailWithPassword: mockFindByEmailWithPassword
    }, UserFaker.valid);
