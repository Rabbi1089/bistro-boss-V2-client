import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://bisrto-boss-server-v2.vercel.app",
});
const useAxiousPublic = () => {
  return axiosPublic;
};

export default useAxiousPublic;
