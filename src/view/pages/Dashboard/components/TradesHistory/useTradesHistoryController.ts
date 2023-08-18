import { useCallback, useEffect, useState } from "react";
import { tradesService } from "../../../../../app/services/tradesService";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { TradeInterface } from "../../../../../app/utils/interfaces/tradeInterface";
import toast from "react-hot-toast";
import { useTradePlaygroundController } from "../TradePlayground/useTradePlaygroundController";

export function useTradesHistoryController() {
  const { userData } = useAuth();
  const { id, name } = userData;
  const { handleTrade } = useTradePlaygroundController();

  const [trades, setTrades] = useState<TradeInterface[]>([]);

  const getAllTrades = useCallback(async () => {

    try {
      if (id) {
        const data = await tradesService.getAllbyUser(id);

        console.log(data);
        setTrades(data);
      }
    } catch {
      toast.error('An error occurred while getting all your trades');
    }

  }, [id]);

  useEffect(() => {
    getAllTrades();
  }, [getAllTrades, handleTrade]);

  return {
    trades,
    name
  }
}
