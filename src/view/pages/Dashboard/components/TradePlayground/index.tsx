import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { useTradePlaygroundController } from "./useTradePlaygroundController";
import { LoopIcon } from '@radix-ui/react-icons';

export function TradePlayground() {

  const {
    handleTrade,
    errors,
    register,
    toggleInputCurrency,
    inputCurrency,
    trade,
    isLoading
  } = useTradePlaygroundController();

  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <div className="flex flex-col justify-center items-center gap-2">
        <span>Currency: <strong>{inputCurrency.toUpperCase()}</strong></span>
        <Button onClick={toggleInputCurrency} disabled={isLoading}>
          <LoopIcon />
        </Button>
      </div>
      <form onSubmit={handleTrade} className="flex gap-4">
        <Input
          {...register('inputValue', { required: true })}
          type="text" placeholder={`Valor em ${inputCurrency}`}
          error={errors.inputValue?.message}
          className="w-[150px] text-center placeholder-shown:text-left"
          />
        <Button type="submit" disabled={isLoading}>Converter</Button>
      </form>

      {
        trade && (
          <div className="bg-gray-200 rounded-lg p-8 pt-2">
            <h3 className="text-xl font-bold text-gray-800">Trade: {trade.description}</h3>
            <span>Done in {trade.createdAt}</span>
            <div className="mt-4">
              <p>More Info:</p>
              <ul className="ml-4">
                <li><strong>Input:</strong> {trade.inputValue} - <strong>{trade.description.split(' ')[0]}</strong></li>
                <li><strong>Output:</strong> {trade.outputValue} - <strong>{trade.description.split(' ')[2]}</strong></li>
                <li><strong>Currency info in the trade moment:</strong> {trade.currentBidValue} <strong>{trade.description.split(' ')[0]}</strong> - {trade.currentBidDate} </li>
              </ul>
            </div>
          </div>
        )
      }
    </div>
  )
}
