import axios from "../../lib/axios";

export const getAllLocationsRequest = async () => {
  return await axios.get("/api/all-locations");
};
