import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { tradesService } from "../../../../../app/services/tradesService";

export function useTradesHistoryController() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeIdBeingDeleted, setTradeIdBeingDeleted] = useState<string>();
  const { userData, refetchUserData } = useAuth();
  const { trades, name } = userData;

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function deleteTrade(tradeId: string) {
    try {
      await tradesService.deleteTrade(tradeId);

      refetchUserData()
    } catch (error){
      console.log(error)
      toast.error('Erro ao deletar trade');
    }
  }

  return {
    trades,
    name,
    deleteTrade,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    setTradeIdBeingDeleted,
    tradeIdBeingDeleted
  }
}
