import { TradeParam } from ".";
import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";

export async function brlTogbp(param: TradeParam) {
  const { data } = await httpClient.post<TradeInterface>('/trade/brl-gbp', param);

  return data;
}
