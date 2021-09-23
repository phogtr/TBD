import { CookieOptions } from "express";

enum TokenExpiration {
  Access = 60 * 60, // 1 hour
  Refresh = 60 * 60 * 24 * 7, // 7 days
}

export const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Access * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Refresh * 1000,
};
