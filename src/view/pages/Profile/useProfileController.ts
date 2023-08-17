import { useAuth } from "../../../app/hooks/useAuth";

export function useProfileController() {
  const { userData } = useAuth();

  return { userData };
}
