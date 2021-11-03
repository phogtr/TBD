import axios from "../../lib/axios";

export const getAllDestinationsRequest = async () => {
  return await axios.get("/api/all-locations");
};

export const getAvailableDestinationRequest = async () => {
  return await axios.get("/api/available-locations");
};
