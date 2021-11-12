import axios from "../../lib/axios";

interface ICreateTicketBody {
  destinationId: string;
}

export const getAllTicketsRequest = async () => {
  return await axios.get("/api/ticket/all-tickets");
};

export const createTicketRequest = async (body: ICreateTicketBody) => {
  return await axios.post("/api/ticket/create-ticket", body);
};

export const deleteTicketRequest = async (id: string) => {
  return await axios.delete(`/api/ticket/${id}/delete`);
};
