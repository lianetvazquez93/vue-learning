import axios from "axios";

export const getMessage = async () => {
  const response = await axios.get("http://localhost:3000/message");
  return response.data;
};
