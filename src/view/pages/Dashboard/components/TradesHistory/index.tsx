import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { AlertModal } from '../../../../components/AlertModal';
import { Button } from '../../../../components/Button';
import { useTradesHistoryController } from './useTradesHistoryController';

export function TradesHistory() {
  const {
    trades,
    name,
    deleteTrade,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    setTradeIdBeingDeleted,
    tradeIdBeingDeleted,
    isTradeBeingDeleted,
  } = useTradesHistoryController();

  return (
    <div>
      <p className="mb-4 font-bold text-center">{name} - Histórico de Trades</p>

      <div className="overflow-y-auto h-[550px] md:max-h-[700px] md:h-full">
        {trades &&
          trades.map((trade) => (
            <div
              key={trade.id}
              className="border border-slate-800 dark:border-gray-200 mb-4 p-4 rounded-lg max-w-2xl mx-auto"
            >
              <ul className="space-y-1">
                <li className="mb-2 font-bold text-center text-xl">
                  {trade.description}
                </li>
                <li className="bg-slate-300 dark:bg-slate-500 px-2 py-1 rounded-lg">
                  Entrada:{' '}
                  {formatCurrency(
                    trade.inputValue,
                    trade.description.split(' ')[1]
                  )}
                </li>
                <li className="bg-slate-300 dark:bg-slate-500 px-2 py-1 rounded-lg">
                  Saida:{' '}
                  {formatCurrency(
                    trade.outputValue,
                    trade.description.split(' ')[3]
                  )}
                </li>
                <li className="bg-slate-300 dark:bg-slate-500 px-2 py-1 rounded-lg">
                  Valor do <strong>{trade.description.split(' ')[1]}</strong>:{' '}
                  {formatCurrency(
                    Number(trade.currentBidValue),
                    trade.description.split(' ')[1]
                  )}{' '}
                  - {trade.currentBidDate}
                </li>
                <li className="bg-slate-300 dark:bg-slate-500 px-2 py-1 rounded-lg">
                  Data da ação: {trade.createdAt}
                </li>
              </ul>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setTradeIdBeingDeleted(trade.id);
                    handleOpenModal();
                  }}
                  className="bg-red-500 hover:bg-red-300 mt-4"
                >
                  deletar
                </Button>
              </div>
            </div>
          ))}
        <AlertModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          description="Tem certeza que deseja deletar esse trade?"
          title="Deletar trade"
          onConfirm={() => deleteTrade(tradeIdBeingDeleted as string)}
          disabled={isTradeBeingDeleted}
        />
      </div>
    </div>
  );
}
