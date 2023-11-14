import { formatCurrency } from '../../../app/utils/formatCurrency';
import { UserMenuDropDown } from '../../components/UserMenuDropdown';
import { TradePlayground } from './components/TradePlayground';
import { TradesHistory } from './components/TradesHistory';
import { useDashboardController } from './useDashboardController';

export function Dashboard() {
  const { nameInitials, updatedValue } = useDashboardController();

  return (
    <div className="h-full w-full p-4 lg:p-10 lg:pt-6 flex flex-col gap-4 overflow-y-auto lg:overflow-hidden bg-slate-100 dark:bg-slate-700 dark:text-white">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Currency Exchange App</h1>
        <UserMenuDropDown title={nameInitials} />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4">
        <div className="w-full h-2/3 lg:w-2/3 lg:h-full rounded-lg px-10 py-8 bg-slate-300/50 dark:bg-slate-900/50 flex flex-col items-center ">
          <div className="flex items-center flex-col gap-2">
            Valor atualizado das moedas em tempo real:
            <div className="flex flex-col items-center gap-2">
              {updatedValue && (
                <>
                  <div className="flex items-center gap-4">
                    <span>
                      USD: {formatCurrency(updatedValue.usdValue, 'USD')}
                    </span>
                    <span>
                      GBP: {formatCurrency(updatedValue.gbpValue, 'GBP')}
                    </span>
                  </div>
                  <span>Ultima att: {updatedValue.updatedAt}</span>
                </>
              )}
            </div>
          </div>
          <TradePlayground />
        </div>

        <div className="w-full max-h-fit lg:w-1/3 lg:h-full rounded-lg px-10 py-8 bg-slate-300/50 dark:bg-slate-900/50">
          <TradesHistory />
        </div>
      </main>
    </div>
  );
}
