import axios from "../../lib/axios";

export const getAllTicketsRequest = async () => {
  return await axios.get("/api/all-tickets");
};
