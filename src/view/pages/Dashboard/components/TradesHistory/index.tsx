import { AlertModal } from "../../../../components/AlertModal";
import { Button } from "../../../../components/Button";
import { useTradesHistoryController } from "./useTradesHistoryController";

export function TradesHistory() {
  const {
    trades,
    name,
    deleteTrade,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useTradesHistoryController();

  return (
    <div>
      <p className="mb-4">{name} Trades History</p>

      <div className="overflow-y-scroll h-[550px] md:max-h-[700px] md:h-full">
        {trades &&
          trades.map((trade) => (
            <div
              key={trade.id}
              className="border border-gray-200 mb-4 p-4 rounded-lg"
            >
              <ul>
                <li>Direction: {trade.description}</li>
                <li>
                  Input: {trade.inputValue} - {trade.description.split(" ")[0]}
                </li>
                <li>
                  Output: {trade.outputValue} -{" "}
                  {trade.description.split(" ")[2]}
                </li>
                <li>
                  Currency value in the trade moment: {trade.currentBidValue} -{" "}
                  {trade.currentBidDate}
                </li>
                <li>Date of trade: {trade.createdAt}</li>
              </ul>

              <div className="flex justify-end">
                <Button
                  onClick={handleOpenModal}
                  className="bg-red-500 hover:bg-red-300 mt-4"
                >
                  deletar
                </Button>
                <AlertModal
                  open={isModalOpen}
                  handleClose={handleCloseModal}
                  description="Tem certeza que deseja deletar esse trade?"
                  title="Deletar trade"
                  onConfirm={() => deleteTrade(trade.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
