import axios from "../../lib/axios";

export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}

export const registerRequest = async (body: IRegisterBody) => {
  return await axios.post("/api/register", body);
};
