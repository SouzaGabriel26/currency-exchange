import { TradeParam } from ".";
import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";

export async function usdTogbp(param: TradeParam) {
  const { data } = await httpClient.post<TradeInterface>('/trade/usd-gbp', param);

  return data;
}
