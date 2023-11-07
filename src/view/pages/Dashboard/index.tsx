import { UserMenuDropDown } from "../../components/UserMenuDropdown";
import { TradePlayground } from "./components/TradePlayground";
import { TradesHistory } from "./components/TradesHistory";
import { useDashboardController } from "./useDashboardController";

export function Dashboard() {
  const { nameInitials } = useDashboardController();

  return (
    <div className="h-full w-full p-4 md:p-10 md:pt-6 flex flex-col gap-4 overflow-y-auto md:overflow-hidden dark:bg-slate-700 dark:text-white">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Currency Exchange App</h1>
        <UserMenuDropDown title={nameInitials} />
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-4">
        <div className="w-full h-2/3 md:w-2/3 md:h-full rounded-lg px-10 py-8 dark:bg-slate-900/50">
          <TradePlayground />
        </div>

        <div className="w-full max-h-fit md:w-1/3 md:h-full rounded-lg px-10 py-8 dark:bg-slate-900/50">
          <TradesHistory />
        </div>
      </main>
    </div>
  );
}
