import { LoopIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../../../../app/utils/cn";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { useTradePlaygroundController } from "./useTradePlaygroundController";

export function TradePlayground() {
  const {
    handleTrade,
    errors,
    register,
    toggleInputCurrency,
    inputCurrency,
    trade,
    isLoading,
  } = useTradePlaygroundController();

  const [isRotate, setIsRotate] = useState<boolean>(false);

  function toggleCurrency() {
    toggleInputCurrency();
    setIsRotate((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <div className="flex flex-col justify-center items-center gap-2">
        <span>
          Currency: <strong>{inputCurrency.toUpperCase()}</strong>
        </span>
        <Button onClick={toggleCurrency} disabled={isLoading}>
          <LoopIcon
            className={cn("transition-all", isRotate && "rotate-180")}
          />
        </Button>
      </div>
      <form onSubmit={handleTrade} className="flex gap-4">
        <Input
          {...register("inputValue", { required: true })}
          type="text"
          placeholder={`Valor em ${inputCurrency}`}
          error={errors.inputValue?.message}
          className="w-[150px] text-center placeholder-shown:text-left"
        />
        <Button type="submit" disabled={isLoading}>
          Converter
        </Button>
      </form>

      {trade && (
        <div className="bg-gray-200 dark:bg-white dark:text-slate-800 rounded-lg p-8 pt-2 scroll-smooth">
          <h3 className="text-xl font-bold text-gray-800">
            Trade: {trade.description}
          </h3>
          <span>Done in {trade.createdAt}</span>
          <div className="mt-4">
            <p>More Info:</p>
            <ul className="ml-4">
              <li>
                <strong>Input:</strong> {trade.inputValue} -{" "}
                <strong>{trade.description.split(" ")[0]}</strong>
              </li>
              <li>
                <strong>Output:</strong> {trade.outputValue} -{" "}
                <strong>{trade.description.split(" ")[2]}</strong>
              </li>
              <li>
                <strong>Info:</strong> 1{" "}
                <strong>{trade.description.split(" ")[0]}</strong> ={" "}
                {trade.currentBidValue}{" "}
                <strong>{trade.description.split(" ")[2]}</strong> - at{" "}
                {trade.currentBidDate}{" "}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
