import axios from "../../lib/axios";

export const getAllDestinationsRequest = async () => {
  return await axios.get("/api/all-locations");
};
