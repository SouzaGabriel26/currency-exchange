import { useAuth } from "../../../../../app/hooks/useAuth";

export function useTradesHistoryController() {
  const { userData } = useAuth();
  const { trades, name } = userData;

  return {
    trades,
    name
  }
}
