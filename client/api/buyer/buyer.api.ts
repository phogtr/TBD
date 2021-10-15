import axios from "../../lib/axios";

export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export const registerRequest = async (body: IRegisterBody) => {
  return await axios.post("/api/register", body);
};

export const loginRequest = async (body: ILoginBody) => {
  return await axios.post("/api/login", body);
};
