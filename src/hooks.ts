import { useContext } from "react";
import { AuthyoContext } from "./context";

export function useAuthyo() {
  const client = useContext(AuthyoContext);
  if (!client) throw new Error("useAuthyo must be used within an AuthyoProvider");
  return client;
}

