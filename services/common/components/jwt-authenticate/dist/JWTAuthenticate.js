"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const routing_controllers_1 = require("routing-controllers");
const tokenHeader = 'authorization';
/**
 * Authorization express middleware function.
 */
exports.authorize = () => {
    return authorizeUser;
};
/**
 * Authorize user using JWT or throw error if token is invalid
 * @param req - request object
 * @param res - response object
 * @param next - next function
 * @throws { AuthorizationError }
 */
const authorizeUser = (req, res, next) => {
    try {
        const token = exports.getToken(req);
        if (!token)
            throw new AuthorizationError('Invalid JWT Token: Please ensure your token begins with "Bearer *****"');
    }
    catch (error) {
        return next(error);
    }
    next();
};
/**
 * Get the current user from token
 * @param token - jwt token
 * @return { Promise<Payload> }
 */
exports.getCurrentUser = (token) => __awaiter(this, void 0, void 0, function* () {
    return exports.getPayloadFromToken(token);
});
/**
 * Check validitiy of token.
 * @param token - jwt token
 * @return { object | boolean }
 */
exports.isValidToken = (token) => __awaiter(this, void 0, void 0, function* () {
    try {
        const payload = exports.getPayloadFromToken(token);
        return payload ? true : false;
    }
    catch (error) {
        return false;
    }
});
/**
 * Get the id of current JWT logged in user from request object
 * @param req - request object
 * @return {number}
 */
exports.getUserIdFromRequest = (req) => __awaiter(this, void 0, void 0, function* () {
    const token = exports.getToken(req);
    const userPayload = exports.getPayloadFromToken(token);
    return userPayload.id;
});
/**
 * Retrieves the User id from the jwt token
 * @param token - jwt token
 */
exports.getPayloadFromToken = (token) => {
    try {
        if (!process.env.APP_SECRET)
            throw new AuthorizationError('Invalid App Secret: Please set an "APP_SECRET" env variable');
        const payload = jwt.verify(token, process.env.APP_SECRET);
        // Error will be caught for a more descriptive error;
        if (!payload || !payload.user)
            throw new Error();
        return payload.user;
    }
    catch (error) {
        throw new AuthorizationError('Invalid JWT Token: Please provide a valid token for authorization');
    }
};
/**
 * Get the token from the request object
 * @param req - request object
 */
exports.getToken = (req) => {
    const bearerToken = req.headers[tokenHeader];
    if (!bearerToken)
        return null;
    return bearerToken.split(' ')[1];
};
class AuthorizationError extends routing_controllers_1.HttpError {
    constructor(message) {
        super(401, message);
        this.name = 'AuthorizationError';
        this.status = 401;
        this.error = true;
    }
}
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=JWTAuthenticate.js.map