import { useTradesHistoryController } from "./useTradesHistoryController"

export function TradesHistory() {
  const { trades, name } = useTradesHistoryController();

  return (
    <div>
      <p className="mb-4">{name} Trades History</p>

      <div className="overflow-y-scroll max-h-[750px]">

      {
        trades && trades.map(trade => (
          <ul
          key={trade.id}
          className="border border-gray-200 mb-4 p-4 rounded-lg"
          >
              <li>Direction: {trade.description}</li>
              <li>Input: {trade.inputValue} - {trade.description.split(' ')[0]}</li>
              <li>Output: {trade.outputValue} - {trade.description.split(' ')[2]}</li>
              <li>Currency value in the trade moment: {trade.currentBidValue} - {trade.currentBidDate}</li>
              <li>Date of trade: {trade.createdAt}</li>
          </ul>
        ))
      }

      </div>
    </div>
  )
}
