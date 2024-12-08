import { useContext } from "react";
import { socketContext } from "../socketContext.jsx";

export const useSocketContext = () => {
  return useContext(socketContext);
};