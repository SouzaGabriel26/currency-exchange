import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./Router";
import { AuthProvider } from "./app/contexts/AuthContext";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster position="bottom-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
