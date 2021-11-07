import axios from "../../lib/axios";

interface INewDestinationBody {
  name: string;
}

export const getAllDestinationsRequest = async () => {
  return await axios.get("/api/all-locations");
};

export const getAvailableDestinationRequest = async () => {
  return await axios.get("/api/available-locations");
};

export const newDestinationRequest = async (body: INewDestinationBody) => {
  return await axios.post("/api/new-location", body);
};
