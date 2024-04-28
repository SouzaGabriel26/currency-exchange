import { TradeParam } from ".";
import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";

export async function usdTobrl(param: TradeParam) {
  const { data } = await httpClient.post<TradeInterface>('/trade/usd-brl', param);

  return data;
}
