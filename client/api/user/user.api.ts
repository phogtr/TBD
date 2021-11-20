import axios from "../../lib/axios";

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export const registerRequest = async (body: RegisterBody) => {
  return await axios.post("/api/register", body);
};

export const loginRequest = async (body: LoginBody) => {
  return await axios.post("/api/login", body);
};

export const refreshTokenRequest = async (cookie?: string) => {
  return await axios.post("/refresh-token", undefined, {
    headers: { cookie: cookie },
  });
};
