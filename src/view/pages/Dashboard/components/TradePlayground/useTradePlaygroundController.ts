import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { tradesService } from "../../../../../app/services/tradesService";
import { TradeInterface } from "../../../../../app/utils/interfaces/tradeInterface";

type InputCurrencyType = 'usd' | 'gbp';

const schema = z.object({
  inputValue: z.string().refine(value => {
    const floatValue = parseFloat(value.replace(',', '.')); // Converte vírgulas para pontos
    return !isNaN(floatValue); // Verifique se o valor é um número válido
  }, {
    message: 'Enter a valid number'
  })
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
  const { refetchUserData } = useAuth();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleTrade = hookFormSubmit(async (param: { inputValue: string }) => {
      setIsLoading(true);
      const convertedValue = parseFloat(param.inputValue.replace(',', '.'));

      try {
        if(inputCurrency === 'usd') {
          const data = await tradesService.usdTogbp({ inputValue: convertedValue });

          setTrade(data);
          refetchUserData()
          return data;
        } else if (inputCurrency === 'gbp') {
          const data = await tradesService.gbpTousd({ inputValue: convertedValue });

          setTrade(data);
          refetchUserData()
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

  async function copyTextToClipboard(text: string) {
    setIsCopied(true);
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  useEffect(() => {
    function cleanCopyTextToClipboard() {
      setIsCopied(false);
    }

    const timeout = setTimeout(cleanCopyTextToClipboard, 2000);

    return () => {
      clearTimeout(timeout);
    }
  }, [ isCopied ]);

  return {
    inputCurrency,
    handleTrade,
    toggleInputCurrency,
    trade,
    errors,
    register,
    isLoading,
    copyTextToClipboard,
    isCopied
  }

}
