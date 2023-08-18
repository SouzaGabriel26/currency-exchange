import { TradeParam } from ".";
import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";

export async function gbpTousd(param: TradeParam) {
  const { data } = await httpClient.post<TradeInterface>('/trade/gbp-usd', param);

  return data;
}
