export const mockToken = 'jwt.token';

export const mockSign = jest.fn().mockReturnValue(mockToken);

const mock = jest.fn().mockImplementation(() => {
    return {
        sign: mockSign
    }
});

export default mock;