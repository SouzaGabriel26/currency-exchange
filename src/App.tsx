import { Toaster } from "react-hot-toast"
import { Router } from "./Router"
import { AuthProvider } from "./app/contexts/AuthContext"

export function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster position="bottom-center" />
    </AuthProvider>
  )
}
