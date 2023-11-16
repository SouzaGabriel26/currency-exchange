import { TradeParam } from ".";
import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";

export async function gbpTobrl(param: TradeParam) {
  const { data } = await httpClient.post<TradeInterface>('/trade/gbp-brl', param);

  return data;
}
