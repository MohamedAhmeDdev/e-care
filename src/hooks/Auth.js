import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const UseAuthContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("UseAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};