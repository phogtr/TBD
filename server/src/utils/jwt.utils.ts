import { sign, verify } from "jsonwebtoken";

const privateAccessToken = process.env.ACCESS_TOKEN_SECRET!;
const privateRefreshToken = process.env.REFRESH_TOKEN_SECRET!;
const accessTokenTime = process.env.ACCESS_TOKEN_TIME!;
const refreshTokenTime = process.env.REFRESH_TOKEN_TIME!;

export function createAccessToken(payload: Object) {
  return sign(payload, privateAccessToken, { expiresIn: accessTokenTime });
}

export function createRefreshToken(payload: Object) {
  return sign(payload, privateRefreshToken, { expiresIn: refreshTokenTime });
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = verify(token, privateAccessToken);
    return {
      payload: decoded,
    };
  } catch (error) {
    return {
      payload: null,
    };
  }
}
