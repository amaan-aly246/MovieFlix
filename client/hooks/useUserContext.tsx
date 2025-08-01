import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
