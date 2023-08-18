import { useState } from "react";
import { TradeParam, tradesService } from "../../../../../app/services/tradesService";
import { TradeInterface } from "../../../../../app/utils/interfaces/tradeInterface";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import toast from "react-hot-toast";

type InputCurrencyType = 'usd' | 'gbp';


const schema = z.object({
  inputValue: z.number().positive('The value should be positive')
});

type FormData = z.infer<typeof schema>

export function useTradePlaygroundController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const [inputCurrency, setInputCurrency] = useState<InputCurrencyType>('usd');
  const [trade, setTrade] = useState<TradeInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTrade = hookFormSubmit(async (param: TradeParam) => {
      setIsLoading(true);

      try {
        if(inputCurrency === 'usd') {
          const data = await tradesService.usdTogbp(param);

          setTrade(data);
          return data;
        } else if (inputCurrency === 'gbp') {
          const data = await tradesService.gbpTousd(param);

          setTrade(data);
          return data;
        }
        return 'Erro'
      } catch {
        toast.error('An error ocurred!');
      } finally {
        setIsLoading(false);
      }
  });

  function toggleInputCurrency() {
    setInputCurrency((prevState) => prevState === 'usd' ? 'gbp' : 'usd');
  }

  return {
    inputCurrency,
    handleTrade,
    toggleInputCurrency,
    trade,
    errors,
    register,
    isLoading
  }

}
