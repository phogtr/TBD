import axios from "../../lib/axios";

interface NewDestinationBody {
  destination: string;
}

export const getAllDestinationsRequest = async () => {
  return await axios.get("/api/destinations/all-destinations");
};

export const getUnassignedDestinationRequest = async () => {
  return await axios.get("/api/destinations/unassigned-destinations");
};

export const newDestinationRequest = async (body: NewDestinationBody) => {
  return await axios.post("/api/destinations/new-destination", body);
};

export const removeDestinationRequest = async (id: string) => {
  return await axios.delete(`/api/destinations/${id}/delete`);
};
