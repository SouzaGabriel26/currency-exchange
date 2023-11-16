import { TradeParam } from ".";
import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";

export async function brlTousd(param: TradeParam) {
  const { data } = await httpClient.post<TradeInterface>('/trade/brl-usd', param);

  return data;
}
