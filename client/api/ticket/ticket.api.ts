import { IncomingMessage } from "http";
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

export const getUsersTicketsRequest = async (req: IncomingMessage) => {
  return await axios.get("/api/ticket/users-tickets", { headers: { cookie: req.headers.cookie } });
};

export const createTicketRequest = async (body: CreateTicketBody) => {
  return await axios.post("/api/ticket/create-ticket", body);
};

export const sellTicketRequest = async (id: string) => {
  return await axios.patch(`/api/ticket/${id}/sell`);
};

export const buyTicketRequest = async (id: string) => {
  return await axios.patch(`/api/ticket/${id}/buy`);
};

export const deleteTicketRequest = async (id: string) => {
  return await axios.delete(`/api/ticket/${id}/delete`);
};
