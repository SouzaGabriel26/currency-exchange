import toast from "react-hot-toast";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { tradesService } from "../../../../../app/services/tradesService";

export function useTradesHistoryController() {
  const { userData, removeTrade } = useAuth();
  const { trades, name } = userData;


  async function deleteTrade(tradeId: string) {
    try {
      await tradesService.deleteTrade(tradeId);

      removeTrade(tradeId);
    } catch (error){
      console.log(error)
      toast.error('Error on delete a trade');
    }
  }

  return {
    trades,
    name,
    deleteTrade
  }
}
