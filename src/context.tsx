import { createContext } from "react";
import { AuthyoClient } from "@authyo/auth-js";

export const AuthyoContext = createContext<AuthyoClient | null>(null);

