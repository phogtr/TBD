import axios from "../../lib/axios";

interface CreateTicketBody {
  destinationId: string;
}

export const getAllTicketsRequest = async () => {
  return await axios.get("/api/ticket/all-tickets");
};

export const getAvailableTicketsRequest = async () => {
  return await axios.get("/api/ticket/available-tickets");
};

export const createTicketRequest = async (body: CreateTicketBody) => {
  return await axios.post("/api/ticket/create-ticket", body);
};

export const sellTicketRequest = async (id: string) => {
  return await axios.patch(`/api/ticket/${id}/sell`);
};

export const deleteTicketRequest = async (id: string) => {
  return await axios.delete(`/api/ticket/${id}/delete`);
};
