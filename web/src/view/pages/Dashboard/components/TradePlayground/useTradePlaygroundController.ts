import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { TradeInterface } from "../../../../../app/utils/interfaces/tradeInterface";
import { serviceByCurrency } from '../../../../../app/utils/serviceByCurrency';

type InputCurrencyType = 'usd' | 'gbp' | 'brl';

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
  const [outputCurrency, setOutputCurrency] = useState<InputCurrencyType>('brl');
  const [trade, setTrade] = useState<TradeInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refetchUserData } = useAuth();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleTrade = hookFormSubmit(async (param: { inputValue: string }) => {
      setIsLoading(true);
      const convertedValue = parseFloat(param.inputValue.replace(',', '.'));

      try {
        const data = await serviceByCurrency(inputCurrency, outputCurrency, convertedValue);
        setTrade(data);
        refetchUserData()
      } catch {
        toast.error('An error ocurred!');
      } finally {
        setIsLoading(false);
      }
  });

  function handleSelectInputCurrency(value: string) {
    setInputCurrency(value as InputCurrencyType);
  }

  function handleSelectOutputCurrency(value: string) {
    setOutputCurrency(value as InputCurrencyType);
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
    handleSelectInputCurrency,
    trade,
    errors,
    register,
    isLoading,
    copyTextToClipboard,
    isCopied,
    handleSelectOutputCurrency,
    outputCurrency
  }

}
