import axios from "../../lib/axios";

interface INewDestinationBody {
  destination: string;
}

export const getAllDestinationsRequest = async () => {
  return await axios.get("/api/all-destinations");
};

export const getAvailableDestinationRequest = async () => {
  return await axios.get("/api/available-destinations");
};

export const newDestinationRequest = async (body: INewDestinationBody) => {
  return await axios.post("/api/new-destination", body);
};
