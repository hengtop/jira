import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider children={children} />
    </QueryClientProvider>
  );
};
