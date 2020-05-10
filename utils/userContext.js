import { createContext, useContext } from "react";

export const UserContext = createContext(null);
UserContext.displayName = "UserContext";
export const user = () => useContext(UserContext);
