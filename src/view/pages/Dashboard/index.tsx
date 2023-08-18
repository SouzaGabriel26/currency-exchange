import { UserMenu } from "../../components/UserMenu";
import { TradePlayground } from "./components/TradePlayground";
import { TradesHistory } from "./components/TradesHistory";
import { useDashboardController } from "./useDashboardController";

export function Dashboard() {

  const { nameInitials } = useDashboardController();

  return (
    <div className="h-full w-full p-4 md:p-10 md:pt-6 flex flex-col gap-4 overflow-hidden">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Currency Exchange App</h1>
        <UserMenu title={nameInitials}/>
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-4">
        <div className="w-full border h-2/3 md:w-2/3 md:h-full rounded-lg px-10 py-8">
          <TradePlayground />
        </div>

        <div className="w-full h-1/3 md:w-1/3 md:h-full rounded-lg px-10 py-8">
          <TradesHistory />
        </div>
      </main>
    </div>
  )
}
