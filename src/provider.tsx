import React, { PropsWithChildren, useMemo } from "react";
import { AuthyoClient, AuthyoClientConfig } from "@authyo/auth-js";
import { AuthyoContext } from "./context";

export interface AuthyoProviderProps extends Partial<AuthyoClientConfig> {
  /** Pass an existing client if you want to manage it yourself */
  client?: AuthyoClient;
}

export const AuthyoProvider: React.FC<PropsWithChildren<AuthyoProviderProps>> = ({
  client,
  children,
  ...config
}) => {
  const value = useMemo(() => {
    if (client) return client;
    if (!config.clientId || !config.clientSecret) {
      throw new Error("AuthyoProvider: clientId and clientSecret are required if no client is provided.");
    }
    return new AuthyoClient({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      baseUrl: config.baseUrl
    });
  }, [client, config.clientId, config.clientSecret, config.baseUrl]);

  return <AuthyoContext.Provider value={value}>{children}</AuthyoContext.Provider>;
};

