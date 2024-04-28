import { TradeInterface } from "../../utils/interfaces/tradeInterface";
import { httpClient } from "../httpClient";

export interface MeResponse {
  id: string,
  email: string,
  name: string,
  trades: TradeInterface[],
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/user/me');

  return data;
}
