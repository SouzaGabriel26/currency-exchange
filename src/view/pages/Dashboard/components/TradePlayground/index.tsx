import { LoopIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { useTradePlaygroundController } from './useTradePlaygroundController';

export function TradePlayground() {
  const {
    handleTrade,
    errors,
    register,
    toggleInputCurrency,
    inputCurrency,
    trade,
    isLoading,
    copyTextToClipboard,
    isCopied,
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
          Moeda: <strong>{inputCurrency.toUpperCase()}</strong>
        </span>
        <Button onClick={toggleCurrency} disabled={isLoading}>
          <LoopIcon
            className={cn('transition-all', isRotate && 'rotate-180')}
          />
        </Button>
      </div>
      <form onSubmit={handleTrade} className="flex gap-4">
        <Input
          {...register('inputValue', { required: true })}
          type="text"
          placeholder={`Valor em ${inputCurrency}`}
          error={errors.inputValue?.message}
          className="w-[150px] text-center placeholder-shown:text-left"
        />
        <Button type="submit" disabled={isLoading}>
          Converter para {inputCurrency === 'gbp' ? 'usd' : 'gbp'}
        </Button>
      </form>

      <div className="relative">
        {trade && (
          <div className="bg-white dark:text-slate-800 rounded-lg p-4 pt-2 mb-2 scroll-smooth">
            <button
              className="absolute top-3 right-3 text-blue-500"
              onClick={() =>
                copyTextToClipboard(
                  String(trade.outputValue) +
                    ' ' +
                    trade.description.split(' ')[3]
                )
              }
            >
              {isCopied ? 'Copiado!' : 'Copiar valor'}
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {trade.description}
            </h3>
            <span>
              Resultado:{' '}
              <strong>
                {formatCurrency(
                  trade.outputValue,
                  trade.description.split(' ')[3]
                )}{' '}
                - {trade.description.split(' ')[3]}
              </strong>
            </span>
            <br />
            <span>Feito em {trade.createdAt}</span>
            <div className="mt-2">
              <p>Mais informações:</p>
              <ul className="ml-4">
                <li>
                  <strong>Entrada:</strong>{' '}
                  {formatCurrency(
                    trade.inputValue,
                    trade.description.split(' ')[1]
                  )}
                </li>
                <li>
                  <strong>Saida:</strong>{' '}
                  {formatCurrency(
                    trade.outputValue,
                    trade.description.split(' ')[3]
                  )}
                </li>
                <li className="flex items-center gap-2">
                  <strong>
                    Valor do {trade.description.split(' ')[1]} em{' '}
                    {trade.description.split(' ')[3]}:
                  </strong>{' '}
                  <p>
                    {formatCurrency(
                      Number(trade.currentBidValue),
                      trade.description.split(' ')[1]
                    )}{' '}
                    - {trade.currentBidDate}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
