import axios from "../../lib/axios";

interface INewDestinationBody {
  destination: string;
}

export const getAllDestinationsRequest = async () => {
  return await axios.get("/api/destinations/all-destinations");
};

export const getAvailableDestinationRequest = async () => {
  return await axios.get("/api/destinations/available-destinations");
};

export const newDestinationRequest = async (body: INewDestinationBody) => {
  return await axios.post("/api/destinations/new-destination", body);
};

export const removeDestinationRequest = async (id: string) => {
  return await axios.delete(`/api/destinations/${id}/delete`);
};
