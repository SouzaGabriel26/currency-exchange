import { useAuth } from "../../../app/hooks/useAuth"

export function Dashboard() {
  const { signout } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={signout}>Sair</button>
    </>
  )
}
