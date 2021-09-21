import axios from "axios";
import { server } from "../config/index";

const instance = axios.create({ baseURL: server, withCredentials: true });

export default instance;
