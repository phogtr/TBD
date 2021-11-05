import axios from "../../lib/axios";

interface ICreateTicketBody {
  location: string;
}

export const getAllTicketsRequest = async () => {
  return await axios.get("/api/all-tickets");
};

export const createTicketRequest = async (body: ICreateTicketBody) => {
  return await axios.post("/api/create-ticket", body);
};

export const deleteTicketRequest = async (id: string) => {
  return await axios.delete(`/api/ticket/${id}`);
};
